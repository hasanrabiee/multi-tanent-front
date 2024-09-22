import React from "react";
import Link from "next/link";

interface Rule {
  id: string;
  country: string;
  message: string;
}

interface RulesTableProps {
  rules: Rule[];
  deleteRules: (postId: string) => void;
}

const RulesTable: React.FC<RulesTableProps> = ({ rules, deleteRules }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Country</th>
            <th className="py-3 px-6 text-left">Message</th>
            <th className="py-3 px-6 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {rules?.map((rule) => (
            <tr
              key={rule.id}
              className="border-b border-gray-200 hover:bg-gray-100"
            >
              <td className="py-3 px-6 text-left whitespace-nowrap">
                <span className="font-medium">{rule.country}</span>
              </td>
              <td className="py-3 px-6 text-left">
                <span>{rule.message}</span>
              </td>
              <td className="py-3 px-6 text-center">
                <Link
                  className="text-blue-600 hover:underline"
                  href={`/dashboard/rules/edit/${rule.id}`}
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteRules(rule.id)}
                  className="ml-4 text-red-600 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RulesTable;
