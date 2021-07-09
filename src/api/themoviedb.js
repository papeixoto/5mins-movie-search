const API_KEY = '00491f1995e3846ee8285a1e166e0785';
const API_URL = 'https://api.themoviedb.org/3';

/**
 * Searches the movies based on a text query
 * URI encoded
 */
export const searchMovies = async query => {
  const response = await fetch(
    encodeURI(`${API_URL}/search/movie?query=${query}&api_key=${API_KEY}`),
  );
  const json = await response.json();
  // when there are no movies the API returns no results
  return json?.results || [];
};

/**
 * Fetches a specific movie using its id
 */
export const getMovieById = async id => {
  const response = await fetch(`${API_URL}/movie/${id}?api_key=${API_KEY}`);
  const json = await response.json();
  return json;
};
