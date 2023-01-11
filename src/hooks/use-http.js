import { useCallback, useReducer } from "react";

const initialHttpState = {
  isLoading: false,
  success: false,
  error: false,
};

const httpReducer = (state, action) => {
  switch (action.type) {
    case "REQUEST_START":
      return {
        ...state,
        isLoading: true,
      };
    case "REQUEST_SUCCESS":
      return {
        ...state,
        success: true,
        isLoading: false,
      };
    case "REQUEST_ERROR":
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    default:
      return state;
  }
};

const useHttp = () => {
  const [http, dispatchHttp] = useReducer(httpReducer, initialHttpState);

  const sendRequest = useCallback(async (requestConfig, applyData) => {
    try {
      dispatchHttp({ type: "REQUEST_START" });

      const response = await fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : "GET",
        headers: requestConfig.headers ? requestConfig.headers : {},
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
      });

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();

      // optional chaining - invoke function conditionally
      applyData?.(data); // it depends on how you want to transform the data

      setTimeout(() => {
        dispatchHttp({ type: "REQUEST_SUCCESS" });
      }, 500);
    } catch (error) {
      dispatchHttp({ type: "REQUEST_ERROR", payload: error.message });
    }
  }, []);

  return {
    isLoading: http.isLoading,
    error: http.error,
    success: http.success,
    sendRequest,
  };
};

export default useHttp;
