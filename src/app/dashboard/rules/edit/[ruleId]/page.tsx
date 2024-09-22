"use client";
import CreateUpdateRulePage from "@/components/dashboard/rule/CreateUpdateRule";
import { TENANT_ID } from "@/utils/constants/constants";
import generateTenantApi from "@/utils/request/TenantApi";
import Cookies from "js-cookie";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const EditRule = () => {
  const { ruleId } = useParams<{ ruleId: string }>();

  const [rule, setRule] = useState(null);

  useEffect(() => {
    const fetchRule = async () => {
      const API = generateTenantApi(String(Cookies.get(TENANT_ID)));
      const response = await API.get(`/rules/${ruleId}`);
      setRule(response.data);
    };

    fetchRule();
  }, [ruleId]);

  if (!rule) {
    return <p>Loading...</p>;
  }
  return (
    <CreateUpdateRulePage
      tenantId={String(Cookies.get(TENANT_ID))}
      initialData={rule}
    />
  );
};

export default EditRule;
