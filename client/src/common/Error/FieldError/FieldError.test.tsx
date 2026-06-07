import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { FieldError } from "./FieldError";

describe("FieldError", () => {
  it("renders nothing when there is no message", () => {
    const { container } = render(<FieldError message={undefined} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("renders the message when present", () => {
    render(<FieldError message="Email is required." />);
    expect(screen.getByText("Email is required.")).toBeInTheDocument();
  });
});
