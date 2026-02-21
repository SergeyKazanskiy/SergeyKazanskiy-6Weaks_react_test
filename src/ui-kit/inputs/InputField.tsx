import React, { useId } from "react";
import clsx from "clsx";


type InputSize = "sm" | "md" | "lg";

interface InputFieldProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  size?: InputSize;
  error?: string;          // текст ошибки
  helperText?: string;
  w1?: string;             // ширина label (например "150px" или "30%")
  w2?: string;             // ширина input (например "300px" или "70%")
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  size = "md",
  error,
  helperText,
  w1,
  w2,
  className,
  id,
  ...props
}) => {
  const generatedId = useId();
  const inputId = id || generatedId;

  return (
    <div className="input-field">
      <label
        htmlFor={inputId}
        className="input-label"
        style={{ width: w1 }}
      >
        {label}
      </label>

      <div className="input-wrapper" style={{ width: w2 }}>
        <input
          id={inputId}
          className={clsx(
            "input",
            `input-${size}`,
            error && "input-error",
            className
          )}
          aria-invalid={!!error}
          aria-describedby={
            error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined
          }
          {...props}
        />

        {error && (
          <span id={`${inputId}-error`} className="input-error-text">
            {error}
          </span>
        )}

        {!error && helperText && (
          <span id={`${inputId}-helper`} className="input-helper">
            {helperText}
          </span>
        )}
      </div>
    </div>
  );
};
