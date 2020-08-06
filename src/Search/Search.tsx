import React from 'react';

export class Search extends React.Component {
	constructor(props: any) {
		super(props);
		console.log(process.env.REACT_APP_TMDB_API_KEY);
	}

	render() {

		return <h2>Search</h2>;
	}
}
