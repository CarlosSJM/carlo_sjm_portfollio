"use client";

// 'use client' justified: open/closed state, keyboard event handling (Escape,
// focus trap), and body scroll lock all require browser DOM APIs.

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import type { NavLink } from "@/types";

interface MobileNavProps {
  links: readonly NavLink[];
}

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function MobileNav({ links }: MobileNavProps): React.JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const shouldReduce = useReducedMotion();

  const close = (): void => {
    setIsOpen(false);
    toggleRef.current?.focus();
  };

  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === "Escape") {
        close();
        return;
      }

      if (event.key !== "Tab" || !drawerRef.current) return;

      const focusable = drawerRef.current.querySelectorAll<HTMLElement>(
        FOCUSABLE_SELECTOR
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    const firstLink = drawerRef.current?.querySelector<HTMLElement>(
      FOCUSABLE_SELECTOR
    );
    firstLink?.focus();

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div className="md:hidden">
      <button
        ref={toggleRef}
        type="button"
        aria-expanded={isOpen}
        aria-controls="mobile-nav-drawer"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        onClick={() => setIsOpen((prev) => !prev)}
        className="text-white/80 hover:text-white transition-colors"
      >
        {isOpen ? (
          <X size={24} aria-hidden="true" />
        ) : (
          <Menu size={24} aria-hidden="true" />
        )}
      </button>

      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {isOpen && (
              <motion.div
                id="mobile-nav-drawer"
                ref={drawerRef}
                role="dialog"
                aria-modal="true"
                aria-label="Main menu"
                initial={shouldReduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={shouldReduce ? {} : { opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={close}
                className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex flex-col items-center justify-start gap-6 overflow-y-auto py-24"
              >
                {links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={close}
                    className="font-mono text-lg tracking-[0.15em] text-white/80 hover:text-white transition-colors"
                  >
                    {link.label.toUpperCase()}
                  </a>
                ))}
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </div>
  );
}
