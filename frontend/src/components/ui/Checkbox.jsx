import React from "react";
import { cn } from "../../utils/cn";

const Checkbox = React.forwardRef(
  (
    { className, id, label, description, error, checked, onChange, disabled, required, size, ...props },
    ref
  ) => {
    const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div className={cn("form-check", className, disabled && "opacity-50")}>
        <input
          type="checkbox"
          ref={ref}
          id={checkboxId}
          checked={checked}
          disabled={disabled}
          required={required}
          className={cn("form-check-input", error && "is-invalid",
            size === "lg" ? "form-check-input-lg" : ""
          )}
          onChange={onChange}
          {...props}
        />
        <label
          htmlFor={checkboxId}
          className={cn("form-check-label", error ? "text-alerts-error" : "text-text-general", "mb-0")}
        >
          {String(label)}
          {required && <span className="text-alerts-error ms-1">*</span>}
        </label>
        {description && <p className="text-muted small mt-1 mb-0">{String(description)}</p>}
        {error && <div className="invalid-feedback text-alerts-error d-block">{String(error)}</div>}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";

export default Checkbox;

