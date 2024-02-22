import { useEffect, useState } from "react";

export function useFetch(fetchFn, initialValue) {
  const [isFetching, setIsFetching] = useState();
  const [error, setError] = useState();
  const [fetchData, setFetchData] = useState(initialValue);
  useEffect(() => {
    async function fetchPlaces() {
      setIsFetching(true);
      try {
        const data = await fetchFn();
        setFetchData(data);
      } catch (error) {
        setError({
          message: error.message || "Failed to load user's liked places",
        });
      }
      setIsFetching(false);
    }
    fetchPlaces();
  }, [fetchFn]);

  return {
    isFetching,
    fetchData,
    error,
    setFetchData,
  };
}
