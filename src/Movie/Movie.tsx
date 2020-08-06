import React from 'react';
import { useParams } from 'react-router-dom';

export class Movie extends React.Component {
	render() {
		const {movieId} = useParams();

		return <h2>This is a page for movie with ID: {movieId} </h2>;
	}
}
