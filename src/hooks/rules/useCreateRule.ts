import { useState } from "react";
import { toast } from "react-toastify";
import generateTenantApi from "@/utils/request/TenantApi";

export const useCreateRule = (tenantId: string) => {
  const [loading, setLoading] = useState(false);

  const createRule = async (country: string, message: string) => {
    setLoading(true);
    try {
      const API = generateTenantApi(tenantId);
      await API.post("/rules", {
        country,
        message,
      });

      toast.success("Rule created successfully");
    } catch (err) {
      console.log(err);
      toast.error("Failed to create rule");
    } finally {
      setLoading(false);
    }
  };

  return { createRule, loading };
};
