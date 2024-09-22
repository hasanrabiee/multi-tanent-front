"use client";
import React from "react";
import RulesTable from "@/components/dashboard/utils/table/RulesTable";
import Cookies from "js-cookie";
import { TENANT_ID } from "@/utils/constants/constants";
import { useDeleteRule } from "@/hooks/rules/useDeleteRule";
import { useFetchRules } from "@/hooks/rules/useFetchRule";

const RuleList: React.FC = () => {
  const { rules, loading: fetchLoading, error, refetch } = useFetchRules(); // Use custom hook to fetch rules

  const { deleteRule } = useDeleteRule(String(Cookies.get(TENANT_ID)));

  const handleDelete = (ruleId: string) => {
    if (confirm("Are you sure you want to delete this rule?")) {
      deleteRule(ruleId);
      refetch(); // Refresh the rule list after deletion
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-6">Rules</h1>

      {fetchLoading && <p>Loading rules...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!fetchLoading && !error && (
        <RulesTable deleteRules={handleDelete} rules={rules} />
      )}
    </div>
  );
};

export default RuleList;
