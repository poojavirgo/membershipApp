import { describe, it, expect } from "vitest";
import { interpolate } from "../interpolate";

describe("interpolate", () => {
  it("replaces a single placeholder", () => {
    expect(interpolate("Hi {name}", { name: "Ada" })).toBe("Hi Ada");
  });
  it("replaces multiple placeholders", () => {
    expect(
      interpolate("Opens on {date} for {title}", {
        date: "Jan 1",
        title: "Camp",
      }),
    ).toBe("Opens on Jan 1 for Camp");
  });
  it("leaves the string unchanged when there are no placeholders", () => {
    expect(interpolate("No tokens here", {})).toBe("No tokens here");
  });
  it("replaces a missing key with an empty string", () => {
    expect(interpolate("Hi {name}", {})).toBe("Hi ");
  });
});
