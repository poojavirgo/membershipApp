import { describe, it, expect, vi, afterEach } from "vitest";
import {
  isRegistrationOpen,
  isValidName,
  isValidEmail,
  isValidPhone,
  isValidBirthDate,
  validateRegistrant,
  hasErrors,
} from "../validation";
import type { RegistrantInfo } from "../../types";

describe("isRegistrationOpen", () => {
  it("returns true for a past date", () => {
    expect(isRegistrationOpen("2020-01-01")).toBe(true);
  });
  it("returns false for a future date", () => {
    expect(isRegistrationOpen("2999-01-01")).toBe(false);
  });
  it("returns false for an unparseable date", () => {
    expect(isRegistrationOpen("not-a-date")).toBe(false);
  });
});

describe("isValidName", () => {
  it("accepts letters, hyphens, apostrophes, accents", () => {
    expect(isValidName("Anne-Marie", "First name")).toBeUndefined();
    expect(isValidName("O'Brien", "Last name")).toBeUndefined();
    expect(isValidName("José", "First name")).toBeUndefined();
  });
  it("rejects digits and symbols", () => {
    expect(isValidName("Ada1", "First name")).toMatch(/only contain letters/);
    expect(isValidName("@", "First name")).toMatch(/only contain letters/);
  });
  it("flags empty as required", () => {
    expect(isValidName("", "First name")).toMatch(/required/);
  });
});

describe("isValidEmail", () => {
  it("accepts a well-formed address", () => {
    expect(isValidEmail("a@b.com")).toBeUndefined();
  });
  it("rejects malformed addresses", () => {
    expect(isValidEmail("nope")).toMatch(/valid email/);
    expect(isValidEmail("a,b@c.com")).toMatch(/valid email/);
  });
  it("flags empty as required", () => {
    expect(isValidEmail("")).toMatch(/required/);
  });
});

describe("isValidPhone", () => {
  it("accepts a valid international number", () => {
    expect(isValidPhone("+4787654322")).toBeUndefined();
  });
  it("rejects too few digits", () => {
    expect(isValidPhone("+471")).toMatch(/valid phone/);
  });
  it("rejects a missing country code", () => {
    expect(isValidPhone("87654322")).toMatch(/country code/);
  });
  it("flags empty as required", () => {
    expect(isValidPhone("")).toMatch(/required/);
  });
});

describe("isValidBirthDate", () => {
  afterEach(() => vi.useRealTimers());

  it("accepts a valid past date", () => {
    expect(isValidBirthDate("1990-01-01")).toBeUndefined();
  });
  it("rejects a future date", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-01-01"));
    expect(isValidBirthDate("2030-01-01")).toMatch(/future/);
  });
  it("flags empty as required", () => {
    expect(isValidBirthDate("")).toMatch(/required/);
  });
});

describe("validateRegistrant", () => {
  const valid: RegistrantInfo = {
    firstName: "Ada",
    lastName: "Lovelace",
    email: "ada@example.com",
    phone: "+4787654322",
    birthDate: "1990-01-01",
  };

  it("returns no errors for valid input", () => {
    expect(hasErrors(validateRegistrant(valid))).toBe(false);
  });

  it("flags every empty field", () => {
    const errors = validateRegistrant({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      birthDate: "",
    });
    expect(Object.keys(errors).sort()).toEqual(
      ["birthDate", "email", "firstName", "lastName", "phone"].sort(),
    );
  });
});
