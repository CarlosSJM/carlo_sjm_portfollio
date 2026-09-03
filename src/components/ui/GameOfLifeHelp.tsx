"use client";
// 'use client' justified: modal open/close state, focus trap, Escape key,
// and body scroll lock all require browser DOM APIs. Portal-rendered to
// document.body — same reasoning as MobileNav — so no ancestor with
// backdrop-filter/transform can hijack its position: fixed containing block.

import { useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

interface GameOfLifeHelpProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly triggerRef: React.RefObject<HTMLButtonElement | null>;
}

const FOCUSABLE_SELECTOR = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

const CONTROLS = [
  { label: "Click a cell", detail: "While paused, click any square on the grid to bring it to life or kill it. Draw your own starting pattern." },
  { label: "PLAY / PAUSE", detail: "Starts or stops the simulation. Once playing, every cell updates automatically each generation — you can't edit cells until you pause." },
  { label: "RESET (↺)", detail: "Clears the whole grid back to empty, so you can draw a fresh pattern from scratch." },
  { label: "RANDOMIZE (⤨)", detail: "Fills the grid with a random scatter of live cells — a quick way to see chaotic, unpredictable evolution." },
  { label: "SPEED slider", detail: "Controls how many generations happen per second — drag right to slow the simulation down, left to speed it up." },
  { label: "CELL SIZE slider", detail: "Zooms the grid in or out. Changing it resets the board, since the number of rows/columns changes." },
  { label: "GLIDER / PULSAR", detail: "Load a classic, well-known pattern. A Glider is 5 cells that drift diagonally forever. A Pulsar is a larger pattern that oscillates, repeating itself every 3 generations." },
] as const;

export function GameOfLifeHelp({ isOpen, onClose, triggerRef }: GameOfLifeHelpProps): React.JSX.Element | null {
  const panelRef = useRef<HTMLDivElement>(null);
  const shouldReduce = useReducedMotion();

  // Stable identity so the effect below can list it as a dependency without
  // re-running (and re-stealing focus) on every unrelated parent re-render.
  const close = useCallback((): void => {
    onClose();
    triggerRef.current?.focus();
  }, [onClose, triggerRef]);

  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === "Escape") {
        close();
        return;
      }

      if (event.key !== "Tab" || !panelRef.current) return;

      const focusable = panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
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
    const firstFocusable = panelRef.current?.querySelector<HTMLElement>(FOCUSABLE_SELECTOR);
    firstFocusable?.focus();

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, close]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="gameoflife-help-title"
          initial={shouldReduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={shouldReduce ? {} : { opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={close}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-start justify-center p-6 overflow-y-auto"
        >
          <div
            ref={panelRef}
            onClick={(event) => event.stopPropagation()}
            className="relative w-full max-w-2xl border border-white/20 bg-[#0a0a0a] p-8 my-12"
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close help"
              className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
            >
              <X size={20} aria-hidden="true" />
            </button>

            <h4
              id="gameoflife-help-title"
              className="text-white tracking-[0.15em] text-lg font-mono mb-4"
            >
              HOW IT WORKS
            </h4>

            <p className="text-[#A0A0A0] text-sm leading-relaxed mb-6">
              Conway&apos;s Game of Life is a <strong className="text-white/80">cellular automaton</strong>:
              a grid of cells, each either alive or dead. Every generation, all cells update at once
              following four simple rules based on how many live neighbors they have:
            </p>

            <ul className="text-[#A0A0A0] text-sm leading-relaxed mb-6 space-y-2 list-disc list-inside">
              <li>A live cell with <strong className="text-white/80">2 or 3</strong> live neighbors survives</li>
              <li>A live cell with fewer than 2, or more than 3, live neighbors dies</li>
              <li>A dead cell with <strong className="text-white/80">exactly 3</strong> live neighbors becomes alive</li>
              <li>Everything else stays as it is</li>
            </ul>

            <p className="text-[#A0A0A0] text-sm leading-relaxed mb-8">
              No player, no strategy — just an initial pattern left to evolve on its own. Simple rules,
              endlessly complex results.
            </p>

            <h4 className="text-white tracking-[0.15em] text-lg font-mono mb-4">CONTROLS</h4>

            <dl className="space-y-4">
              {CONTROLS.map((control) => (
                <div key={control.label}>
                  <dt className="text-white text-xs tracking-[0.1em] font-mono mb-1">
                    {control.label}
                  </dt>
                  <dd className="text-[#A0A0A0] text-sm leading-relaxed">{control.detail}</dd>
                </div>
              ))}
            </dl>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
