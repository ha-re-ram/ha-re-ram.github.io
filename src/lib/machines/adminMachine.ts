"use client";

import { useReducer, useCallback, useEffect } from "react";
import { auth, db } from "@/lib/firebase";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { useRouter } from "next/navigation";
import { toast } from "@/lib/toast";

export type CmsTab = "blogs" | "projects" | "certifications";

export interface CmsItem {
  id: string;
  title?: string;
  name?: string;
  content?: string;
  category?: string;
  githubUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  issuer?: string;
  date?: string;
  order?: number;
  [key: string]: any;
}

export interface CmsFormState {
  title: string;
  content: string;
  category: string;
  githubUrl: string;
  liveUrl: string;
  imageUrl: string;
  issuer: string;
  date: string;
  editId: string | null;
}

const initialForm: CmsFormState = {
  title: "",
  content: "",
  category: "Completed",
  githubUrl: "",
  liveUrl: "",
  imageUrl: "",
  issuer: "",
  date: "",
  editId: null,
};

export interface AdminDashboardState {
  user: User | null;
  authChecked: boolean;
  tab: CmsTab;
  items: CmsItem[];
  form: CmsFormState;
  isSaving: boolean;
  isSavingOrder: boolean;
  githubRepos: any[];
  showGithub: boolean;
  isFetchingGithub: boolean;
  deleteConfirmId: string | null;
}

export type AdminDashboardAction =
  | { type: "AUTH_SUCCESS"; user: User }
  | { type: "AUTH_FAIL" }
  | { type: "SET_TAB"; tab: CmsTab }
  | { type: "SET_ITEMS"; items: CmsItem[] }
  | { type: "SET_FORM_FIELD"; field: keyof CmsFormState; value: any }
  | { type: "EDIT_ITEM"; item: CmsItem; tab: CmsTab }
  | { type: "RESET_FORM" }
  | { type: "SET_SAVING"; isSaving: boolean }
  | { type: "SET_SAVING_ORDER"; isSaving: boolean }
  | { type: "SET_GITHUB_REPOS"; repos: any[] }
  | { type: "TOGGLE_GITHUB" }
  | { type: "SET_FETCHING_GITHUB"; isFetching: boolean }
  | { type: "CONFIRM_DELETE"; id: string | null };

export function adminReducer(
  state: AdminDashboardState,
  action: AdminDashboardAction
): AdminDashboardState {
  switch (action.type) {
    case "AUTH_SUCCESS":
      return { ...state, user: action.user, authChecked: true };
    case "AUTH_FAIL":
      return { ...state, user: null, authChecked: true };
    case "SET_TAB":
      return { ...state, tab: action.tab, form: initialForm, deleteConfirmId: null };
    case "SET_ITEMS":
      return { ...state, items: action.items };
    case "SET_FORM_FIELD":
      return {
        ...state,
        form: { ...state.form, [action.field]: action.value },
      };
    case "EDIT_ITEM": {
      const item = action.item;
      return {
        ...state,
        form: {
          title: item.title || item.name || "",
          content: item.content || "",
          category: item.category || "Completed",
          githubUrl: item.githubUrl || "",
          liveUrl: item.liveUrl || "",
          imageUrl: item.imageUrl || "",
          issuer: item.issuer || "",
          date: item.date || "",
          editId: item.id,
        },
      };
    }
    case "RESET_FORM":
      return { ...state, form: initialForm };
    case "SET_SAVING":
      return { ...state, isSaving: action.isSaving };
    case "SET_SAVING_ORDER":
      return { ...state, isSavingOrder: action.isSaving };
    case "SET_GITHUB_REPOS":
      return { ...state, githubRepos: action.repos, showGithub: true, isFetchingGithub: false };
    case "TOGGLE_GITHUB":
      return { ...state, showGithub: !state.showGithub };
    case "SET_FETCHING_GITHUB":
      return { ...state, isFetchingGithub: action.isFetching };
    case "CONFIRM_DELETE":
      return { ...state, deleteConfirmId: action.id };
    default:
      return state;
  }
}

