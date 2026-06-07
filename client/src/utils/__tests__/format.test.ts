import { describe, it, expect, vi, afterEach } from "vitest";
import { formatPrice, formatDate, digitsOnly, combinePhone } from "../format";

describe("formatPrice", () => {
  it("shows Free for zero", () => {
    expect(formatPrice(0, "NOK")).toBe("Free");
  });
  it("formats a non-zero amount with the currency", () => {
    const result = formatPrice(120000, "NOK");
    expect(result).not.toBe("Free");
    expect(result).toMatch(/1.?200/);
  });
  it("falls back gracefully on an unknown currency code", () => {
    const result = formatPrice(5000, "ZZZ");
    expect(result).toContain("50");
  });
});

describe("formatDate", () => {
  it("formats an ISO date into a readable string", () => {
    const result = formatDate("2026-01-01");
    expect(result).toMatch(/2026/);
    expect(result).toMatch(/January|Jan/i);
  });
  it("returns the original string for an unparseable date", () => {
    expect(formatDate("not-a-date")).toBe("not-a-date");
  });
});

describe("digitsOnly", () => {
  it("strips spaces, dashes, and the plus", () => {
    expect(digitsOnly("+47 876-54 322")).toBe("4787654322");
  });
  it("returns empty when there are no digits", () => {
    expect(digitsOnly("we")).toBe("");
    expect(digitsOnly("")).toBe("");
  });
});

describe("combinePhone", () => {
  it("returns empty for empty or whitespace input", () => {
    expect(combinePhone("+47", "")).toBe("");
    expect(combinePhone("+47", "   ")).toBe("");
  });
  it("keeps the country code even when the input has no digits", () => {
    expect(combinePhone("+47", "w")).toBe("+47");
  });
  it("combines code and digits, stripping formatting", () => {
    expect(combinePhone("+47", "876 54 322")).toBe("+4787654322");
  });
});
