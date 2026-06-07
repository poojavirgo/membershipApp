export interface MemberType {
  id: string;
  name: string;
  description?: string;
  price: number;
  currency: string;
}

export interface MembershipForm {
  id: string;
  title: string;
  description: string;
  registrationDate: string;
  memberTypes: MemberType[];
}

export interface RegistrantInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  birthDate: string;
}

export interface RegistrationPayload {
  formId: string;
  memberTypeId: string;
  registrant: RegistrantInfo;
}

export interface FieldConfig {
  id: keyof RegistrantInfo;
  label: string;
  type?: string;
  autoComplete?: string;
  full?: boolean;
}

export type FieldErrors<T> = Partial<Record<keyof T, string>>;

export type StepIndex = 1 | 2 | 3;

