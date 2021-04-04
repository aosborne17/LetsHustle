import React, { createContext, useState } from "react";

const FormContext = createContext();

const FormProvider = ({ children }) => {
  const [errors, setErrors] = useState([]);

  const value = [errors, setErrors];

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
};

function Form({ children, onSubmit, className }) {
  return (
    <FormProvider>
      <form className={className} onSubmit={onSubmit}>
        {children}
      </form>
    </FormProvider>
  );
}

function FormInput({ type, placeholder, className, name, value, onChange }) {
  return (
    <input
      name={name}
      value={value}
      onChange={onChange}
      className={className}
      type={type}
      placeholder={placeholder}
    />
  );
}

export { Form, FormInput };
