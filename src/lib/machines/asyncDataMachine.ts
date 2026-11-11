"use client";

import { useReducer, useCallback, useEffect, useTransition } from "react";

export type DataStatus = "idle" | "loading" | "success" | "empty" | "error";

export interface AsyncDataState<T> {
  status: DataStatus;
  items: T[];
  filteredItems: T[];
  searchQuery: string;
  activeFilter: string;
  error: string | null;
}

export type AsyncDataAction<T> =
  | { type: "FETCH_START" }
  | { type: "FETCH_SUCCESS"; payload: T[] }
  | { type: "FETCH_ERROR"; payload: string }
  | { type: "SET_SEARCH"; payload: string }
  | { type: "SET_FILTER"; payload: string }
  | { type: "RESET_FILTERS" };

export interface FilterFn<T> {
  (item: T, searchQuery: string, activeFilter: string): boolean;
}

export function createAsyncDataReducer<T>(filterFn: FilterFn<T>) {
  return function asyncDataReducer(
    state: AsyncDataState<T>,
    action: AsyncDataAction<T>
  ): AsyncDataState<T> {
    switch (action.type) {
      case "FETCH_START":
        return {
          ...state,
          status: "loading",
          error: null,
        };
      case "FETCH_SUCCESS": {
        const items = action.payload;
        const filtered = items.filter((item) =>
          filterFn(item, state.searchQuery, state.activeFilter)
        );
        return {
          ...state,
          status: items.length === 0 ? "empty" : "success",
          items,
          filteredItems: filtered,
          error: null,
        };
      }
      case "FETCH_ERROR":
        return {
          ...state,
          status: "error",
          error: action.payload,
        };
      case "SET_SEARCH": {
        const query = action.payload;
        const filtered = state.items.filter((item) =>
          filterFn(item, query, state.activeFilter)
        );
        return {
          ...state,
          searchQuery: query,
          filteredItems: filtered,
        };
      }
      case "SET_FILTER": {
        const filter = action.payload;
        const filtered = state.items.filter((item) =>
          filterFn(item, state.searchQuery, filter)
        );
        return {
          ...state,
          activeFilter: filter,
          filteredItems: filtered,
        };
      }
      case "RESET_FILTERS": {
        const filtered = state.items.filter((item) =>
          filterFn(item, "", "All")
        );
        return {
          ...state,
          searchQuery: "",
          activeFilter: "All",
          filteredItems: filtered,
        };
      }
      default:
        return state;
    }
  };
}

export interface UseAsyncDataOptions<T> {
  fetcher: () => Promise<T[]>;
  filterFn: FilterFn<T>;
  initialFilter?: string;
}

export function useAsyncDataMachine<T>({
  fetcher,
  filterFn,
  initialFilter = "All",
}: UseAsyncDataOptions<T>) {
  const [, startTransition] = useTransition();

  const [state, dispatch] = useReducer(
    createAsyncDataReducer(filterFn),
    {
      status: "loading",
      items: [],
      filteredItems: [],
      searchQuery: "",
      activeFilter: initialFilter,
      error: null,
    }
  );

  const executeFetch = useCallback(async () => {
    dispatch({ type: "FETCH_START" });
    try {
      const data = await fetcher();
      dispatch({ type: "FETCH_SUCCESS", payload: data });
    } catch (err: any) {
      dispatch({
        type: "FETCH_ERROR",
        payload: err?.message || "Failed to load data. Please try again.",
      });
    }
  }, [fetcher]);

  useEffect(() => {
    executeFetch();
  }, [executeFetch]);

  const setSearchQuery = useCallback((query: string) => {
    startTransition(() => {
      dispatch({ type: "SET_SEARCH", payload: query });
    });
  }, []);

  const setActiveFilter = useCallback((filter: string) => {
    startTransition(() => {
      dispatch({ type: "SET_FILTER", payload: filter });
    });
  }, []);

  const resetFilters = useCallback(() => {
    dispatch({ type: "RESET_FILTERS" });
  }, []);

  return {
    status: state.status,
    items: state.items,
    filteredItems: state.filteredItems,
    searchQuery: state.searchQuery,
    activeFilter: state.activeFilter,
    error: state.error,
    isLoading: state.status === "loading",
    isError: state.status === "error",
    isEmpty: state.status === "empty",
    isFilteredEmpty: state.status === "success" && state.filteredItems.length === 0,
    setSearchQuery,
    setActiveFilter,
    resetFilters,
    retry: executeFetch,
  };
}

