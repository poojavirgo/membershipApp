import type { RegistrantInfo, FieldErrors } from "../types";
import { REGISTRATION as Txt } from "../constants";
import { interpolate } from "./interpolate";

const EMAIL_RE = /^[^\s@,]+@[^\s@,]+\.[^\s@,]+$/;
const NAME_RE = /^[\p{L}][\p{L}\s'-]*$/u;

const M = Txt.validation;

const parseDate = (value: string): Date | null => {
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d;
};

export const isDateInPast = (date: string): boolean => {
  const d = parseDate(date);
  return d ? d.getTime() <= Date.now() : false;
};

export const isDateInFuture = (date: string): boolean => {
  const d = parseDate(date);
  return d ? d.getTime() > Date.now() : false;
};

export const isRegistrationOpen = (registrationDate: string): boolean =>
  isDateInPast(registrationDate);

export const isValidName = (
  value: string,
  label: string,
): string | undefined => {
  const v = value.trim();
  if (!v) return interpolate(M.required, { label });
  if (!NAME_RE.test(v)) return interpolate(M.nameLetters, { label });
  return undefined;
};

export const isValidEmail = (value: string): string | undefined => {
  if (!value.trim()) return M.emailRequired;
  return EMAIL_RE.test(value.trim()) ? undefined : M.emailInvalid;
};

export const isValidPhone = (value: string): string | undefined => {
  const v = value.trim();
  if (!v) return M.phoneRequired;
  if (!v.startsWith("+")) return M.phoneCountryCode;
  const digits = v.replace(/[^\d]/g, "");
  if (digits.length < 8 || digits.length > 15) return M.phoneInvalid;
  return undefined;
};

export const isValidBirthDate = (value: string): string | undefined => {
  if (!value) return M.birthRequired;
  const d = parseDate(value);
  if (!d) return M.birthInvalid;
  if (d.getTime() > Date.now()) return M.birthFuture;
  if (d.getFullYear() < 1900) return M.birthTooOld;
  return undefined;
};

export const hasErrors = <T>(errors: FieldErrors<T>): boolean =>
  Object.keys(errors).length > 0;

export const validateRegistrant = (
  info: RegistrantInfo,
): FieldErrors<RegistrantInfo> => {
  const errors: FieldErrors<RegistrantInfo> = {};

  const firstName = isValidName(info.firstName, "First name");
  if (firstName) errors.firstName = firstName;

  const lastName = isValidName(info.lastName, "Last name");
  if (lastName) errors.lastName = lastName;

  const email = isValidEmail(info.email);
  if (email) errors.email = email;

  const phone = isValidPhone(info.phone);
  if (phone) errors.phone = phone;

  const birthDate = isValidBirthDate(info.birthDate);
  if (birthDate) errors.birthDate = birthDate;

  return errors;
};
