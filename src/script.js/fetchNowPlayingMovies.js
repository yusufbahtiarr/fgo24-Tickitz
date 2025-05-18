const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const fetchNowPlayingMovies = async () => {
  try {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/now_playing?api_keys=${API_KEY}&language=id&page=1&region=id`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );
    const data = await res.json();
    return data.results;
  } catch (error) {
    throw new Error("Gagal mengambil data film:" + error.message);
  }
};
fetchNowPlayingMovies();

export default fetchNowPlayingMovies;
