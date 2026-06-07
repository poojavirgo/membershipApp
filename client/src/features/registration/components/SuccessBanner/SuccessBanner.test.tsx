import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { SuccessBanner } from "./SuccessBanner";

describe("SuccessBanner", () => {
  it("shows the success title and includes the registrant's details", () => {
    render(
      <SuccessBanner
        firstName="Ada"
        memberTypeName="Active Member"
        email="ada@example.com"
        onReset={vi.fn()}
      />,
    );
    expect(screen.getByText(/Ada/)).toBeInTheDocument();
    expect(screen.getByText(/Active Member/)).toBeInTheDocument();
    expect(screen.getByText(/ada@example\.com/)).toBeInTheDocument();
  });

  it("calls onReset when 'Register another' is clicked", async () => {
    const onReset = vi.fn();
    const user = userEvent.setup();
    render(
      <SuccessBanner
        firstName="Ada"
        memberTypeName="Active Member"
        email="ada@example.com"
        onReset={vi.fn() && onReset}
      />,
    );
    await user.click(screen.getByRole("button", { name: Txt_again() }));
    expect(onReset).toHaveBeenCalledOnce();
  });
});

function Txt_again() {
  return /register another/i;
}
