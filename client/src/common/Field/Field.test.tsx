import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Field } from "./Field";

describe("Field", () => {
  it("renders a label associated with the input", () => {
    render(<Field id="email" label="Email" value="" onChange={vi.fn()} />);
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
  });
  it("calls onChange with the typed value", async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();
    render(<Field id="email" label="Email" value="" onChange={onChange} />);
    await user.type(screen.getByLabelText("Email"), "a");
    expect(onChange).toHaveBeenCalledWith("a");
  });
  it("shows an error message when provided", () => {
    render(
      <Field
        id="email"
        label="Email"
        value=""
        onChange={vi.fn()}
        error="Required"
      />,
    );
    expect(screen.getByText("Required")).toBeInTheDocument();
  });
});
