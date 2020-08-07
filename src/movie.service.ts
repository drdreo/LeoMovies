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
