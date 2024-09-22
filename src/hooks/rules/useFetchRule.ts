import { useState, useEffect } from "react";
import { generateTenantApi } from "@/utils/request/TenantApi";
import Cookies from "js-cookie";
import { TENANT_ID } from "@/utils/constants/constants";

export const useFetchRules = () => {
  const [rules, setRules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRules = async () => {
    const API = generateTenantApi(String(Cookies.get(TENANT_ID))); // Generate tenant-specific Axios instance

    try {
      const response = await API.get("rules");
      setRules(response.data);
    } catch (err) {
      console.log(err);
      setError("Failed to load rules");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchRules();
  }, []);

  const refetch = () => {
    setLoading(true);
    setError(null);
    fetchRules();
  };

  return { rules, loading, error, refetch };
};
