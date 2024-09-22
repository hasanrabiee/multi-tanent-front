"use client";
import { FormEvent, useEffect, useState } from "react";
import { useRegisterTenant } from "../hooks/tenant/useRegisterTenant";
import { useFetchTenants } from "../hooks/tenant/useFetchTenants";
import { TenantResponse } from "@/hooks/types/tenantResponse.types";
import Link from "next/link";
import TextInput from "@/components/form/inputs/TextInput";

export default function Home() {
  const [tenantName, setTenantName] = useState("");
  const {
    registerTenant,
    loading: registerLoading,
    error: registerError,
  } = useRegisterTenant();
  const {
    tenants,
    loading: fetchLoading,
    error: fetchError,
    refetch,
  } = useFetchTenants(); // Fetch tenants hook

  useEffect(() => {
    if (!registerError) {
      setTenantName(""); // Clear the input field after success
    }
  }, [registerError, registerLoading]);
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await registerTenant(tenantName);
    setTenantName("");
    refetch();
  };

  return (
    <div className="container mx-auto mt-8">
      <div className="flex space-x-8">
        {/* Tenant Registration Form */}
        <div className="w-1/2">
          <h2 className="text-2xl font-bold mb-6">Register New Tenant</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="tenantName"
                className="block text-sm font-medium text-gray-700"
              >
                Tenant Name
              </label>
              <TextInput
                value={tenantName}
                id={tenantName}
                onChange={setTenantName}
                required={true}
              />
            </div>

            {registerError && (
              <p className="text-red-500 text-sm">{registerError}</p>
            )}

            <button
              type="submit"
              className={`w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                registerLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={registerLoading}
            >
              {registerLoading ? "Registering..." : "Register Tenant"}
            </button>
          </form>
        </div>

        {/* Tenant List */}
        <div className="w-1/2">
          <h2 className="text-2xl font-bold mb-6">Tenant List</h2>
          {fetchLoading && <p>Loading tenants...</p>}
          {fetchError && <p className="text-red-500 text-sm">{fetchError}</p>}

          {tenants && tenants.length > 0 ? (
            <ul className="space-y-2">
              {tenants.map((tenant: TenantResponse) => (
                <Link
                  key={tenant.id}
                  className="p-4 block bg-gray-100 rounded-md shadow-sm"
                  href={`/${tenant.id}/login`}
                >
                  <li key={tenant.id}>{tenant.id}</li>
                </Link>
              ))}
            </ul>
          ) : (
            !fetchLoading && !!tenants?.length && <p>No tenants available</p>
          )}
        </div>
      </div>
    </div>
  );
}
