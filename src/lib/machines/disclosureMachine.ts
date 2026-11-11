"use client";

import { useReducer, useEffect, useCallback } from "react";

export type DisclosureState = "closed" | "open";

export type DisclosureAction =
  | { type: "OPEN" }
  | { type: "CLOSE" }
  | { type: "TOGGLE" };

export function disclosureReducer(
  state: DisclosureState,
  action: DisclosureAction
): DisclosureState {
  switch (action.type) {
    case "OPEN":
      return "open";
    case "CLOSE":
      return "closed";
    case "TOGGLE":
      return state === "open" ? "closed" : "open";
    default:
      return state;
  }
}

export interface UseDisclosureOptions {
  initialState?: DisclosureState;
  closeOnEscape?: boolean;
  lockBodyScroll?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
}

export function useDisclosure(options: UseDisclosureOptions = {}) {
  const {
    initialState = "closed",
    closeOnEscape = true,
    lockBodyScroll = false,
    onOpen,
    onClose,
  } = options;

  const [state, dispatch] = useReducer(disclosureReducer, initialState);
  const isOpen = state === "open";

  const open = useCallback(() => {
    dispatch({ type: "OPEN" });
    onOpen?.();
  }, [onOpen]);

  const close = useCallback(() => {
    dispatch({ type: "CLOSE" });
    onClose?.();
  }, [onClose]);

  const toggle = useCallback(() => {
    if (state === "open") {
      close();
    } else {
      open();
    }
  }, [state, close, open]);

  // Handle Escape key
  useEffect(() => {
    if (!closeOnEscape || !isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [closeOnEscape, isOpen, close]);

  // Handle body scroll lock
  useEffect(() => {
    if (!lockBodyScroll) return;

    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow || "unset";
      };
    }
  }, [lockBodyScroll, isOpen]);

  return {
    state,
    isOpen,
    open,
    close,
    toggle,
    ariaProps: {
      "aria-expanded": isOpen,
      "data-state": state,
    },
  };
}

