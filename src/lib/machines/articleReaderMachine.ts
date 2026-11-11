"use client";

import { useReducer, useEffect, useCallback, useState } from "react";
import { db } from "@/lib/firebase";
import { doc, getDoc, collection, query, orderBy, getDocs } from "firebase/firestore";

export interface ArticleData {
  id: string;
  title: string;
  content: string;
  date: string;
  category?: string;
  [key: string]: any;
}

export interface TocItem {
  id: string;
  text: string;
}

export interface AdjacentArticles {
  prev: { id: string; title: string } | null;
  next: { id: string; title: string } | null;
}

export type ArticleStatus = "loading" | "success" | "not_found" | "error";

export interface ArticleState {
  status: ArticleStatus;
  article: ArticleData | null;
  toc: TocItem[];
  adjacent: AdjacentArticles;
  errorMessage: string | null;
}

export type ArticleAction =
  | { type: "FETCH_START" }
  | {
      type: "FETCH_SUCCESS";
      payload: {
        article: ArticleData;
        toc: TocItem[];
        adjacent: AdjacentArticles;
      };
    }
  | { type: "NOT_FOUND" }
  | { type: "FETCH_ERROR"; payload: string };

export function articleReducer(
  state: ArticleState,
  action: ArticleAction
): ArticleState {
  switch (action.type) {
    case "FETCH_START":
      return {
        ...state,
        status: "loading",
        errorMessage: null,
      };
    case "FETCH_SUCCESS":
      return {
        status: "success",
        article: action.payload.article,
        toc: action.payload.toc,
        adjacent: action.payload.adjacent,
        errorMessage: null,
      };
    case "NOT_FOUND":
      return {
        ...state,
        status: "not_found",
        article: null,
      };
    case "FETCH_ERROR":
      return {
        ...state,
        status: "error",
        errorMessage: action.payload,
      };
    default:
      return state;
  }
}

export function useArticleReaderMachine(id: string, type: string) {
  const [state, dispatch] = useReducer(articleReducer, {
    status: "loading",
    article: null,
    toc: [],
    adjacent: { prev: null, next: null },
    errorMessage: null,
  });

  const [activeSectionId, setActiveSectionId] = useState<string>("");

  const fetchArticleAndAdjacent = useCallback(async () => {
    if (!id || !db) {
      dispatch({ type: "NOT_FOUND" });
      return;
    }

    dispatch({ type: "FETCH_START" });

    try {
      const docRef = doc(db, type, id);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        dispatch({ type: "NOT_FOUND" });
        return;
      }

      const data = docSnap.data();
      const currentArticle: ArticleData = {
        id: docSnap.id,
        title: data.title || "Untitled",
        content: data.content || "",
        date: data.date || new Date().toISOString(),
        ...data,
      };

      // Extract TOC from content (## headings)
      const content = currentArticle.content;
      const headings = content.match(/^##\s+(.+)$/gm);
      const tocItems: TocItem[] = [];
      if (headings) {
        headings.forEach((h: string) => {
          const text = h.replace(/^##\s+/, "");
          const headingId = text
            .toLowerCase()
            .replace(/[^\w\s-]/g, "")
            .replace(/\s+/g, "-");
          tocItems.push({ id: headingId, text });
        });
      }

      // Fetch adjacent articles
      const q = query(collection(db, type), orderBy("date", "desc"));
      const querySnapshot = await getDocs(q);
      const articles: { id: string; title: string }[] = [];
      querySnapshot.forEach((d) => {
        articles.push({ id: d.id, title: d.data().title });
      });

      const currentIndex = articles.findIndex((a) => a.id === id);
      const adjacent: AdjacentArticles = {
        next: currentIndex > 0 ? articles[currentIndex - 1] : null,
        prev: currentIndex < articles.length - 1 ? articles[currentIndex + 1] : null,
      };

      dispatch({
        type: "FETCH_SUCCESS",
        payload: {
          article: currentArticle,
          toc: tocItems,
          adjacent,
        },
      });

      if (tocItems.length > 0) {
        setActiveSectionId(tocItems[0].id);
      }
    } catch (err: any) {
      dispatch({
        type: "FETCH_ERROR",
        payload: err?.message || "Failed to load article.",
      });
    }
  }, [id, type]);

  useEffect(() => {
    fetchArticleAndAdjacent();
  }, [fetchArticleAndAdjacent]);

  // Scroll spy for headings
  useEffect(() => {
    if (state.toc.length === 0) return;

    const handleScroll = () => {
      const headingElements = state.toc
        .map((item) => document.getElementById(item.id))
        .filter((el): el is HTMLElement => el !== null);

      const scrollPosition = window.scrollY + 200;

      for (let i = headingElements.length - 1; i >= 0; i--) {
        const el = headingElements[i];
        if (el.offsetTop <= scrollPosition) {
          setActiveSectionId(el.id);
          return;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [state.toc]);

  return {
    status: state.status,
    article: state.article,
    toc: state.toc,
    adjacent: state.adjacent,
    activeSectionId,
    errorMessage: state.errorMessage,
    isLoading: state.status === "loading",
    isNotFound: state.status === "not_found",
    isError: state.status === "error",
    retry: fetchArticleAndAdjacent,
  };
}

