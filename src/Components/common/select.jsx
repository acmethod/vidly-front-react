import React from "react";

//Could use the ...rest op here but i find it reduces readability
const Select = ({ name, label, error, options, value, onChange }) => {
  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <select
        name={name}
        label={label}
        onChange={onChange}
        value={value}
        className="form-select"
        aria-label={label}
      >
        <option value="" />
        {options.map((o) => (
          <option key={o._id} value={o._id}>
            {o.name}
          </option>
        ))}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Select;
