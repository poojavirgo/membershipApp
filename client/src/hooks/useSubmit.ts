import { useState } from "react";
import type { RegistrationPayload } from "../types";
import { API } from "../config";

interface SubmitState {
  submitting: boolean;
  submitted: boolean;
  error: string | null;
}

const INITIAL: SubmitState = {
  submitting: false,
  submitted: false,
  error: null,
};

export const useSubmit = () => {
  const [state, setState] = useState<SubmitState>(INITIAL);

  const submit = async (payload: RegistrationPayload): Promise<boolean> => {
    setState({ submitting: true, submitted: false, error: null });
    try {
      const res = await fetch(`${API}/api/registrations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formId: payload.formId,
          memberTypeId: payload.memberTypeId,
          firstName: payload.registrant.firstName,
          lastName: payload.registrant.lastName,
          email: payload.registrant.email,
          phone: payload.registrant.phone,
          birthDate: payload.registrant.birthDate,
        }),
      });
      if (!res.ok) throw new Error("Request failed");
      setState({ submitting: false, submitted: true, error: null });
      return true;
    } catch {
      setState({
        submitting: false,
        submitted: false,
        error: "Something went wrong. Please try again.",
      });
      return false;
    }
  };

  const reset = () => setState(INITIAL);

  return { ...state, submit, reset };
};
