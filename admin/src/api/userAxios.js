import { useState, useEffect, useCallback, useContext } from "react";
import axios from "axios";
import { AuthContext } from "context/AuthContext";

export const useAxios = (method, url) => {
  const { isSignedIn } = useContext(AuthContext);

  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(method === "get" ? true : false);
  let headers = isSignedIn
    ? { Authorization: "Bearer " + localStorage.getItem("token") }
    : {};


  const executeRequest = useCallback(
    async (postData = null) => {
      if (method !== "get") {
        setLoading(true);
      }
      try {
        let response = await customAxios(method,
          url,
          {
            headers: { ...headers },
          },
          postData
        );
        setData(response.data);
      } catch (e) {
        setError(e.response.data.message);
      } finally {
        setLoading(false);
      }
    },
    [method, url]
  );

  useEffect(() => {
    if (data === null && method === "get") {
      executeRequest();
    }
  }, [data, executeRequest, method]);

  const queryParam = (list) => {
    let query = "?";
    list.map((item, index, list) => {
      query += item.key + "=" + item.value + (list.length > 0 ? "&" : "");
    });
    return query;
  };

  const customAxios = (axiosmethod, url, headers, data) => {
    console.log("data", data);
    if (axiosmethod === "get" || axiosmethod === "delete") {
      return axios[axiosmethod](axiosmethod === "get" ? url + (data ? data : "") : url, headers);
    } else {
      return axios[axiosmethod](url, data, headers);
    }
  }

  return { data, error, loading, execute: executeRequest, queryParam };
};
