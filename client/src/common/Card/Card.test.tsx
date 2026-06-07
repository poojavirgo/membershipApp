import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Card } from "./Card";

describe("Card", () => {
  it("renders its children", () => {
    render(<Card>Hello</Card>);
    expect(screen.getByText("Hello")).toBeInTheDocument();
  });

  it("renders as a non-interactive element when no onClick is given", () => {
    render(<Card>Static</Card>);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("renders as a button and fires onClick when interactive", async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();
    render(<Card onClick={onClick}>Click me</Card>);
    const btn = screen.getByRole("button", { name: "Click me" });
    await user.click(btn);
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("applies the selected style when selected", () => {
    const { container } = render(
      <Card onClick={vi.fn()} selected>
        Picked
      </Card>,
    );
    const el = container.querySelector("button");
    expect(el?.className).toMatch(/selected/);
  });
});
