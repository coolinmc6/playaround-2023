import exp from 'constants';
import React from 'react';

type TableStyleObject = {
  [key: string]: string;
}

type TableProps = {
  headerArray: string[];
  data: any[];
  styles?: TableStyleObject;
}

const Table = ({ headerArray, data, styles = {} }: TableProps) => {
  
  return (
    <table className={`w-full text-md text-left rtl:text-right text-gray-500 dark:text-gray-400 ${styles.table}`}>
      <thead className={`text-md text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 ${styles?.thead ?? ''}`}>
        <tr>
          {headerArray.map((header, index) => (
            <th key={index} className="px-6 py-3">{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 ">
            {headerArray.map((header, index) => (
              <td key={index} className="px-6 py-2">{row[header.toLowerCase()]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Table;
