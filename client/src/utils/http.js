import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.DEV ? "http://localhost:4000/" : "",
  timeout: 1000,
  withCredentials: true,
});

export const http = {
  get: async function (url, config) {
    return instance.get(url, config);
  },
  post: function (url, data, config) {
    return instance.post(url, data, config);
  },
  delete: function () {
    return instance.delete(url, config);
  },
};
