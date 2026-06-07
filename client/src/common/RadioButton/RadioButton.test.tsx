import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { RadioButton } from "./RadioButton";

describe("RadioButton", () => {
  it("exposes a radio role", () => {
    render(<RadioButton checked={false} label="Active Member" />);
    expect(screen.getByRole("radio")).toBeInTheDocument();
  });

  it("reflects the checked state via aria-checked", () => {
    render(<RadioButton checked label="Active Member" />);
    expect(screen.getByRole("radio")).toHaveAttribute("aria-checked", "true");
  });

  it("is not checked when checked is false", () => {
    render(<RadioButton checked={false} label="Social Member" />);
    expect(screen.getByRole("radio")).toHaveAttribute("aria-checked", "false");
  });

  it("uses the label as its accessible name", () => {
    render(<RadioButton checked={false} label="Active Member" />);
    expect(
      screen.getByRole("radio", { name: "Active Member" }),
    ).toBeInTheDocument();
  });
});
