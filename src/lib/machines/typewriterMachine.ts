"use client";

import { useReducer, useEffect, useRef } from "react";

export type TypewriterPhase = "typing" | "paused_full" | "deleting" | "paused_empty";

export interface TypewriterState {
  phase: TypewriterPhase;
  wordIndex: number;
  text: string;
}

export type TypewriterAction =
  | { type: "TYPE_CHAR"; char: string }
  | { type: "FINISH_WORD" }
  | { type: "START_DELETING" }
  | { type: "DELETE_CHAR" }
  | { type: "FINISH_DELETING"; nextWordIndex: number }
  | { type: "START_TYPING" };

export function typewriterReducer(
  state: TypewriterState,
  action: TypewriterAction
): TypewriterState {
  switch (action.type) {
    case "TYPE_CHAR":
      return {
        ...state,
        phase: "typing",
        text: state.text + action.char,
      };
    case "FINISH_WORD":
      return {
        ...state,
        phase: "paused_full",
      };
    case "START_DELETING":
      return {
        ...state,
        phase: "deleting",
      };
    case "DELETE_CHAR":
      return {
        ...state,
        phase: "deleting",
        text: state.text.slice(0, -1),
      };
    case "FINISH_DELETING":
      return {
        ...state,
        phase: "paused_empty",
        wordIndex: action.nextWordIndex,
      };
    case "START_TYPING":
      return {
        ...state,
        phase: "typing",
      };
    default:
      return state;
  }
}

export interface UseTypewriterOptions {
  words: string[];
  typingSpeedMs?: number;
  deletingSpeedMs?: number;
  pauseFullMs?: number;
  pauseEmptyMs?: number;
}

export function useTypewriterMachine({
  words,
  typingSpeedMs = 75,
  deletingSpeedMs = 35,
  pauseFullMs = 2000,
  pauseEmptyMs = 150,
}: UseTypewriterOptions) {
  const [state, dispatch] = useReducer(typewriterReducer, {
    phase: "typing",
    wordIndex: 0,
    text: "",
  });

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!words.length) return;
    const currentWord = words[state.wordIndex % words.length];

    if (state.phase === "typing") {
      if (state.text.length < currentWord.length) {
        const nextChar = currentWord[state.text.length];
        timerRef.current = setTimeout(() => {
          dispatch({ type: "TYPE_CHAR", char: nextChar });
        }, typingSpeedMs);
      } else {
        dispatch({ type: "FINISH_WORD" });
      }
    } else if (state.phase === "paused_full") {
      timerRef.current = setTimeout(() => {
        dispatch({ type: "START_DELETING" });
      }, pauseFullMs);
    } else if (state.phase === "deleting") {
      if (state.text.length > 0) {
        timerRef.current = setTimeout(() => {
          dispatch({ type: "DELETE_CHAR" });
        }, deletingSpeedMs);
      } else {
        const nextWordIndex = (state.wordIndex + 1) % words.length;
        dispatch({ type: "FINISH_DELETING", nextWordIndex });
      }
    } else if (state.phase === "paused_empty") {
      timerRef.current = setTimeout(() => {
        dispatch({ type: "START_TYPING" });
      }, pauseEmptyMs);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [
    state.phase,
    state.text,
    state.wordIndex,
    words,
    typingSpeedMs,
    deletingSpeedMs,
    pauseFullMs,
    pauseEmptyMs,
  ]);

  return {
    text: state.text,
    phase: state.phase,
    currentWordIndex: state.wordIndex,
  };
}

