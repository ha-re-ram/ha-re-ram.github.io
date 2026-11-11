/**
 * Core type definitions for explicit finite state machines in the project.
 * Designed to elevate UX (predictable states, accessibility), DX (type safety, pure reducers),
 * and AX (Agent Experience: queryable data-state/data-status DOM attributes and deterministic transitions).
 */

export type MachineStatus = 'idle' | 'loading' | 'success' | 'error' | 'empty';

export interface BaseState<TStatus extends string = string> {
  status: TStatus;
  error?: string | null;
}

export type MachineAction<TType extends string = string, TPayload = undefined> = TPayload extends undefined
  ? { type: TType }
  : { type: TType; payload: TPayload };

