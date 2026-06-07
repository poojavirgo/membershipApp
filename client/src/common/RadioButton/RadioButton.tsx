import styles from "./RadioButton.module.css";

export interface RadioButtonProps {
  checked: boolean;
  label?: string;
}

export const RadioButton = ({ checked, label }: RadioButtonProps) => {
  return (
    <span
      className={`${styles.dot} ${checked ? styles.checked : ""}`}
      role="radio"
      aria-checked={checked}
      aria-label={label}
    />
  );
};
