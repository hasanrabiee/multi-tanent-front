import { useState } from "react";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import generateTenantApi from "@/utils/request/TenantApi"; // Dynamic API for tenants
import { LoginResponse } from "../types/loginResponse.types";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { ROLE_KEY, TENANT_ID, TOKEN_KEY } from "@/utils/constants/constants";
import { useUser } from "@/context/UserContext";

export const useRegister = (tenantId: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userData, setUserData] = useState<LoginResponse | null>(null);
  const router = useRouter();
  const { login } = useUser();

  const registerUser = async (
    name: string,
    email: string,
    password: string,
    password_confirmation: string,
    country: string
  ) => {
    setLoading(true);
    setError(null);

    const API = generateTenantApi(tenantId); // Generate tenant-specific Axios instance

    try {
      const response = await API.post<LoginResponse>("register", {
        name,
        email,
        password,
        password_confirmation,
        country,
      });

      setUserData(response.data);
      const {
        token,
        user: { role },
      } = response.data;
      Cookies.set(TOKEN_KEY, token);
      Cookies.set(ROLE_KEY, role);
      Cookies.set(TENANT_ID, tenantId);
      login();

      if (role === "admin") {
        router.push("/dashboard");
      } else {
        router.push("/blog");
      }
      toast.success("Registration successful");
    } catch (err) {
      const axiosError = err as AxiosError<{ message: string }>;

      if (axiosError.response) {
        console.log(err);
        const errorMessage =
          axiosError.response.data.message || "Registration failed";
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

  return { registerUser, loading, error, userData };
};
