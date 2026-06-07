import styles from "./Row.module.css";

export interface RowProps {
  label: string;
  value: string;
}

export const Row = ({ label, value }: RowProps) => (
  <div className={styles.row}>
    <dt className={styles.label}>{label}</dt>
    <dd className={styles.value}>{value}</dd>
  </div>
);
