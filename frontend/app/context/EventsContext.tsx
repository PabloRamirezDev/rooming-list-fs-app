"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { ApiEvent } from "../types/api-event";
import useSWR from "swr";
import { fetcher } from "../lib/fetcher";
import { SortType } from "../types/sort";
import { FilterType } from "../types/filter";
import { defaultFilters } from "../lib/default-filters";

type EventsContextType = {
  events?: ApiEvent[];
  error: unknown;
  isLoading: boolean;
  revalidate: () => void;
  refresh: () => void;
  filters: FilterType[];
  updateFilter: (filterId: string, optionId: string, value: boolean) => void;
  search: string;
  updateSearch: (search: string) => void;
  sort: SortType | null;
  updateSort: (key?: string, direction?: "asc" | "desc") => void;
};

const EventsContext = createContext<EventsContextType | null>(null);

export const useEvents = () => {
  const context = useContext(EventsContext);

  if (context === null) {
    throw new Error("useEvents must be used within an EventsProvider");
  }

  return context;
};

interface Props {
  children?: ReactNode;
}

export const EventsProvider = (props: Props) => {
  const { children } = props;

  const [filters, setFilters] = useState(defaultFilters);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortType | null>(null);

  const updateFilter = useCallback(
    (filterId: string, optionId: string, value: boolean) => {
      setFilters((prev) => {
        const filterIndex = prev.findIndex((filter) => filter.id === filterId);

        const optionIndex = prev[filterIndex].options.findIndex(
          (option) => option.id === optionId
        );

        const newOption = {
          ...prev[filterIndex].options[optionIndex],
          checked: value,
        };

        const newFilter = {
          ...prev[filterIndex],
          options: [
            ...prev[filterIndex].options.slice(0, optionIndex),
            newOption,
            ...prev[filterIndex].options.slice(optionIndex + 1),
          ],
        };

        return [
          ...prev.slice(0, filterIndex),
          newFilter,
          ...prev.slice(filterIndex + 1),
        ];
      });
    },
    [setFilters]
  );

  const updateSearch = useCallback(
    (newSearch: string) => {
      setSearch(newSearch);
    },
    [setSearch]
  );

  const updateSort = useCallback(
    (sortKey?: string, sortDirection?: "asc" | "desc") => {
      if (!sortKey || !sortDirection) {
        setSort(null);
        return;
      }

      setSort({
        key: sortKey,
        direction: sortDirection,
      });
    },
    [setSort]
  );

  const [key, setKey] = useState("/api/events");

  const { data, error, isLoading, mutate } = useSWR<{ events: ApiEvent[] }>(
    key,
    fetcher
  );

  const revalidate = useCallback(() => {
    let newKey = "/api/events?";

    const activeFilters = filters.filter((filter) =>
      filter.options.some((option) => option.checked)
    );

    if (activeFilters.length > 0) {
      activeFilters.forEach((filter) => {
        const checkedOptions = filter.options.filter(
          (option) => option.checked
        );

        newKey +=
          filter.id +
          "=" +
          checkedOptions.map((option) => option.id).join(",") +
          "&";
      });
    }

    if (search) {
      newKey += "q=" + encodeURIComponent(search) + "&";
    }

    if (sort) {
      newKey += "sort-key=" + sort.key + "&sort-dir=" + sort.direction;
    }

    newKey.replace(/(&|\?)$/, "");

    setKey(newKey);
  }, [filters, search, sort]);

  const refresh = () => {
    mutate();
  };

  const searchDebounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isLoading) return;

    if (searchDebounceTimerRef.current) {
      clearTimeout(searchDebounceTimerRef.current);
    }

    searchDebounceTimerRef.current = setTimeout(revalidate, 500);

    return () => {
      if (searchDebounceTimerRef.current) {
        clearTimeout(searchDebounceTimerRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  const { events } = data || {};

  return (
    <EventsContext.Provider
      value={{
        events,
        error,
        isLoading,
        revalidate,
        refresh,
        filters,
        updateFilter,
        search,
        updateSearch,
        sort,
        updateSort,
      }}
    >
      {children}
    </EventsContext.Provider>
  );
};
