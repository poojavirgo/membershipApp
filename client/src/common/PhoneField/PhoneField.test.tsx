import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PhoneField } from "./PhoneField";

describe("PhoneField", () => {
  it("emits the combined code + digits when typing", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <PhoneField label="Phone" id="phone" value="" onChange={onChange} />,
    );

    await user.type(screen.getByLabelText("Phone"), "87654322");
    // last call should be the full combined value (default code +47)
    expect(onChange).toHaveBeenLastCalledWith("+4787654322");
  });

  it("shows an error message when one is passed", () => {
    render(
      <PhoneField
        label="Phone"
        id="phone"
        value=""
        onChange={vi.fn()}
        error="Phone number is required."
      />,
    );
    expect(screen.getByText("Phone number is required.")).toBeInTheDocument();
  });

  it("splits an existing combined value into code and number", () => {
    render(
      <PhoneField
        label="Phone"
        id="phone"
        value="+4787654322"
        onChange={vi.fn()}
      />,
    );
    expect(screen.getByLabelText("Phone")).toHaveValue("87654322");
  });
});
