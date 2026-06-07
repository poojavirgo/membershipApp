import { Link } from "react-router-dom";
import styles from "./NotFoundPage.module.css";

export const NotFoundPage = () => {
  return (
    <div className={styles.wrap}>
      <h1 className={styles.title}>Page not found</h1>
      <p className={styles.subtitle}>
        The page you're looking for doesn't exist.
      </p>
      <Link to="/" className={styles.button}>
        Go to membership signup
      </Link>
    </div>
  );
};
