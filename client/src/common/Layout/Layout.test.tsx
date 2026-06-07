import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Layout } from "./Layout";

describe("Layout", () => {
  it("renders the title as a heading", () => {
    render(
      <Layout title="Club Membership Registration">
        <p>content</p>
      </Layout>,
    );
    expect(
      screen.getByRole("heading", { name: "Club Membership Registration" }),
    ).toBeInTheDocument();
  });

  it("renders its children", () => {
    render(
      <Layout title="Any Title">
        <p>Inner content</p>
      </Layout>,
    );
    expect(screen.getByText("Inner content")).toBeInTheDocument();
  });
});
