import type { ReactNode } from "react";
import styles from "./Card.module.css";

export interface CardProps {
  children: ReactNode;
  onClick?: () => void;
  selected?: boolean;
  className?: string;
}

export const Card = ({
  children,
  onClick,
  selected,
  className = "",
}: CardProps) => {
  const interactive = !!onClick;
  const cls = `${styles.card} ${interactive ? styles.interactive : ""} ${
    selected ? styles.selected : ""
  } ${className}`;

  if (interactive) {
    return (
      <button type="button" className={cls} onClick={onClick}>
        {children}
      </button>
    );
  }
  return <div className={cls}>{children}</div>;
};
