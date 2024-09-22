import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useCreateRule } from "@/hooks/rules/useCreateRule";
import { useUpdateRule } from "@/hooks/rules/useUpdateRule";
import TextareaInput from "@/components/form/inputs/TextAreaInput";
import SubmitButton from "@/components/form/buttons/SubmitButton";
import { REGISTERATION_COUNTRIES } from "@/utils/constants/constants";

interface RuleData {
  id?: string;
  country: string;
  message: string;
}

const CreateUpdateRulePage = ({
  tenantId,
  initialData,
}: {
  tenantId: string;
  initialData?: RuleData; 
}) => {
  const [country, setCountry] = useState<string>(initialData?.country || "");
  const [message, setMessage] = useState<string>(initialData?.message || "");
  const isEditing = !!initialData?.id;
  const { createRule, loading: creating } = useCreateRule(tenantId);
  const { updateRule, loading: updating } = useUpdateRule(tenantId);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isEditing && initialData?.id) {
      await updateRule(initialData.id, country, message);
    } else {
      await createRule(country, message);
    }

    // Redirect after success
    router.push("/dashboard/rules");
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-6">
        {isEditing ? "Edit Rule" : "Create a New Rule"}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
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
            htmlFor="message"
            className="block text-sm font-medium text-gray-700"
          >
            Message
          </label>
          <TextareaInput
            id="message"
            value={message}
            onChange={setMessage}
            required={true}
          />
        </div>

        <SubmitButton
          text={
            creating
              ? "Creating..."
              : updating
              ? "Updating..."
              : isEditing
              ? "Update Rule"
              : "Create Rule"
          }
          disabled={creating || updating}
          loading={creating || updating}
        />
      </form>
    </div>
  );
};

export default CreateUpdateRulePage;
