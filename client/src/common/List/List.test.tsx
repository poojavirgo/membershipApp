import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { List } from "./List";

describe("List", () => {
  it("renders its children", () => {
    render(
      <List>
        <dt>Label</dt>
        <dd>Value</dd>
      </List>,
    );
    expect(screen.getByText("Label")).toBeInTheDocument();
    expect(screen.getByText("Value")).toBeInTheDocument();
  });
});
