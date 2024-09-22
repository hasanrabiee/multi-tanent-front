"use client";
import SubmitButton from "@/components/form/buttons/SubmitButton";
import TextInput from "@/components/form/inputs/TextInput";
import { useRegister } from "@/hooks/auth/useRegister";
import { REGISTERATION_COUNTRIES } from "@/utils/constants/constants";
import { useParams } from "next/navigation";
import React, { useState } from "react";

const Register = () => {
  const { tenant } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [country, setCountry] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const { registerUser, loading, error, userData } = useRegister(
    String(tenant)
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await registerUser(name, email, password, passwordConfirmation, country);
  };
  return (
    <section className="w-full max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6 capitalize">
        User Registration in {tenant}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>

          <TextInput
            name="name"
            id="name"
            value={name}
            onChange={setName}
            required={true}
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <TextInput
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={setEmail}
            required={true}
          />
        </div>

        <div>
          <label
            htmlFor="country"
            className="block text-sm font-medium text-gray-700"
          >
            Country
          </label>
          <select
            id="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          >
            <option value="">Select your country</option>
            {REGISTERATION_COUNTRIES.map((country) => (
              <option key={country.code} value={country.code}>
                {country.name}
              </option>
            ))}
          </select>
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
            name="password"
            id="password"
            value={password}
            onChange={setPassword}
            required={true}
          />
        </div>

        <div>
          <label
            htmlFor="password_confirmation"
            className="block text-sm font-medium text-gray-700"
          >
            Password Confirmation
          </label>
          <input
            type="password"
            id="password_confirmation"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <SubmitButton text="Register" disabled={loading} loading={loading} />

        {userData && (
          <p className="text-green-500 mt-4">
            Registration successful! User ID: {userData.user.id}
          </p>
        )}
      </form>
    </section>
  );
};

export default Register;
