import React from 'react';
import './InputField.css'; // Make sure this path is correct

function InputField({ label, name, value, onChange, type = 'text', ...props }) {
  // Extract data attributes or other props passed down
  const dataAttributes = Object.keys(props)
    .filter(key => key.startsWith('data-'))
    .reduce((attrs, key) => {
      attrs[key] = props[key];
      return attrs;
    }, {});

  return (
    <div className="input-field" {...dataAttributes}>
      <label htmlFor={name} className="input-field__label">{label}</label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className="input-field__input"
        placeholder={`Enter ${label.toLowerCase()}...`} // Add placeholder text
      />
    </div>
  );
}

export default InputField;