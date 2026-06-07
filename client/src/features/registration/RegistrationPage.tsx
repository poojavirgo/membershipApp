import { Layout, ErrorState, Banner } from "../../common";
import { useForm } from "../../hooks/useForm";
import { formatDate, interpolate } from "../../utils";
import { Wizard } from "./components/Wizard/Wizard";
import { REGISTRATION as Txt } from "../../constants";
import styles from "./RegistrationPage.module.css";

export const RegistrationPage = () => {
  const { form, loading, error, isOpen, refetch } = useForm();

  return (
    <Layout title={Txt.pageTitle}>
      {loading && <p className={styles.muted}>{Txt.loading}</p>}

      {!loading && (error || !form) && (
        <ErrorState message={Txt.errorMessage} onRetry={refetch} />
      )}

      {!loading && form && !isOpen && (
        <Banner variant="info" title={Txt.closed.title}>
          {interpolate(Txt.closed.body, {
            title: form.title,
            date: formatDate(form.registrationDate),
          })}
        </Banner>
      )}

      {!loading && form && isOpen && <Wizard form={form} />}
    </Layout>
  );
};
