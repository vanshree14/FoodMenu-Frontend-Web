import axios from "axios";
import { setToast } from "../Component/Extra/Toast";
import { baseURL, Key } from "../Component/Utils/Config";


export const apiInstance = axios.create({
  baseURL: baseURL,
});

apiInstance.defaults.headers.common["Key"] = Key;

apiInstance.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
apiInstance.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    if (!error?.response?.data?.error) {
      setToast("error", error?.response?.data?.error)
    }
    if (
      error?.response?.data?.code === "E_USER_NOT_FOUND" ||
      error?.response?.data?.code === "E_UNAUTHORIZED"
    ) {
      localStorage.clear();
      window.location.reload(false);
    }

    if (typeof error?.response?.data?.error === "string") {
      setToast("error", error.response.data.error)
    } else {
      for (let i = 0; i < error?.response?.data?.error?.length; i++) {
        setToast("error", error.response.data.error[i])
      }
      return Promise.reject(error);
    }
  }
);


export function setToken(token) {
  if (token) {
    return (apiInstance.defaults.headers.common["Authorization"] = token);
  } else {
    return delete apiInstance.defaults.headers.common["Authorization"];
  }
}

// Set Key In apiInstance
export function SetDevKey(Key) {
  if (Key) {
    return (apiInstance.defaults.headers.common["Key"] = Key);
  } else {
    return delete apiInstance.defaults.headers.common["Key"];
  }
}