import styles from "./ErrorState.module.css";

export interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export const ErrorState = ({
  title = "Something went wrong",
  message = "We couldn’t load this right now. Please try again.",
  onRetry,
}: ErrorStateProps) => {
  return (
    <div className={styles.wrap} role="alert">
      <div className={styles.icon} aria-hidden="true">
        !
      </div>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.message}>{message}</p>
      {onRetry && (
        <button type="button" className={styles.retry} onClick={onRetry}>
          Try again
        </button>
      )}
    </div>
  );
};
