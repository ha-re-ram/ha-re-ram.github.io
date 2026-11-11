"use client";

import { useReducer, useCallback, useEffect } from "react";
import { db, auth } from "@/lib/firebase";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import {
  onAuthStateChanged,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  GoogleAuthProvider,
  User,
} from "firebase/auth";
import { toast } from "@/lib/toast";

export interface CommentItem {
  id: string;
  itemId: string;
  content: string;
  authorParams: {
    name?: string | null;
    photo?: string | null;
  };
  date: string;
}

export type AuthStatus = "checking" | "unauthenticated" | "authenticating" | "authenticated";
export type FeedStatus = "loading" | "ready" | "error";
export type SubmitStatus = "idle" | "submitting" | "success" | "error";

export interface CommentsState {
  authStatus: AuthStatus;
  feedStatus: FeedStatus;
  submitStatus: SubmitStatus;
  user: User | null;
  comments: CommentItem[];
  commentText: string;
  errorMessage: string | null;
}

export type CommentsAction =
  | { type: "AUTH_CHECKED"; user: User | null }
  | { type: "AUTH_START" }
  | { type: "AUTH_ERROR"; error: string }
  | { type: "FEED_LOADING" }
  | { type: "FEED_SUCCESS"; comments: CommentItem[] }
  | { type: "FEED_ERROR"; error: string }
  | { type: "SET_TEXT"; text: string }
  | { type: "SUBMIT_START" }
  | { type: "SUBMIT_SUCCESS"; newComment: CommentItem }
  | { type: "SUBMIT_ERROR"; error: string };

export function commentsReducer(
  state: CommentsState,
  action: CommentsAction
): CommentsState {
  switch (action.type) {
    case "AUTH_CHECKED":
      return {
        ...state,
        authStatus: action.user ? "authenticated" : "unauthenticated",
        user: action.user,
      };
    case "AUTH_START":
      return {
        ...state,
        authStatus: "authenticating",
      };
    case "AUTH_ERROR":
      return {
        ...state,
        authStatus: "unauthenticated",
        errorMessage: action.error,
      };
    case "FEED_LOADING":
      return {
        ...state,
        feedStatus: "loading",
      };
    case "FEED_SUCCESS":
      return {
        ...state,
        feedStatus: "ready",
        comments: action.comments,
      };
    case "FEED_ERROR":
      return {
        ...state,
        feedStatus: "error",
        errorMessage: action.error,
      };
    case "SET_TEXT":
      return {
        ...state,
        commentText: action.text,
      };
    case "SUBMIT_START":
      return {
        ...state,
        submitStatus: "submitting",
      };
    case "SUBMIT_SUCCESS":
      return {
        ...state,
        submitStatus: "success",
        commentText: "",
        comments: [...state.comments, action.newComment],
      };
    case "SUBMIT_ERROR":
      return {
        ...state,
        submitStatus: "error",
        errorMessage: action.error,
      };
    default:
      return state;
  }
}

export function useCommentsMachine(itemId: string) {
  const [state, dispatch] = useReducer(commentsReducer, {
    authStatus: "checking",
    feedStatus: "loading",
    submitStatus: "idle",
    user: null,
    comments: [],
    commentText: "",
    errorMessage: null,
  });

  const fetchComments = useCallback(async () => {
    if (!itemId || !db) {
      dispatch({ type: "FEED_SUCCESS", comments: [] });
      return;
    }
    dispatch({ type: "FEED_LOADING" });
    try {
      const q = query(collection(db, "comments"), where("itemId", "==", itemId));
      const querySnapshot = await getDocs(q);
      const data: CommentItem[] = [];
      querySnapshot.forEach((docSnap) => {
        data.push({ id: docSnap.id, ...(docSnap.data() as any) });
      });
      data.sort(
        (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
      );
      dispatch({ type: "FEED_SUCCESS", comments: data });
    } catch (err: any) {
      dispatch({
        type: "FEED_ERROR",
        error: err.message || "Could not load comments.",
      });
    }
  }, [itemId]);

  useEffect(() => {
    if (!auth) {
      fetchComments();
      return;
    }

    getRedirectResult(auth).catch((error) => {
      console.error("Redirect auth error:", error);
    });

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      dispatch({ type: "AUTH_CHECKED", user: currentUser });
    });

    fetchComments();
    return () => unsubscribe();
  }, [fetchComments]);

  const loginWithGoogle = useCallback(async () => {
    if (!auth) {
      toast.error("Firebase Auth not initialized. Check your environment variables.");
      return;
    }

    dispatch({ type: "AUTH_START" });
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });

    try {
      await signInWithPopup(auth, provider);
    } catch (error: any) {
      if (
        error.code === "auth/popup-closed-by-user" ||
        error.code === "auth/cancelled-popup-request"
      ) {
        dispatch({ type: "AUTH_CHECKED", user: auth.currentUser });
        return;
      }

      console.error("Firebase Login Detailed Error:", error);

      if (error.code === "auth/popup-blocked") {
        signInWithRedirect(auth, provider);
      } else if (error.code === "auth/unauthorized-domain") {
        toast.error("Domain not authorized for Google Sign-In in Firebase console.");
      } else if (error.code === "auth/configuration-not-found" || error.message?.includes("configuration")) {
        toast.error("Google Sign-In is not enabled in Firebase Authentication console.");
      } else {
        toast.error(error.message || "Failed to log in with Google.");
      }
      dispatch({ type: "AUTH_ERROR", error: error.message });
    }
  }, []);

  const addComment = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!state.user) {
        toast.info("Please login to post a comment.");
        return;
      }
      const trimmed = state.commentText.trim();
      if (!trimmed) return;
      if (!db) {
        toast.error("Database not initialized.");
        return;
      }

      dispatch({ type: "SUBMIT_START" });

      const newCommentPayload: Omit<CommentItem, "id"> = {
        itemId,
        content: trimmed,
        authorParams: {
          name: state.user.displayName || state.user.email,
          photo: state.user.photoURL,
        },
        date: new Date().toISOString(),
      };

      try {
        const docRef = await addDoc(
          collection(db, "comments"),
          newCommentPayload
        );
        dispatch({
          type: "SUBMIT_SUCCESS",
          newComment: { id: docRef.id, ...newCommentPayload },
        });
        toast.success("Comment posted!");
      } catch (err: any) {
        dispatch({
          type: "SUBMIT_ERROR",
          error: err.message || "Failed to post comment.",
        });
        toast.error("Error adding comment: " + err.message);
      }
    },
    [state.user, state.commentText, itemId]
  );

  return {
    authStatus: state.authStatus,
    feedStatus: state.feedStatus,
    submitStatus: state.submitStatus,
    user: state.user,
    comments: state.comments,
    commentText: state.commentText,
    isSubmitting: state.submitStatus === "submitting",
    setCommentText: (text: string) => dispatch({ type: "SET_TEXT", text }),
    loginWithGoogle,
    addComment,
    refetchComments: fetchComments,
  };
}

