import type { ReactNode } from "react";
import styles from "./Banner.module.css";

export type BannerVariant = "info" | "success" | "error";

export interface BannerProps {
  variant?: BannerVariant;
  icon?: ReactNode;
  title: string;
  children?: ReactNode;
}

const DEFAULT_ICON: Record<BannerVariant, string> = {
  info: "🗓️",
  success: "✓",
  error: "!",
};

export const Banner = ({
  variant = "info",
  icon,
  title,
  children,
}: BannerProps) => {
  return (
    <div className={`${styles.banner} ${styles[variant]}`} role="status">
      <div className={styles.icon} aria-hidden="true">
        {icon ?? DEFAULT_ICON[variant]}
      </div>
      <h2 className={styles.title}>{title}</h2>
      {children && <p className={styles.message}>{children}</p>}
    </div>
  );
};
