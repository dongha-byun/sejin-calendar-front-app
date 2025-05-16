import React from "react";

interface InputTextProps {
  label: string;
  name: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  required?: boolean;
  disabled?: boolean;
}

const InputText: React.FC<InputTextProps> = ({
  label,
  name,
  placeholder,
  value,
  onChange,
  type = "text",
  required = false,
  disabled = false,
}) => {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm text-gray-600 mb-1">
        {label}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
      />
    </div>
  );
};

export default InputText;
