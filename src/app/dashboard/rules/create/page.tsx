"use client";
import CreateUpdateRulePage from "@/components/dashboard/rule/CreateUpdateRule";
import { TENANT_ID } from "@/utils/constants/constants";
import Cookies from "js-cookie";
import React from "react";

const Rules = () => {
  return <CreateUpdateRulePage tenantId={String(Cookies.get(TENANT_ID))} />;
};

export default Rules;
