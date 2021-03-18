import React from "react";

function Form({ children, onSubmit, className }) {
  return (
    <form className={className} onSubmit={onSubmit}>
      {children}
    </form>
  );
}

function FormInput({ type, placeholder, className, value, onChange }) {
  return (
    <input
      value={value}
      onChange={onChange}
      className={className}
      type={type}
      placeholder={placeholder}
    />
  );
}

export { Form, FormInput };
