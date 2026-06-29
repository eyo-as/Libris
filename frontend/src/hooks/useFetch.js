import { useState, useEffect, useCallback } from "react";

export const useFetch = (fetchFunction) => {
  const [state, setState] = useState({
    data: [],
    loading: true,
    error: null,
  });

  const executeFetch = useCallback(async () => {
    try {
      const result = await fetchFunction();
      setState({ data: result, loading: false, error: null });
    } catch (err) {
      setState({ data: [], loading: false, error: err });
    }
  }, [fetchFunction]);

  useEffect(() => {
    let isMounted = true; // Prevents state updates if the component unmounts mid-request

    const initializeFetch = async () => {
      try {
        const result = await fetchFunction();
        // ONLY set state if the component is still actively visible on screen
        if (isMounted) {
          setState({ data: result, loading: false, error: null });
        }
      } catch (err) {
        if (isMounted) {
          setState({ data: [], loading: false, error: err });
        }
      }
    };

    initializeFetch();

    // Cleanup function: React executes this to safely shut down background tasks
    return () => {
      isMounted = false;
    };
  }, [fetchFunction]); // Runs automatically whenever the fetch target changes

  //  Manual override switch for Refresh/Delete operations
  const refetch = useCallback(() => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    executeFetch();
  }, [executeFetch]);

  //  Manual state adjuster for instant frontend updates
  const setData = useCallback((newData) => {
    setState((prev) => ({ ...prev, data: newData }));
  }, []);

  return {
    data: state.data,
    setData,
    loading: state.loading,
    error: state.error,
    refetch,
  };
};
