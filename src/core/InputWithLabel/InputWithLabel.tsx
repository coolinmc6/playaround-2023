import React from 'react';

type InputWithLabelProps = {
  inputClassName?: string;
  label: string;
  name: string;
  labelClassName?: string;
  type?: string;
}

const InputWithLabel = ({ name, label, type = 'text', inputClassName, labelClassName }: InputWithLabelProps) => {
  

  const inputElement = type === 'textarea' ? (
    <textarea
      name={name}
      id={name}
      rows={4} // Default to 4 rows if not specified
      className={`shadow p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${inputClassName}`}
    />
  ) : (
    <input
      type={type}
      name={name}
      id={name}
      className={`shadow p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md ${inputClassName}`}
    />
  );
  return (
    <div className="flex flex-col space-y-2 pb-2">
      <label htmlFor={name} className={`block text-sm font-medium text-gray-700 ${labelClassName}`}>
        {label}
      </label>
      {inputElement}
    </div>
  );
};

export default InputWithLabel;
