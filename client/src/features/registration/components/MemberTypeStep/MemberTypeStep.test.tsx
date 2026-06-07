import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemberTypeStep } from "./MemberTypeStep";
import type { MemberType } from "../../../../types";

const types: MemberType[] = [
  { id: "mt1", name: "Active Member", price: 0, currency: "NOK" },
  { id: "mt2", name: "Social Member", price: 0, currency: "NOK" },
];

describe("MemberTypeStep", () => {
  it("renders the title and all member types", () => {
    render(
      <MemberTypeStep
        title="Coding camp"
        description=""
        memberTypes={types}
        selectedId={null}
        onSelect={vi.fn()}
      />,
    );
    expect(screen.getByText("Coding camp")).toBeInTheDocument();
    expect(screen.getByText("Active Member")).toBeInTheDocument();
    expect(screen.getByText("Social Member")).toBeInTheDocument();
  });

  it("calls onSelect with the type id when a card is clicked", async () => {
    const onSelect = vi.fn();
    const user = userEvent.setup();
    render(
      <MemberTypeStep
        title="t"
        description=""
        memberTypes={types}
        selectedId={null}
        onSelect={onSelect}
      />,
    );
    await user.click(screen.getByText("Active Member"));
    expect(onSelect).toHaveBeenCalledWith("mt1");
  });

  it("marks the selected type as checked", () => {
    render(
      <MemberTypeStep
        title="t"
        description=""
        memberTypes={types}
        selectedId="mt1"
        onSelect={vi.fn()}
      />,
    );
    const radios = screen.getAllByRole("radio");
    expect(radios[0]).toHaveAttribute("aria-checked", "true");
    expect(radios[1]).toHaveAttribute("aria-checked", "false");
  });

  it("shows an error message when provided", () => {
    render(
      <MemberTypeStep
        title="t"
        description=""
        memberTypes={types}
        selectedId={null}
        error="Please select a membership type."
        onSelect={vi.fn()}
      />,
    );
    expect(
      screen.getByText("Please select a membership type."),
    ).toBeInTheDocument();
  });
});
