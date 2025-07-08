import { useState } from "react";

export const useMutation = (key: string, callback?: () => void) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<number | null>(null);

  const mutate = async () => {
    setIsLoading(true);
    const res = await fetch(key, { method: "POST" });

    if (res.status < 200 || res.status >= 300) {
      setError(res.status);
      setIsLoading(false);
      return;
    }

    setIsLoading(false);
    callback?.();
  };

  return { mutate, isLoading, error };
};
