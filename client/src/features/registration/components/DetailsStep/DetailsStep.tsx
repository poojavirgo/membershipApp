import type { RegistrantInfo, FieldErrors } from "../../../../types";
import { REGISTRATION as Txt } from "../../../../constants";
import { Step, Field, PhoneField } from "../../../../common";
import styles from "./DetailsStep.module.css";

export interface DetailsStepProps {
  registrant: RegistrantInfo;
  errors: FieldErrors<RegistrantInfo>;
  onChange: (field: keyof RegistrantInfo, value: string) => void;
}

interface FieldConfig {
  id: keyof RegistrantInfo;
  label: string;
  type?: string;
  autoComplete?: string;
  full?: boolean;
}


const FIELDS: FieldConfig[] = [
  { id: "firstName", label: Txt.details.firstName, autoComplete: "given-name" },
  { id: "lastName", label: Txt.details.lastName, autoComplete: "family-name" },
  {
    id: "email",
    label: Txt.details.email,
    type: "email",
    autoComplete: "email",
    full: true,
  },
  {
    id: "birthDate",
    label: Txt.details.birthDate,
    type: "date",
    autoComplete: "bday",
  },
];

export const DetailsStep = ({
  registrant,
  errors,
  onChange,
}: DetailsStepProps) => {
  return (
    <Step title={Txt.details.title}>
      <div className={styles.grid}>
        {FIELDS.map(({ id, label, type, autoComplete, full }) => (
          <Field
            key={id}
            id={id}
            label={label}
            type={type}
            value={registrant[id]}
            error={errors[id]}
            onChange={(v) => onChange(id, v)}
            autoComplete={autoComplete}
            className={full ? styles.full : undefined}
          />
        ))}

        <PhoneField
          label={Txt.details.phone}
          id="phone"
          value={registrant.phone}
          error={errors.phone}
          onChange={(v) => onChange("phone", v)}
        />
      </div>
    </Step>
  );
};
