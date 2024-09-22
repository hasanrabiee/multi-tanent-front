import { useState } from "react";
import { toast } from "react-toastify";
import generateTenantApi from "@/utils/request/TenantApi";

export const useUpdateRule = (tenantId: string) => {
  const [loading, setLoading] = useState(false);

  const updateRule = async (
    ruleId: string,
    country: string,
    message: string
  ) => {
    setLoading(true);
    try {
      const API = generateTenantApi(tenantId);
      await API.put(`/rules/${ruleId}`, {
        country,
        message,
      });

      toast.success("Rule updated successfully");
    } catch (err) {
      console.log(err);
      toast.error("Failed to update rule");
    } finally {
      setLoading(false);
    }
  };

  return { updateRule, loading };
};
