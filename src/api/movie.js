import { request } from "../lib/http";
import { API_KEY } from "../constants/movie";

let movieApiController = null;

export async function getMovie({ query }) {
  // cancel last request
  movieApiController && movieApiController.abort();

  if (!query) {
    return [];
  }

  movieApiController = new AbortController();

  try {
    return await request.get(`/?apikey=${API_KEY}&s=${query}`, {
      signal: movieApiController.signal,
    });
  } catch (error) {
    console.log(error.message);
    return [];
  }
}
