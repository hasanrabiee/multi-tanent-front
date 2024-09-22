
interface TextareaProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}

const TextareaInput: React.FC<TextareaProps> = ({ id, value, onChange, required }) => {
  return (
    <textarea
      id={id}
      value={value}
      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => onChange(e.target.value)}
      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      required={required}
      rows={5} // Default number of rows, you can adjust this as needed
    />
  );
};

export default TextareaInput;
