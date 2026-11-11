"use client";

import { useReducer, useCallback } from "react";
import { useForm } from "@formspree/react";
import { siteConfig } from "@/lib/config";

export type ContactFormStatus = "idle" | "submitting" | "success" | "error";

export interface ContactFormState {
  status: ContactFormStatus;
  formKey: number; // Increment to reset native form elements
}

export type ContactFormAction =
  | { type: "SUBMIT_START" }
  | { type: "SUBMIT_SUCCESS" }
  | { type: "SUBMIT_ERROR" }
  | { type: "RESET" };

export function contactFormReducer(
  state: ContactFormState,
  action: ContactFormAction
): ContactFormState {
  switch (action.type) {
    case "SUBMIT_START":
      return { ...state, status: "submitting" };
    case "SUBMIT_SUCCESS":
      return { ...state, status: "success" };
    case "SUBMIT_ERROR":
      return { ...state, status: "error" };
    case "RESET":
      return { status: "idle", formKey: state.formKey + 1 };
    default:
      return state;
  }
}

export function useContactFormMachine() {
  const [formspreeState, handleFormspreeSubmit, resetFormspree] = useForm(
    siteConfig.contact.formspreeId
  );

  const [state, dispatch] = useReducer(contactFormReducer, {
    status: "idle",
    formKey: 0,
  });

  // Keep machine status synced with formspree result
  const currentStatus: ContactFormStatus = formspreeState.succeeded
    ? "success"
    : formspreeState.submitting
    ? "submitting"
    : formspreeState.errors
    ? "error"
    : state.status;

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      dispatch({ type: "SUBMIT_START" });
      try {
        await handleFormspreeSubmit(e);
      } catch {
        dispatch({ type: "SUBMIT_ERROR" });
      }
    },
    [handleFormspreeSubmit]
  );

  const reset = useCallback(() => {
    resetFormspree();
    dispatch({ type: "RESET" });
  }, [resetFormspree]);

  return {
    status: currentStatus,
    isSubmitting: currentStatus === "submitting",
    isSuccess: currentStatus === "success",
    isError: currentStatus === "error",
    errors: formspreeState.errors,
    formKey: state.formKey,
    handleSubmit,
    reset,
  };
}

