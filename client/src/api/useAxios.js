import { useState, useEffect, useCallback, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "context/AuthContext";
import { useNavigate } from "react-router-dom";

export const useAxios = (method, url, param = null) => {
  const navigate = useNavigate();
  const notify = (msg, method = "error") => toast[method](msg);
  const { isSignedIn, setSignedIn } = useContext(AuthContext);
  console.log(isSignedIn);
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
        let response = await customAxios(
          method,
          url,
          {
            headers: { ...headers },
          },
          postData
        );
        setData(response.data);
      } catch (e) {
        if (e.response.status === 401) {
          setSignedIn(false);
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate("/");
        }
        notify(e.response.data.message);
        setError(e.response.data.message);
      } finally {
        setLoading(false);
      }
    },
    [method, url]
  );

  useEffect(() => {
    if (data === null && method === "get") {
      executeRequest(param);
    }
  }, [data, executeRequest, method]);

  return { data, error, loading, execute: executeRequest, queryParam };
};

//methods
const customAxios = (axiosmethod, url, headers, data) => {
  console.log("data", data);
  if (axiosmethod === "get" || axiosmethod === "delete") {
    return axios[axiosmethod](
      axiosmethod === "get" ? url + (data ? data : "") : url,
      headers
    );
  } else {
    return axios[axiosmethod](url, data, headers);
  }
};

const queryParam = (list) => {
  let query = "?";
  list.map((item, index, list) => {
    query += item.key + "=" + item.value + (list.length > 0 ? "&" : "");
  });
  return query;
};
