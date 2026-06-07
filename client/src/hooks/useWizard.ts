import { useMemo, useState } from "react";
import type {
  MembershipForm,
  MemberType,
  RegistrantInfo,
  FieldErrors,
  StepIndex,
} from "../types";
import { validateRegistrant, hasErrors } from "../utils";
import { useSubmit } from "../hooks";
import { REGISTRATION, REGISTRATION_DEFAULTS } from "../constants";

export const STEP = {
  MEMBERSHIP: 1,
  DETAILS: 2,
  REVIEW: 3,
} as const satisfies Record<string, StepIndex>;

export const useWizard = (form: MembershipForm) => {
  const [step, setStep] = useState<StepIndex>(STEP.MEMBERSHIP);
  const [memberTypeId, setMemberTypeId] = useState<string | null>(null);
  const [memberTypeError, setMemberTypeError] = useState<string | null>(null);
  const [registrant, setRegistrant] = useState<RegistrantInfo>(
    REGISTRATION_DEFAULTS.registrant,
  );
  const [errors, setErrors] = useState<FieldErrors<RegistrantInfo>>({});

  const {
    submitting,
    submitted,
    error: submitError,
    submit,
    reset: resetSubmit,
  } = useSubmit();

  const selectedType: MemberType | undefined = useMemo(
    () => form.memberTypes.find((t) => t.id === memberTypeId),
    [form.memberTypes, memberTypeId],
  );

  const selectMemberType = (id: string) => {
    setMemberTypeId(id);
    setMemberTypeError(null);
  };

  const updateField = (field: keyof RegistrantInfo, value: string) => {
    setRegistrant((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const goNext = () => {
    if (step === STEP.MEMBERSHIP) {
      if (!memberTypeId) {
        setMemberTypeError(REGISTRATION.memberType.required);
        return;
      }
      setMemberTypeError(null);
      setStep(STEP.DETAILS);
    } else if (step === STEP.DETAILS) {
      const found = validateRegistrant(registrant);
      setErrors(found);
      if (!hasErrors(found)) setStep(STEP.REVIEW);
    }
  };

  const goBack = () => {
    setStep((s) => (s > STEP.MEMBERSHIP ? ((s - 1) as StepIndex) : s));
  };

  const handleSubmit = () => {
    if (!memberTypeId) return;
    void submit({ formId: form.id, memberTypeId, registrant });
  };

  const reset = () => {
    setStep(STEP.MEMBERSHIP);
    setMemberTypeId(null);
    setMemberTypeError(null);
    setRegistrant(REGISTRATION_DEFAULTS.registrant);
    setErrors({});
    resetSubmit();
  };

  return {
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
  };
};
