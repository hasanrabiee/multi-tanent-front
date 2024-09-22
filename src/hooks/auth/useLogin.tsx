import { useState } from "react";
import  { AxiosError } from "axios";
import { toast } from "react-toastify";
import generateTenantApi from "@/utils/request/TenantApi";
import { LoginResponse } from "../types/loginResponse.types";
import Cookies from "js-cookie";
import { ROLE_KEY, TENANT_ID, TOKEN_KEY } from "@/utils/constants/constants";
import { useRouter } from "next/navigation";
export const useTenantLogin = (tenantId: string) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const loginTenant = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    const API = generateTenantApi(tenantId); // Generate tenant-specific Axios instance

    try {
      const response = await API.post<LoginResponse>("login", {
        email,
        password,
      });

      setToken(response.data.token);
      const {
        token,
        user: { role },
      } = response.data;
      Cookies.set(TOKEN_KEY, token);
      Cookies.set(ROLE_KEY, role);
      Cookies.set(TENANT_ID, tenantId);

      toast.success("Login successful");
      if (role === "admin") {
        router.push("/dashboard"); // Redirect admin to dashboard
      } else {
        router.push("/blog"); // Redirect non-admin to blogs page
      }
    } catch (err) {
      const axiosError = err as AxiosError<{ error: string }>;

      if (axiosError.response) {
        const errorMessage = axiosError.response.data.error || "Login failed";
        toast.error(errorMessage);
        setError(errorMessage);
      } else {
        toast.error("Network or unexpected error occurred");
        setError("Network or unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return { loginTenant, loading, error, token };
};
