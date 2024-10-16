import React from "react";

export default function Textarea({
  type,
  placeholder,
  className,
  children,
  value,
  onChange,
}) {
  return (
    <textarea
      type={type || "text"}
      placeholder={placeholder}
      className={className}
      value={value}
      onchange={onChange}
    >
      {children}
    </textarea>
  );
}
