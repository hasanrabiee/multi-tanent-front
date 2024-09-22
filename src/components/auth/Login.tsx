"use client";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import { useTenantLogin } from "@/hooks/auth/useLogin";
import Link from "next/link";
import { useUser } from "@/context/UserContext";
import TextInput from "@/components/form/inputs/TextInput";
import SubmitButton from "@/components/form/buttons/SubmitButton";
const Login = () => {
  const { tenant } = useParams<{ tenant: string }>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loginTenant, loading, error, token } = useTenantLogin(tenant);
  const { login } = useUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await loginTenant(email, password);
    login();
  };
  return (
    <section className="w-full max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6 capitalize">{tenant} Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="Email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>

          <TextInput
            id="email"
            value={email}
            onChange={setEmail}
            required={true}
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>

          <TextInput
            type="password"
            id="password"
            value={password}
            onChange={setPassword}
            required={true}
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <SubmitButton loading={loading} disabled={loading} text={"login"} />
        {token && (
          <p className="text-green-500 mt-4">Successfully logged in!</p>
        )}
      </form>

      {/* Link to the Registration Page */}
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Do not have an account? &nbsp;
          <Link
            className="text-indigo-600 hover:text-indigo-500 font-medium"
            href={`/${tenant}/register`}
          >
            Register here
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Login;
