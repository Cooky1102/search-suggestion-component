import axios from "axios";

const request = axios.create({
  baseURL: "https://www.omdbapi.com/",
  timeout: 10000,
});

request.interceptors.response.use(
  function (response) {
    if (response.status !== 200 || response.data?.Response !== "True") {
      return Promise.reject({ message: response.data?.Error });
    }

    return response.data?.Search;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export { request };
