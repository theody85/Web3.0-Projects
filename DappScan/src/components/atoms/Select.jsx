import React from "react";

const Select = ({ options }) => {
  return (
    <select className="py-2">
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default Select;