export function useAdminDashboardMachine() {
  const router = useRouter();

  const [state, dispatch] = useReducer(adminReducer, {
    user: null,
    authChecked: false,
    tab: "blogs",
    items: [],
    form: initialForm,
    isSaving: false,
    isSavingOrder: false,
    githubRepos: [],
    showGithub: false,
    isFetchingGithub: false,
    deleteConfirmId: null,
  });

  const fetchItems = useCallback(async (collectionName: string) => {
    if (!db) return;
    try {
      const querySnapshot = await getDocs(collection(db, collectionName));
      const data: CmsItem[] = [];
      querySnapshot.forEach((docSnap) => {
        data.push({ id: docSnap.id, ...(docSnap.data() as any) });
      });
      data.sort((a, b) => {
        if (a.order !== undefined && b.order !== undefined) return a.order - b.order;
        const timeB = new Date(b.date || 0).getTime();
        const timeA = new Date(a.date || 0).getTime();
        return (isNaN(timeB) ? 0 : timeB) - (isNaN(timeA) ? 0 : timeA);
      });
      dispatch({ type: "SET_ITEMS", items: data });
    } catch (error: any) {
      console.error("Error fetching data:", error);
      toast.error("Database Error: " + error.message);
    }
  }, []);

  useEffect(() => {
    if (!auth) {
      dispatch({ type: "AUTH_FAIL" });
      router.push("/admin");
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        dispatch({ type: "AUTH_FAIL" });
        router.push("/admin");
      } else {
        const isEmailPasswordUser = currentUser.providerData.some(
          (p) => p.providerId === "password"
        );
        const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;

        if (adminEmail && currentUser.email !== adminEmail) {
          signOut(auth);
          dispatch({ type: "AUTH_FAIL" });
          toast.error("Access Denied: You are not authorized as admin.");
          router.push("/admin");
        } else if (!adminEmail && !isEmailPasswordUser) {
          signOut(auth);
          dispatch({ type: "AUTH_FAIL" });
          toast.error("Access Denied: Email/password admin only.");
          router.push("/admin");
        } else {
          dispatch({ type: "AUTH_SUCCESS", user: currentUser });
          fetchItems("blogs");
        }
      }
    });

    return () => unsubscribe();
  }, [router, fetchItems]);

  const setTab = useCallback(
    (newTab: CmsTab) => {
      dispatch({ type: "SET_TAB", tab: newTab });
      fetchItems(newTab);
    },
    [fetchItems]
  );

  const setFormField = useCallback((field: keyof CmsFormState, value: any) => {
    dispatch({ type: "SET_FORM_FIELD", field, value });
  }, []);

  const resetForm = useCallback(() => {
    dispatch({ type: "RESET_FORM" });
  }, []);

  const editItem = useCallback(
    (item: CmsItem) => {
      dispatch({ type: "EDIT_ITEM", item, tab: state.tab });
    },
    [state.tab]
  );

  const handleSave = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!db) {
        toast.error("Database not initialized");
        return;
      }

      dispatch({ type: "SET_SAVING", isSaving: true });
      const { title, content, category, githubUrl, liveUrl, imageUrl, issuer, date, editId } = state.form;
      const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-");

      const dataPayload: any = {
        title,
        slug,
      };

      if (state.tab === "blogs") {
        dataPayload.content = content;
      } else if (state.tab === "projects") {
        dataPayload.content = content;
        dataPayload.category = category;
        dataPayload.githubUrl = githubUrl;
        dataPayload.liveUrl = liveUrl;
        dataPayload.imageUrl = imageUrl;
      } else if (state.tab === "certifications") {
        dataPayload.name = title;
        dataPayload.issuer = issuer;
        dataPayload.date = date;
      }

      try {
        if (editId) {
          await updateDoc(doc(db, state.tab, editId), dataPayload);
          toast.success(`${state.tab.slice(0, -1)} updated!`);
        } else {
          dataPayload.createdAt = new Date().toISOString();
          dataPayload.order = state.items.length;
          await addDoc(collection(db, state.tab), dataPayload);
          toast.success(`${state.tab.slice(0, -1)} added!`);
        }
        dispatch({ type: "RESET_FORM" });
        fetchItems(state.tab);
      } catch (error: any) {
        toast.error("Error saving document: " + error.message);
      } finally {
        dispatch({ type: "SET_SAVING", isSaving: false });
      }
    },
    [state.form, state.tab, state.items.length, fetchItems]
  );

  const confirmDelete = useCallback((id: string | null) => {
    dispatch({ type: "CONFIRM_DELETE", id });
  }, []);

  const handleDelete = useCallback(
    async (id: string) => {
      if (!db) {
        toast.error("Database not initialized");
        return;
      }
      try {
        await deleteDoc(doc(db, state.tab, id));
        toast.success("Item deleted");
        fetchItems(state.tab);
      } catch (error: any) {
        toast.error("Error deleting document: " + error.message);
      } finally {
        dispatch({ type: "CONFIRM_DELETE", id: null });
      }
    },
    [state.tab, fetchItems]
  );

  const handleReorder = useCallback((newOrder: CmsItem[]) => {
    dispatch({ type: "SET_ITEMS", items: newOrder });
  }, []);

  const saveReorder = useCallback(async () => {
    if (!db) return;
    dispatch({ type: "SET_SAVING_ORDER", isSaving: true });
    try {
      const promises = state.items.map((item, index) => {
        if (item.order !== index) {
          return updateDoc(doc(db, state.tab, item.id), { order: index });
        }
        return Promise.resolve();
      });
      await Promise.all(promises);
      fetchItems(state.tab);
      toast.success("New order saved!");
    } catch {
      toast.error("Error saving the new order.");
    } finally {
      dispatch({ type: "SET_SAVING_ORDER", isSaving: false });
    }
  }, [state.items, state.tab, fetchItems]);

  const fetchGithubRepos = useCallback(async () => {
    if (state.githubRepos.length > 0) {
      dispatch({ type: "TOGGLE_GITHUB" });
      return;
    }
    dispatch({ type: "SET_FETCHING_GITHUB", isFetching: true });
    try {
      const res = await fetch(
        "https://api.github.com/users/ha-re-ram/repos?sort=updated&per_page=100"
      );
      const repos = await res.json();
      if (Array.isArray(repos)) {
        dispatch({ type: "SET_GITHUB_REPOS", repos });
      } else {
        toast.error("Could not fetch repositories from GitHub.");
        dispatch({ type: "SET_FETCHING_GITHUB", isFetching: false });
      }
    } catch {
      toast.error("Network error fetching GitHub repositories.");
      dispatch({ type: "SET_FETCHING_GITHUB", isFetching: false });
    }
  }, [state.githubRepos.length]);

  const importFromGithub = useCallback((repo: any) => {
    dispatch({
      type: "SET_FORM_FIELD",
      field: "title",
      value: repo.name.replace(/-/g, " "),
    });
    dispatch({
      type: "SET_FORM_FIELD",
      field: "content",
      value: repo.description || "",
    });
    dispatch({
      type: "SET_FORM_FIELD",
      field: "githubUrl",
      value: repo.html_url,
    });
    dispatch({
      type: "SET_FORM_FIELD",
      field: "category",
      value: "Pending",
    });
    dispatch({ type: "TOGGLE_GITHUB" });
    toast.info(`Imported "${repo.name}" from GitHub!`);
  }, []);

  const handleLogout = useCallback(async () => {
    if (auth) {
      await signOut(auth);
    }
    router.push("/admin");
  }, [router]);

  return {
    user: state.user,
    authChecked: state.authChecked,
    tab: state.tab,
    items: state.items,
    form: state.form,
    isSaving: state.isSaving,
    isSavingOrder: state.isSavingOrder,
    githubRepos: state.githubRepos,
    showGithub: state.showGithub,
    isFetchingGithub: state.isFetchingGithub,
    deleteConfirmId: state.deleteConfirmId,
    setTab,
    setFormField,
    resetForm,
    editItem,
    handleSave,
    confirmDelete,
    handleDelete,
    handleReorder,
    saveReorder,
    fetchGithubRepos,
    importFromGithub,
    handleLogout,
  };
}

