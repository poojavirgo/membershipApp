import { Stepper, Button } from "../../../../common";
import { REGISTRATION as Txt, STEP_LABELS } from "../../../../constants";
import {
  MemberTypeStep,
  DetailsStep,
  ReviewStep,
  SuccessBanner,
} from "../index";
import { useWizard, STEP } from "../../../../hooks/useWizard";
import type { MembershipForm } from "../../../../types";
import styles from "./Wizard.module.css";

interface Props {
  form: MembershipForm;
}

export const Wizard = ({ form }: Props) => {
  const {
    step,
    memberTypeId,
    memberTypeError,
    registrant,
    errors,
    selectedType,
    submitting,
    submitted,
    submitError,
    selectMemberType,
    updateField,
    goNext,
    goBack,
    handleSubmit,
    reset,
  } = useWizard(form);

  if (submitted && selectedType) {
    return (
      <SuccessBanner
        firstName={registrant.firstName}
        memberTypeName={selectedType.name}
        email={registrant.email}
        onReset={reset}
      />
    );
  }

  return (
    <div className={styles.wizard}>
      <Stepper labels={STEP_LABELS} current={step} />

      {step === STEP.MEMBERSHIP && (
        <>
          <MemberTypeStep
            title={form.title}
            description={form.description}
            memberTypes={form.memberTypes}
            selectedId={memberTypeId}
            error={memberTypeError}
            onSelect={selectMemberType}
          />
          <div className={styles.actions}>
            <Button onClick={goNext}>{Txt.actions.continue}</Button>
          </div>
        </>
      )}

      {step === STEP.DETAILS && (
        <>
          <DetailsStep
            registrant={registrant}
            errors={errors}
            onChange={updateField}
          />
          <div className={styles.actions}>
            <Button variant="ghost" onClick={goBack}>
              {Txt.actions.back}
            </Button>
            <Button onClick={goNext}>{Txt.actions.continue}</Button>
          </div>
        </>
      )}

      {step === STEP.REVIEW && selectedType && (
        <>
          <ReviewStep
            memberType={selectedType}
            registrant={registrant}
            error={submitError}
          />
          <div className={styles.actions}>
            <Button variant="ghost" onClick={goBack} disabled={submitting}>
              {Txt.actions.back}
            </Button>
            <Button onClick={handleSubmit} disabled={submitting}>
              {submitting ? Txt.actions.submitting : Txt.actions.submit}
            </Button>
          </div>
        </>
      )}
    </div>
  );
};
