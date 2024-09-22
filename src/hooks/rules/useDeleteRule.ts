import { useState } from "react";
import { toast } from "react-toastify";
import generateTenantApi from "@/utils/request/TenantApi";

export const useDeleteRule = (tenantId: string) => {
  const [loading, setLoading] = useState(false);
  const API = generateTenantApi(tenantId);

  const deleteRule = async (ruleId: string) => {
    setLoading(true);
    try {
      await API.delete(`/rules/${ruleId}`);
      toast.success("Rule deleted successfully");
    } catch (err) {
      console.log(err);
      toast.error("Failed to delete rule");
    } finally {
      setLoading(false);
    }
  };

  return { deleteRule, loading };
};
