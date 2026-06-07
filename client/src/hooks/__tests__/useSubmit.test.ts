import { describe, it, expect, vi } from "vitest";
import { act, renderHook } from "@testing-library/react";
import { useWizard, STEP } from "../useWizard";
import type { MembershipForm } from "../../types";

vi.mock("../index", () => ({
  useSubmit: () => ({
    submitting: false,
    submitted: false,
    error: null,
    submit: vi.fn().mockResolvedValue(true),
    reset: vi.fn(),
  }),
}));

const form: MembershipForm = {
  id: "f1",
  title: "Test Club",
  description: "",
  registrationDate: "2020-01-01",
  memberTypes: [
    { id: "mt1", name: "Player", price: 0, currency: "NOK" },
    { id: "mt2", name: "Supporter", price: 0, currency: "NOK" },
  ],
};

describe("useWizard", () => {
  it("starts on the membership step", () => {
    const { result } = renderHook(() => useWizard(form));
    expect(result.current.step).toBe(STEP.MEMBERSHIP);
  });

  it("blocks advancing with no member type and sets an error", () => {
    const { result } = renderHook(() => useWizard(form));
    act(() => result.current.goNext());
    expect(result.current.step).toBe(STEP.MEMBERSHIP);
    expect(result.current.memberTypeError).toBeTruthy();
  });

  it("advances to details once a type is selected", () => {
    const { result } = renderHook(() => useWizard(form));
    act(() => result.current.selectMemberType("mt1"));
    act(() => result.current.goNext());
    expect(result.current.step).toBe(STEP.DETAILS);
    expect(result.current.selectedType?.name).toBe("Player");
  });

  it("blocks advancing past details when fields are invalid", () => {
    const { result } = renderHook(() => useWizard(form));
    act(() => result.current.selectMemberType("mt1"));
    act(() => result.current.goNext()); // -> details
    act(() => result.current.goNext()); // invalid, should stay
    expect(result.current.step).toBe(STEP.DETAILS);
    expect(result.current.errors.email).toBeTruthy();
  });

  it("advances to review when details are valid", () => {
    const { result } = renderHook(() => useWizard(form));
    act(() => result.current.selectMemberType("mt1"));
    act(() => result.current.goNext());
    act(() => {
      result.current.updateField("firstName", "Ada");
      result.current.updateField("lastName", "Lovelace");
      result.current.updateField("email", "ada@example.com");
      result.current.updateField("phone", "+4787654322");
      result.current.updateField("birthDate", "1990-01-01");
    });
    act(() => result.current.goNext());
    expect(result.current.step).toBe(STEP.REVIEW);
  });

  it("reset returns to step 1 and clears selections", () => {
    const { result } = renderHook(() => useWizard(form));
    act(() => result.current.selectMemberType("mt1"));
    act(() => result.current.goNext());
    act(() => result.current.reset());
    expect(result.current.step).toBe(STEP.MEMBERSHIP);
    expect(result.current.memberTypeId).toBeNull();
  });
});
