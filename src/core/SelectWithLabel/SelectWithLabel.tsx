import React from 'react';

type Option = {
  value: string;
  label: string;
};

type SelectProps = {
  label: string;
  name: string;
  onChange?: (value: string) => void;
  options: Option[];
  placeholder?: string;
}

const SelectWithLabel = ({ placeholder, label, options, onChange, name }: SelectProps) => {
  const handleOnChange = (e: any) => {
    if (onChange) {
      onChange(e.target.value);
    }
  }
  return (
    <div className="flex flex-col space-y-2 pb-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <select
        className="mt-1 block w-full pl-1 pr-10 py-2 text-base focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md border-2 border-gray-300"
        onChange={handleOnChange}
        defaultValue=""
        name={name}
      >
        <option value="" disabled>
          {placeholder ?? 'Select an option'}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectWithLabel;
