import type { ReactNode } from "react";
import styles from "./Step.module.css";

export interface StepProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export const Step = ({ title, description, children }: StepProps) => {
  return (
    <section className={styles.step}>
      <h2 className={styles.title}>{title}</h2>
      {description && <p className={styles.description}>{description}</p>}
      {children}
    </section>
  );
};
