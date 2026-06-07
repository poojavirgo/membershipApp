import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Row } from "./Row";

describe("Row", () => {
  it("renders the label and value", () => {
    render(<Row label="Email" value="ada@example.com" />);
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("ada@example.com")).toBeInTheDocument();
  });
});
