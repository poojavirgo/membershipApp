import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Step } from "./Step";

describe("Step", () => {
  it("renders the title and children", () => {
    render(<Step title="Your details"><p>field content</p></Step>);
    expect(screen.getByRole("heading", { name: "Your details" })).toBeInTheDocument();
    expect(screen.getByText("field content")).toBeInTheDocument();
  });

  it("renders the description when provided", () => {
    render(<Step title="Step" description="Some help text"><p>x</p></Step>);
    expect(screen.getByText("Some help text")).toBeInTheDocument();
  });

  it("omits the description when not provided", () => {
    render(<Step title="Step"><p>x</p></Step>);
    expect(screen.queryByText("Some help text")).not.toBeInTheDocument();
  });
});
