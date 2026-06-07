import styles from "./Stepper.module.css";

export interface StepperProps {
  labels: readonly string[];
  current: number;
}

export const Stepper = ({ labels, current }: StepperProps) => {
  return (
    <ol className={styles.stepper} aria-label="Progress">
      {labels.map((label, i) => {
        const n = i + 1;
        const state =
          n < current ? styles.done : n === current ? styles.active : "";
        return (
          <li key={label} className={`${styles.item} ${state}`}>
            <span className={styles.dot}>{n < current ? "✓" : n}</span>
            <span className={styles.label}>{label}</span>
          </li>
        );
      })}
    </ol>
  );
};
