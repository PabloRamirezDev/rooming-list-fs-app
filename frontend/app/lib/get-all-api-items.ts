import { api } from "./api";

export const getAllApiItems = async <T>(pathname: string) => {
  const data = [] as T[];

  let page = 1;
  let hasFinished = false;

  do {
    const res = await api.get<{ items: T[]; next: string | null }>(pathname, {
      params: { page },
    });

    data.push(...res.data?.items);

    page++;
    hasFinished = res.data?.items?.length === 0 || res.data?.next === null;
  } while (!hasFinished);

  return data;
};
