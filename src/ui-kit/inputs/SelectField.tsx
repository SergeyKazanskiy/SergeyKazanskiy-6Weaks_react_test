import React, { useId } from "react";
import clsx from "clsx";

type SelectSize = "sm" | "md" | "lg";

interface Option {
  value: string;
  label: string;
}

interface SelectFieldProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: Option[];
  sz?: SelectSize;
  error?: string;
  helperText?: string;
  w1?: string;
  w2?: string;
}

export const SelectField: React.FC<SelectFieldProps> = ({
  label,
  options,
  sz = "md",
  error,
  helperText,
  w1,
  w2,
  className,
  id,
  ...props
}) => {
  const generatedId = useId();
  const selectId = id || generatedId;

  return (
    <div className="input-field">
      <label htmlFor={selectId} className="input-label" style={{ width: w1 }}>
        {label}
      </label>

      <div className="input-wrapper" style={{ width: w2 }}>
        <select id={selectId} className={clsx(
            "select",`select-${sz}`, error && "select-error",className
          )}
          aria-invalid={!!error}
          aria-describedby={
            error
              ? `${selectId}-error`
              : helperText
              ? `${selectId}-helper`
              : undefined
          }
          {...props}
        >
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        {error && (
          <span id={`${selectId}-error`} className="input-error-text">
            {error}
          </span>
        )}

        {!error && helperText && (
          <span id={`${selectId}-helper`} className="input-helper">
            {helperText}
          </span>
        )}
      </div>
    </div>
  );
};

// Usage example:
/*
<SelectField
  label="Country"
  w1="150px"
  w2="300px"
  error="Please select a status"
  options={[
    { value: "us", label: "United States" },
    { value: "de", label: "Germany" },
  ]}
/>


*/