"use client";

import { useReducer, useEffect, useRef, useCallback } from "react";
import { siteConfig } from "@/lib/config";

export interface TerminalOutputLine {
  id: string;
  type: "system" | "user" | "error" | "ascii";
  text: string;
}

export interface TerminalState {
  isOpen: boolean;
  input: string;
  history: string[];
  historyIndex: number; // -1 means typing new command; >= 0 points to history index
  output: TerminalOutputLine[];
  status: "idle" | "executing";
}

export type TerminalAction =
  | { type: "OPEN" }
  | { type: "CLOSE" }
  | { type: "TOGGLE" }
  | { type: "SET_INPUT"; input: string }
  | { type: "HISTORY_PREV" }
  | { type: "HISTORY_NEXT" }
  | { type: "EXECUTE_START"; command: string }
  | { type: "EXECUTE_FINISH"; lines: TerminalOutputLine[] }
  | { type: "CLEAR" };

const initialOutput: TerminalOutputLine[] = [
  { id: "1", type: "system", text: "Welcome to HK-OS v2.0.0" },
  { id: "2", type: "system", text: 'Type "help" to see available commands.' },
];

export function terminalReducer(
  state: TerminalState,
  action: TerminalAction
): TerminalState {
  switch (action.type) {
    case "OPEN":
      return { ...state, isOpen: true };
    case "CLOSE":
      return { ...state, isOpen: false };
    case "TOGGLE":
      return { ...state, isOpen: !state.isOpen };
    case "SET_INPUT":
      return { ...state, input: action.input };
    case "HISTORY_PREV": {
      if (state.history.length === 0) return state;
      const nextIndex =
        state.historyIndex === -1
          ? state.history.length - 1
          : Math.max(0, state.historyIndex - 1);
      return {
        ...state,
        historyIndex: nextIndex,
        input: state.history[nextIndex] || "",
      };
    }
    case "HISTORY_NEXT": {
      if (state.historyIndex === -1) return state;
      const nextIndex = state.historyIndex + 1;
      if (nextIndex >= state.history.length) {
        return {
          ...state,
          historyIndex: -1,
          input: "",
        };
      }
      return {
        ...state,
        historyIndex: nextIndex,
        input: state.history[nextIndex] || "",
      };
    }
    case "EXECUTE_START": {
      const trimmed = action.command.trim();
      const updatedHistory = trimmed
        ? [...state.history.filter((c) => c !== trimmed), trimmed]
        : state.history;
      const userLine: TerminalOutputLine = {
        id: Math.random().toString(36).substring(2, 9),
        type: "user",
        text: `$ ${action.command}`,
      };
      return {
        ...state,
        input: "",
        historyIndex: -1,
        history: updatedHistory,
        output: [...state.output, userLine],
        status: "executing",
      };
    }
    case "EXECUTE_FINISH": {
      return {
        ...state,
        output: [...state.output, ...action.lines],
        status: "idle",
      };
    }
    case "CLEAR": {
      return {
        ...state,
        output: [],
        input: "",
        status: "idle",
      };
    }
    default:
      return state;
  }
}

