import React from "react";

const SearchBox = ({ name, label, onChange, value }) => {
  return (
    <input
      onChange={(e) => onChange(e.currentTarget.value)}
      type="text"
      name={name}
      value={value}
      placeholder={label}
      id={name}
      className="form-control my-3"
    />
  );
};

export default SearchBox;
