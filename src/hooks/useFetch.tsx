import { useEffect, useState } from "react";
import apiClient from "../api/apiClient";

export interface UseAxios {
  url: string;
  method: "get" | "post" | "put";
  body?: any;
  headers?: any;
}

const useFetch = ({ url, method, body = null, headers = null }: UseAxios) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    apiClient[method](url, JSON.parse(headers), JSON.parse(body))
      .then((res) => {
        setResponse(res.data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, [method, url, body, headers]);

  return { response, error, loading };
};

export default useFetch;
