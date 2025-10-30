import React from "react";
import { cn } from "../../utils/cn";

const Input = React.forwardRef(
  ({ className, type, label, description, error, name, value, onChange, placeholder, required, ...props }, ref) => {
    const inputId = name || `input-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div className={cn("form-group", className)}>
        {label && (
          <label htmlFor={inputId} className={cn("form-label", error ? "text-alerts-error" : "text-headings", "mb-1")}>
            {String(label)}
            {required && <span className="text-alerts-error ms-1">*</span>}
          </label>
        )}
        {description && <p className="text-muted small mb-2">{String(description)}</p>}
        <input
          type={type}
          id={inputId}
          name={name}
          value={String(value || '')}
          onChange={onChange}
          ref={ref}
          placeholder={String(placeholder || '')}
          className={cn(
            "form-control",
            error && "is-invalid"
          )}
          required={required}
          {...props}
        />
        {error && <div className="invalid-feedback text-alerts-error">{String(error)}</div>}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
