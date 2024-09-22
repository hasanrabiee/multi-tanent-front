import { useState, useEffect } from "react";
import API from "@/utils/request/API";
import { AxiosError } from "axios";
import { TenantResponse } from "../types/tenantResponse.types";

export const useFetchTenants = () => {
  const [tenants, setTenants] = useState<TenantResponse[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchTenants = async () => {
    setLoading(true);
    setError(null);

    try {
      //   alert("test");
      const response = await API.get<TenantResponse[]>("api/tenants"); 
      setTenants(response.data);
    } catch (err) {
      const axiosError = err as AxiosError<{ error: string }>;
      if (axiosError.response) {
        setError(axiosError.response.data.error || "Failed to fetch tenants");
      } else {
        setError("Network or unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTenants(); // Fetch tenants on mount
  }, []);

  return { tenants, loading, error, refetch: fetchTenants };
};
