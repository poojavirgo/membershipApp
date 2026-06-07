import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Banner } from "./Banner";

describe("Banner", () => {
  it("renders the title and children", () => {
    render(
      <Banner variant="success" title="All done">
        Your message
      </Banner>,
    );
    expect(screen.getByText("All done")).toBeInTheDocument();
    expect(screen.getByText("Your message")).toBeInTheDocument();
  });
});
