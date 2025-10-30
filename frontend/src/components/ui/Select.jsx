import React, { useState } from "react";
import { ChevronDown, Check, Search } from "lucide-react";
import { cn } from "../../utils/cn";
import Input from "./Input";

const Select = React.forwardRef(
  ({
    className,
    id,
    label,
    description,
    error,
    options = [],
    value,
    onChange,
    placeholder,
    required = false,
    disabled = false,
    clearable = false,
    searchable = false,
    size = "default",
    ...props
  }, ref) => {
    const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const selectedOption = options.find(option => String(option.value) === String(value));

    const filteredOptions = options.filter(option =>
      String(option.label).toLowerCase().includes(String(searchTerm).toLowerCase())
    );

    const handleSelect = (optionValue) => {
      onChange(optionValue);
      setIsOpen(false);
      setSearchTerm("");
    };

    const handleClear = () => {
      onChange("");
      setIsOpen(false);
      setSearchTerm("");
    };

    const handleToggle = () => {
      if (!disabled) {
        setIsOpen(!isOpen);
        setSearchTerm("");
      }
    };

    const handleSearchChange = (e) => {
      setSearchTerm(e.target.value);
    };

    return (
      <div className={cn("form-group position-relative", className)} ref={ref}>
        {label && (
          <label
            htmlFor={selectId}
            className={cn(
              "form-label",
              error ? "text-alerts-error" : "text-headings",
              "mb-1"
            )}
          >
            {String(label)}
            {required && <span className="text-alerts-error ms-1">*</span>}
          </label>
        )}
        {description && <p className="text-muted small mb-2">{String(description)}</p>}

        <div
          className={cn(
            "form-control d-flex justify-content-between align-items-center cursor-pointer",
            error && "is-invalid",
            disabled && "bg-light opacity-75",
            size === "lg" ? "form-control-lg" : "",
            size === "sm" ? "form-control-sm" : "",
            isOpen ? "border-primary-button" : ""
          )}
          onClick={handleToggle}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          role="button"
          tabIndex="0"
          id={selectId}
          style={{ minHeight: '38px' }}
        >
          <span className={cn(selectedOption ? "text-text-general" : "text-muted")}>
            {String(selectedOption?.label || placeholder || 'Select an option')}
          </span>
          <ChevronDown
            className={cn("ms-2 text-muted transition-transform", isOpen && "rotate-180")}
            size={16}
          />
        </div>

        {isOpen && (
          <div className="dropdown-menu show p-2 border-borders-cards shadow rounded-4 position-absolute w-100 mt-1 bg-background" style={{ zIndex: 1050 }}>
            {searchable && (
              <Input
                type="text"
                placeholder="Search..."
                value={String(searchTerm)}
                onChange={handleSearchChange}
                className="mb-2"
                icon={<Search size={16} className="text-muted" />}
              />
            )}
            <ul className="list-unstyled mb-0 overflow-auto" style={{ maxHeight: '200px' }}>
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option, index) => (
                  <li key={String(option.value || index)}>
                    <button
                      type="button"
                      className={cn(
                        "dropdown-item d-flex align-items-center justify-content-between",
                        "py-2 px-3 rounded-3",
                        String(option.value) === String(value) ? "active bg-primary-button text-white" : "text-text-general",
                        "w-100 border-0 text-start",
                        "transition-colors hover:bg-primary-button hover:text-white"
                      )}
                      onClick={() => handleSelect(option.value)}
                      role="option"
                      aria-selected={String(option.value) === String(value)}
                    >
                      {String(option.label)}
                      {String(option.value) === String(value) && <Check size={16} />}
                    </button>
                  </li>
                ))
              ) : (
                <li className="dropdown-item text-muted text-center py-2">No options found</li>
              )}
            </ul>
            {clearable && value && (
              <button
                type="button"
                className="btn btn-outline-secondary-button btn-sm w-100 mt-2 text-secondary-button-text"
                onClick={handleClear}
              >
                Clear Selection
              </button>
            )}
          </div>
        )}

        {error && <div className="invalid-feedback text-alerts-error d-block">{String(error)}</div>}
      </div>
    );
  }
);

Select.displayName = "Select";

export default Select;
