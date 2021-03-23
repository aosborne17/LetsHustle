import React from "react";

function Button({ type, children, className }) {
  return (
    <button className={className} type={type}>
      {children}
    </button>
  );
}
export { Button };
