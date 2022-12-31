import { useCallback, useState } from "react";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(async (requestConfig, applyData) => {
    try {
      setIsLoading(true);

      const response = await fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : "GET",
        headers: requestConfig.headers ? requestConfig.headers : {},
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
      });

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();

      // invoke function conditionally
      applyData?.(data); // it depends on how you want to transform the data

      setTimeout(() => {
        setSuccess(true);
        setIsLoading(false);
      }, 500);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    error,
    success,
    sendRequest,
  };
};

export default useHttp;
