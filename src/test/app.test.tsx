import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import App from "@/App";
import { navLinks, siteConfig } from "@/config/site";

const originalMatchMedia = window.matchMedia;

function renderApp() {
  window.history.pushState({}, "", "/");
  return render(<App />);
}

function mockMatchMedia(prefersReducedMotion: boolean) {
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches: query.includes("prefers-reduced-motion")
      ? prefersReducedMotion
      : false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
}

afterEach(() => {
  cleanup();
  window.matchMedia = originalMatchMedia;
});

describe("portfolio website", () => {
  it("renders the main page and every primary nav target exists", () => {
    renderApp();

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "I build websites that make brands look premium.",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Featured Work" }),
    ).toBeInTheDocument();

    for (const link of navLinks) {
      expect(document.querySelector(link.href)).toBeInTheDocument();
      expect(screen.getAllByRole("link", { name: link.label }).length).toBeGreaterThan(0);
    }
  });

  it("opens and closes the mobile menu from keyboard-accessible controls", () => {
    renderApp();

    const menuButton = screen.getByRole("button", { name: "Open menu" });
    fireEvent.click(menuButton);

    expect(menuButton).toHaveAttribute("aria-expanded", "true");

    const mobileMenu = document.getElementById("mobile-navigation");
    expect(mobileMenu).toBeInTheDocument();

    const contactLink = within(mobileMenu as HTMLElement).getByRole("link", {
      name: "Contact",
    });
    fireEvent.click(contactLink);

    expect(menuButton).toHaveAttribute("aria-expanded", "false");
  });

  it("lets users manually choose a project carousel slide", () => {
    renderApp();

    const secondSlideButton = screen.getByRole("button", {
      name: "Show Elegant Star Wedding Platform slide 2",
    });
    fireEvent.click(secondSlideButton);

    expect(secondSlideButton).toHaveAttribute("aria-current", "true");
  });

  it("uses centralized contact destinations", () => {
    renderApp();

    const projectLinks = screen.getAllByRole("link", {
      name: siteConfig.contact.whatsapp.label,
    });
    expect(projectLinks[0]).toHaveAttribute(
      "href",
      siteConfig.contact.whatsapp.href,
    );
    expect(
      screen.getByRole("link", { name: siteConfig.contact.email.label }),
    ).toHaveAttribute("href", siteConfig.contact.email.href);
    expect(
      screen.getByRole("link", { name: siteConfig.contact.viber.label }),
    ).toHaveAttribute("href", siteConfig.contact.viber.href);
  });

  it("keeps important images accessible", () => {
    renderApp();

    expect(
      screen.getAllByAltText("JackNex Studio designer and developer portrait")
        .length,
    ).toBeGreaterThanOrEqual(1);
    expect(
      screen.getByAltText(
        "Elegant Star wedding platform desktop homepage preview",
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByAltText("Power House Gym mobile homepage preview"),
    ).toBeInTheDocument();
  });

  it("keeps content visible when reduced motion is preferred", () => {
    mockMatchMedia(true);
    renderApp();

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "I build websites that make brands look premium.",
      }),
    ).toBeVisible();
    expect(screen.getByRole("heading", { name: "From First Idea to Final Launch" })).toBeVisible();
  });
});
