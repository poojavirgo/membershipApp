import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Stepper } from "./Stepper";

const labels = ["Membership", "Details", "Review"];

describe("Stepper", () => {
  it("renders all step labels", () => {
    render(<Stepper labels={labels} current={1} />);
    labels.forEach((l) => expect(screen.getByText(l)).toBeInTheDocument());
  });

  it("shows a checkmark for completed steps", () => {
    render(<Stepper labels={labels} current={3} />);
    const checks = screen.getAllByText("✓");
    expect(checks).toHaveLength(2);
  });

  it("shows the number for the current and upcoming steps", () => {
    render(<Stepper labels={labels} current={2} />);
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("exposes a progress label for accessibility", () => {
    render(<Stepper labels={labels} current={1} />);
    expect(screen.getByLabelText("Progress")).toBeInTheDocument();
  });
});
