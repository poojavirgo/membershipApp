import { useState } from "react";
import { COUNTRY_CODES, DEFAULT_COUNTRY_CODE } from "../../constants";
import { combinePhone } from "../../utils";
import { FieldError } from "../Error/FieldError/FieldError";
import styles from "./PhoneField.module.css";

export interface PhoneFieldProps {
  label: string;
  id: string;
  value: string;
  onChange: (combined: string) => void;
  error?: string;
}

const splitValue = (combined: string) => {
  const match = COUNTRY_CODES.find((c) => combined.startsWith(c.code));
  if (match) {
    return {
      code: match.code,
      number: combined.slice(match.code.length).trim(),
    };
  }
  return { code: DEFAULT_COUNTRY_CODE, number: combined };
};

export const PhoneField = ({
  label,
  id,
  value,
  onChange,
  error,
}: PhoneFieldProps) => {
  const initial = splitValue(value);
  const [code, setCode] = useState(initial.code);
  const [number, setNumber] = useState(initial.number);

  const emit = (nextCode: string, nextNumber: string) => {
    onChange(combinePhone(nextCode, nextNumber));
  };

  return (
    <div className={styles.field}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <div className={styles.row}>
        <select
          aria-label="Country code"
          className={styles.code}
          value={code}
          onChange={(e) => {
            setCode(e.target.value);
            emit(e.target.value, number);
          }}
        >
          {COUNTRY_CODES.map((c) => (
            <option key={c.code} value={c.code}>
              {c.label}
            </option>
          ))}
        </select>
        <input
          id={id}
          type="tel"
          inputMode="numeric"
          className={`${styles.number} ${error ? styles.invalid : ""}`}
          value={number}
          aria-invalid={!!error}
          onChange={(e) => {
            const next = e.target.value;
            setNumber(next);
            emit(code, next);
          }}
        />
      </div>
      <FieldError message={error} />
    </div>
  );
};
