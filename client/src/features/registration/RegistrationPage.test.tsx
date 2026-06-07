import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";

const mockUseForm = vi.fn();
vi.mock("../../hooks/useForm", () => ({
  useForm: () => mockUseForm(),
}));

vi.mock("../../hooks", () => ({
  useSubmit: () => ({
    submitting: false,
    submitted: false,
    error: null,
    submit: vi.fn(),
    reset: vi.fn(),
  }),
}));

import { RegistrationPage } from "./RegistrationPage";

const openForm = {
  id: "f1",
  title: "Coding camp",
  description: "",
  registrationDate: "2020-01-01",
  memberTypes: [
    { id: "mt1", name: "Active Member", price: 0, currency: "NOK" },
  ],
};

describe("RegistrationPage", () => {
  beforeEach(() => vi.clearAllMocks());

  it("shows a loading message while fetching", () => {
    mockUseForm.mockReturnValue({
      form: null,
      loading: true,
      error: null,
      isOpen: false,
      refetch: vi.fn(),
    });
    render(<RegistrationPage />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it("shows an error state when the fetch fails", () => {
    mockUseForm.mockReturnValue({
      form: null,
      loading: false,
      error: "boom",
      isOpen: false,
      refetch: vi.fn(),
    });
    render(<RegistrationPage />);
    expect(
      screen.getByText(/something went wrong|couldn't load|failed/i),
    ).toBeInTheDocument();
  });

  it("shows the closed banner instead of the wizard when registration is not open", () => {
    mockUseForm.mockReturnValue({
      form: { ...openForm, registrationDate: "2999-01-01" },
      loading: false,
      error: null,
      isOpen: false,
      refetch: vi.fn(),
    });
    render(<RegistrationPage />);
    expect(screen.getByText(/coding camp/i)).toBeInTheDocument();
    expect(screen.queryByText("Active Member")).not.toBeInTheDocument();
  });

  it("shows the wizard when registration is open", () => {
    mockUseForm.mockReturnValue({
      form: openForm,
      loading: false,
      error: null,
      isOpen: true,
      refetch: vi.fn(),
    });
    render(<RegistrationPage />);
    expect(screen.getByText("Active Member")).toBeInTheDocument();
  });
});
