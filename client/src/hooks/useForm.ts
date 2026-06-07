import { useCallback, useEffect, useState } from "react";
import type { MembershipForm } from "../types";
import { API } from "../config";

interface State {
  form: MembershipForm | null;
  loading: boolean;
  error: string | null;
}

export const useForm = () => {
  const [state, setState] = useState<State>({
    form: null,
    loading: true,
    error: null,
  });

  const fetchForm = useCallback(() => {
    setState({ form: null, loading: true, error: null });
    fetch(`${API}/api/form`)
      .then((res) =>
        res.ok ? res.json() : Promise.reject(new Error("Failed")),
      )
      .then((data) => {
        // Map the API shape -> frontend MembershipForm
        const form: MembershipForm = {
          id: data.formId,
          title: data.title,
          description: "",
          registrationDate: data.registrationOpens,
          memberTypes: data.memberTypes.map(
            (mt: { id: string; name: string }) => ({
              id: mt.id,
              name: mt.name,
              price: 0,
              currency: "NOK",
            }),
          ),
        };
        setState({ form, loading: false, error: null });
      })
      .catch(() =>
        setState({ form: null, loading: false, error: "Failed to load." }),
      );
  }, []);

  useEffect(() => {
    fetchForm();
  }, [fetchForm]);

  const isOpen = state.form
    ? new Date(state.form.registrationDate).getTime() <= Date.now()
    : false;

  return { ...state, isOpen, refetch: fetchForm };
};
