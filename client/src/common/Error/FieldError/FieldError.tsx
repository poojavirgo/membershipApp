import styles from "./FieldError.module.css";

export interface FieldErrorProps {
  message?: string | null;
}

export const FieldError = ({ message }: FieldErrorProps) => {
  if (!message) return null;
  return (
    <p className={styles.error} role="alert">
      {message}
    </p>
  );
};
