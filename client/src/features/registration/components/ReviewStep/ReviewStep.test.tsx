import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ReviewStep } from "./ReviewStep";
import type { MemberType, RegistrantInfo } from "../../../../types";

const memberType: MemberType = {
  id: "mt1",
  name: "Active Member",
  price: 0,
  currency: "NOK",
};

const registrant: RegistrantInfo = {
  firstName: "Ada",
  lastName: "Lovelace",
  email: "ada@example.com",
  phone: "+4787654322",
  birthDate: "1990-01-01",
};

describe("ReviewStep", () => {
  it("shows the entered details for review", () => {
    render(<ReviewStep memberType={memberType} registrant={registrant} />);
    expect(screen.getByText("Active Member")).toBeInTheDocument();
    expect(screen.getByText("Ada Lovelace")).toBeInTheDocument();
    expect(screen.getByText("ada@example.com")).toBeInTheDocument();
    expect(screen.getByText("+4787654322")).toBeInTheDocument();
  });

  it("shows a submission error when provided", () => {
    render(
      <ReviewStep
        memberType={memberType}
        registrant={registrant}
        error="Something went wrong. Please try again."
      />,
    );
    expect(
      screen.getByText("Something went wrong. Please try again."),
    ).toBeInTheDocument();
  });
});
