import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Wizard } from "./Wizard";
import type { MembershipForm } from "../../../../types";

vi.mock("../../../../hooks", () => ({
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
  title: "Lillestrøm IL",
  description: "",
  registrationDate: "2020-01-01",
  memberTypes: [
    { id: "mt1", name: "Active Member", price: 0, currency: "NOK" },
    { id: "mt2", name: "Social Member", price: 0, currency: "NOK" },
  ],
};

describe("Wizard (integration)", () => {
  beforeEach(() => vi.clearAllMocks());

  it("renders the form title and member types on step 1", () => {
    render(<Wizard form={form} />);
    expect(screen.getByText("Lillestrøm IL")).toBeInTheDocument();
    expect(screen.getByText("Active Member")).toBeInTheDocument();
    expect(screen.getByText("Social Member")).toBeInTheDocument();
  });

  it("blocks Continue on step 1 when no member type is chosen", async () => {
    const user = userEvent.setup();
    render(<Wizard form={form} />);
    await user.click(screen.getByRole("button", { name: /continue/i }));
    expect(screen.queryByLabelText(/first name/i)).not.toBeInTheDocument();
  });

  it("walks through all three steps to the review screen", async () => {
    const user = userEvent.setup();
    render(<Wizard form={form} />);
    await user.click(screen.getByText("Active Member"));
    await user.click(screen.getByRole("button", { name: /continue/i }));
    await user.type(screen.getByLabelText(/first name/i), "Ada");
    await user.type(screen.getByLabelText(/last name/i), "Lovelace");
    await user.type(screen.getByLabelText(/email/i), "ada@example.com");
    await user.type(screen.getByLabelText(/phone number/i), "87654322");
    await user.type(screen.getByLabelText(/birth date/i), "1990-01-01");
    await user.click(screen.getByRole("button", { name: /continue/i }));
    expect(screen.getByText(/review your registration/i)).toBeInTheDocument();
    expect(screen.getByText("ada@example.com")).toBeInTheDocument();
  });

  it("shows validation errors when details are empty", async () => {
    const user = userEvent.setup();
    render(<Wizard form={form} />);
    await user.click(screen.getByText("Active Member"));
    await user.click(screen.getByRole("button", { name: /continue/i }));
    await user.click(screen.getByRole("button", { name: /continue/i }));
    expect(screen.getByText(/first name is required/i)).toBeInTheDocument();
  });
});
