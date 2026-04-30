import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

function Hello({ name }: { name: string }) {
  return <h1>Hello, {name}</h1>;
}

describe("Vitest setup smoke test", () => {
  it("renders a component and queries the DOM", () => {
    render(<Hello name="Portfolio" />);
    expect(
      screen.getByRole("heading", { level: 1, name: "Hello, Portfolio" }),
    ).toBeInTheDocument();
  });

  it("supports basic assertions", () => {
    expect(2 + 2).toBe(4);
  });
});
