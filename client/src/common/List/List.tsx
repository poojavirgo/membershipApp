import type { ReactNode } from "react";
import styles from "./List.module.css";

export interface ListProps {
  children: ReactNode;
}

export const List = ({ children }: ListProps) => (
  <dl className={styles.list}>{children}</dl>
);
