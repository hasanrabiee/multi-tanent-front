import React from "react";

interface InputProps {
  type?: string;
  id: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  name?: string;
}

const TextInput: React.FC<InputProps> = ({
  type,
  id,
  value,
  onChange,
  required,
  name,
}) => {
  return (
    <input
      name={name}
      type={type ? type : "text"}
      id={id}
      value={value}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        onChange(e.target.value)
      }
      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      required={required}
    />
  );
};

export default TextInput;
