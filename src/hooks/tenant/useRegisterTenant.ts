import { useState } from "react";
import API from "@/utils/request/API";
import { toast } from "react-toastify";
import axios, { AxiosError } from "axios"; // AxiosError import
import { TenantResponse } from "../types/tenantResponse.types";

export const useRegisterTenant = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [data, setData] = useState<undefined | TenantResponse>(undefined);

  const registerTenant = async (tenantName: string) => {
    setLoading(true);
    setError(null);
    setIsSuccess(false); // Reset success status before starting a new request

    try {
      const response = await API.post<TenantResponse>("api/tenants", {
        name: tenantName,
      });

      setData(response.data);
      setIsSuccess(true);
      toast.success("Tenant added successfully");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const axiosError = err as AxiosError<{ error: string }>;

        if (axiosError.response) {
          const errorMessage =
            axiosError.response.data.error || "Something went wrong";
          toast.error(errorMessage);
          setError(errorMessage);
        }
      } else {
        toast.error("Network or unexpected error occurred");
        setError("Network or unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return { registerTenant, data, loading, error, isSuccess };
};
