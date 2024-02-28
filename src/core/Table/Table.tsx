import exp from 'constants';
import React from 'react';

type TableProps = {
  headerArray: string[];
  data: any[];
}

const Table = ({ headerArray, data }: TableProps) => {
  return (
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          {headerArray.map((header, index) => (
            <th key={index} className="px-6 py-3">{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            {headerArray.map((header, index) => (
              <td key={index}>{row[header]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Table;
