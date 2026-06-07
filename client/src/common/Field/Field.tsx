import styles from "./Field.module.css";
import { FieldError } from "../Error/FieldError/FieldError";

export interface FieldProps {
  label: string;
  id: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: string;
  autoComplete?: string;
  className?: string;
}

export const Field = ({
  label,
  id,
  value,
  onChange,
  error,
  type = "text",
  autoComplete,
  className = "",
}: FieldProps) => {
  return (
    <div className={`${styles.field} ${className}`}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        autoComplete={autoComplete}
        aria-invalid={!!error}
        className={`${styles.input} ${error ? styles.invalid : ""}`}
        onChange={(e) => onChange(e.target.value)}
      />
      <FieldError message={error} />
    </div>
  );
};
