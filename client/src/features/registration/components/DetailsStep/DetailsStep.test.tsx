import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DetailsStep } from "./DetailsStep";
import type { RegistrantInfo, FieldErrors } from "../../../../types";

const empty: RegistrantInfo = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  birthDate: "",
};

describe("DetailsStep", () => {
  it("renders all the input fields", () => {
    render(<DetailsStep registrant={empty} errors={{}} onChange={vi.fn()} />);
    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/phone number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/birth date/i)).toBeInTheDocument();
  });

  it("calls onChange with the field id and typed value", async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<DetailsStep registrant={empty} errors={{}} onChange={onChange} />);

    await user.type(screen.getByLabelText(/first name/i), "A");
    expect(onChange).toHaveBeenCalledWith("firstName", "A");
  });

  it("displays field errors when present", () => {
    const errors: FieldErrors<RegistrantInfo> = {
      firstName: "First name is required.",
      email: "Enter a valid email address.",
    };
    render(
      <DetailsStep registrant={empty} errors={errors} onChange={vi.fn()} />,
    );
    expect(screen.getByText("First name is required.")).toBeInTheDocument();
    expect(
      screen.getByText("Enter a valid email address."),
    ).toBeInTheDocument();
  });
});
