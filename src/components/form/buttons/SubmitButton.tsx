import React from "react";

interface SubmitButtonProps {
  loading: boolean;
  text: string;
  disabled: boolean;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  loading,
  text,
  disabled,
}) => {
  return (
    <button
      type="submit"
      className={`w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
        loading ? "opacity-50 cursor-not-allowed" : ""
      }`}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default SubmitButton;
