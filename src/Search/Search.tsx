import React from 'react';
// discover all movies https://api.themoviedb.org/3/discover/movie?api_key=
// get poster image https://image.tmdb.org/t/p/w500/wO5QSWZPBT71gMLvrRex0bVc0V9.jpg
export class Search extends React.Component {
	constructor(props: any) {
		super(props);
		console.log(process.env.REACT_APP_TMDB_API_KEY);
	}

	render() {

		return <h2>Search</h2>;
	}
}
