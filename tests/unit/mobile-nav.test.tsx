import { describe, it, expect } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MobileNav } from "@/components/layout/MobileNav";

const LINKS = [
  { label: "About", href: "#about" as const },
  { label: "Contact", href: "#contact" as const },
];

describe("MobileNav", () => {
  it("renders closed by default", () => {
    render(<MobileNav links={LINKS} />);
    const toggle = screen.getByRole("button", { name: "Open menu" });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("opens the drawer and flips aria-expanded on toggle click", () => {
    render(<MobileNav links={LINKS} />);
    const toggle = screen.getByRole("button", { name: "Open menu" });
    fireEvent.click(toggle);

    expect(screen.getByRole("button", { name: "Close menu" })).toHaveAttribute(
      "aria-expanded",
      "true"
    );
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("shows all nav links inside the open drawer", () => {
    render(<MobileNav links={LINKS} />);
    fireEvent.click(screen.getByRole("button", { name: "Open menu" }));

    expect(screen.getByRole("link", { name: "ABOUT" })).toHaveAttribute(
      "href",
      "#about"
    );
    expect(screen.getByRole("link", { name: "CONTACT" })).toHaveAttribute(
      "href",
      "#contact"
    );
  });

  it("closes the drawer on Escape key", async () => {
    render(<MobileNav links={LINKS} />);
    fireEvent.click(screen.getByRole("button", { name: "Open menu" }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    fireEvent.keyDown(document, { key: "Escape" });
    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
    );
  });

  it("closes the drawer when a nav link is clicked", async () => {
    render(<MobileNav links={LINKS} />);
    fireEvent.click(screen.getByRole("button", { name: "Open menu" }));
    fireEvent.click(screen.getByRole("link", { name: "ABOUT" }));

    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
    );
  });
});
