const memoize = require('fast-memoize');

// discover all movies https://api.themoviedb.org/3/discover/movie?api_key=
// get poster: poster_path  https://image.tmdb.org/t/p/w500/kqjL17yufvn9OVLyXYpvtyrFfak.jpg

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

export function getMovies(query: string, page: number = 1) {
	const API = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=${page}`;
	return fetch(API)
		.then(res => res.json());
}

export function getMovieById(id: number) {
	const API = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&append_to_response=videos`;
	return fetch(API)
		.then(res => res.json());
}

export const getMoviesCached = memoize(getMovies);
export const getMovieByIdCached = memoize(getMovieById);
