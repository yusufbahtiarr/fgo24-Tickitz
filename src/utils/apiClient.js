import axios from "axios";

// Base URL untuk TMDB API (v4 sama-sama menggunakan base URL v3)
const BASE_URL = "https://api.themoviedb.org/3";

// Ambil Bearer Token dari environment variable
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

// Validasi Bearer Token
if (!API_KEY) {
  console.error(
    "TMDB Bearer Token is missing. Please set VITE_TMDB_BEARER_TOKEN in .env"
  );
}

// Buat instance Axios
const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
});

// Definisikan requests
const requests = {
  fetchMovie: `/movie/?language=id-ID`,
  fetchNowPlaying: `/movie/now_playing?language=id-ID`,
  fetchMovieGenres: `/genre/movie/list?language=id`,
  fetchUpcomingMovies: `/movie/upcoming?language=id-ID`,
  fetchTrending: `/trending/all/week?language=id-ID`,
  fetchTopRated: `/movie/top_rated?language=id-ID`,
};

// Fungsi untuk melakukan request
export const fetchData = {
  getMovies: () => apiClient.get(requests.fetchNowPlaying),
  getNowPlaying: () => apiClient.get(requests.fetchNowPlaying),
  getMovieGenres: () => apiClient.get(requests.fetchMovieGenres),
  getUpcomingMovies: () => apiClient.get(requests.fetchUpcomingMovies),
  getTrending: () => apiClient.get(requests.fetchTrending),
  getTopRated: () => apiClient.get(requests.fetchTopRated),

  getMovieById: (id) =>
    apiClient.get(`/movie/${id}?append_to_response=credits`),
};

// Interceptor untuk menangani error
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("TMDB API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default apiClient;