export function useTerminalMachine() {
  const [state, dispatch] = useReducer(terminalReducer, {
    isOpen: false,
    input: "",
    history: [],
    historyIndex: -1,
    output: initialOutput,
    status: "idle",
  });

  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Shortcut key listeners: Ctrl+` or Ctrl+K to toggle, Esc to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey && e.key === "`") || (e.ctrlKey && e.key === "k")) {
        e.preventDefault();
        dispatch({ type: "TOGGLE" });
      } else if (e.key === "Escape" && state.isOpen) {
        dispatch({ type: "CLOSE" });
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [state.isOpen]);

  // Focus and scroll to bottom when opened or output changes
  useEffect(() => {
    if (state.isOpen && inputRef.current) {
      inputRef.current.focus();
      const timer = setTimeout(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [state.isOpen, state.output]);

  const executeCommand = useCallback(
    (commandString: string) => {
      const raw = commandString.trim();
      if (!raw) return;

      dispatch({ type: "EXECUTE_START", command: raw });

      const cmd = raw.toLowerCase();
      const resultLines: TerminalOutputLine[] = [];
      const makeId = () => Math.random().toString(36).substring(2, 9);

      switch (cmd) {
        case "help":
          resultLines.push({
            id: makeId(),
            type: "system",
            text: "Available commands: help, whoami, education, projects, contact, resume, skills, neofetch, clear, exit",
          });
          break;
        case "whoami":
          resultLines.push({
            id: makeId(),
            type: "system",
            text: `I am ${siteConfig.author}, a Final-Year Computer Science Engineering student (Semester VII) at KPRIET and Software Engineer focused on backend systems and scalability.`,
          });
          break;
        case "education":
        case "edu":
          resultLines.push({
            id: makeId(),
            type: "system",
            text: "B.E. Computer Science and Engineering @ KPRIET (Semester VII, Final Year: Sep 2023 — Sep 2027) | CGPA: 7.9",
          });
          break;
        case "clear":
          dispatch({ type: "CLEAR" });
          return;
        case "exit":
        case "quit":
          dispatch({ type: "CLOSE" });
          return;
        case "projects":
          resultLines.push({
            id: makeId(),
            type: "system",
            text: "Loading top projects...",
          });
          siteConfig.projects.slice(0, 4).forEach((p) => {
            resultLines.push({
              id: makeId(),
              type: "system",
              text: `- ${p.name}: ${p.description}`,
            });
          });
          break;
        case "skills":
          resultLines.push({
            id: makeId(),
            type: "system",
            text: "Core Skills: Java, JavaScript, TypeScript, React, Next.js, Node.js, Python, MongoDB, MySQL, Git",
          });
          break;
        case "contact":
          resultLines.push({
            id: makeId(),
            type: "system",
            text: `Email: ${siteConfig.contact.email}\nGitHub: github.com/${siteConfig.social.github}\nLinkedIn: linkedin.com/in/${siteConfig.social.linkedin}`,
          });
          break;
        case "resume":
          resultLines.push({
            id: makeId(),
            type: "system",
            text: `Opening resume from ${siteConfig.resumeUrl}...`,
          });
          if (typeof window !== "undefined") {
            window.open(siteConfig.resumeUrl, "_blank");
          }
          break;
        case "neofetch":
          resultLines.push({
            id: makeId(),
            type: "ascii",
            text: `
     /\\     OS: HK-OS v2.0
    /  \\    Kernel: 5.15.0-x86_64
   /____\\   Uptime: 1337 days
  /      \\  Shell: zsh/antigravity
 /________\\ User: Hareram Kushwaha (KPRIET VII Sem)
`,
          });
          break;
        case "sudo":
          resultLines.push({
            id: makeId(),
            type: "error",
            text: "Nice try! This incident will be reported.",
          });
          break;
        default:
          resultLines.push({
            id: makeId(),
            type: "error",
            text: `Command not found: ${cmd}. Type "help" for a list of commands.`,
          });
      }

      dispatch({ type: "EXECUTE_FINISH", lines: resultLines });
    },
    []
  );

  return {
    isOpen: state.isOpen,
    status: state.status,
    input: state.input,
    output: state.output,
    inputRef,
    bottomRef,
    open: () => dispatch({ type: "OPEN" }),
    close: () => dispatch({ type: "CLOSE" }),
    toggle: () => dispatch({ type: "TOGGLE" }),
    setInput: (input: string) => dispatch({ type: "SET_INPUT", input }),
    historyPrev: () => dispatch({ type: "HISTORY_PREV" }),
    historyNext: () => dispatch({ type: "HISTORY_NEXT" }),
    executeCommand,
  };
}

