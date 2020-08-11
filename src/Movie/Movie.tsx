import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';
import { Container, Typography } from '@material-ui/core';

import { getMovieByIdCached } from '../movie.service';
import './Movie.scss';


type TParams = { movieId: string };

interface IProps extends RouteComponentProps<TParams> {
}

interface IState {
	movie?: any;
	isLoading: boolean;
	error: string;
}

class Movie extends Component<IProps, IState> {

	state = {
		movie: undefined,
		isLoading: false,
		error: '',
	};

	componentDidMount() {
		const movieId = Number(this.props.match.params.movieId);
		if (!isNaN(movieId)) {
			this.fetchMovie(movieId);
		} else {
			console.error(`No valid ID provided. Can't fetch movie.`);
		}
	}

	fetchMovie(id: number) {
		this.setState({isLoading: true});
		getMovieByIdCached(id)
			.then((res: any) => {
					this.setState({
						isLoading: false,
						movie: res,
					});
				}, (error: Error) => {
					this.setState({
						isLoading: false,
						error: error.message,
					});
				},
			);
	}

	render() {
		const {movie} = this.state;

		return (
			<React.Fragment>
				<MovieDetails movie={movie}/>
			</React.Fragment>
		);
	}
}

function MovieDetails(props: any) {
	const movie = props.movie;
	if (!movie) {
		return <></>;
	}

	const videoKey = movie.videos.results[0]?.key;
	const genres = movie.genres.reduce((prev: string, cur: any) => {
		if (prev.length > 0) {
			return prev + ', ' + cur.name;
		}
		return cur.name;
	}, '');

	const backgroundFilter = movie.backdrop_path ? {backgroundImage: `url(https://image.tmdb.org/t/p/w1920_and_h800_multi_faces${movie.backdrop_path})`} : undefined;

	return (
		<div className="movie-container">
			<div className="movie-details"
				 style={backgroundFilter}>
				<div className="movie-details__wrapper">
					<Typography variant="h5">{movie.title}</Typography>
					<Typography variant="caption">{movie.release_date} | {genres} | {movie.runtime}min</Typography>

					<div className="movie-details__group">
						{movie.poster_path &&
                        <img className="movie-details__poster" src={'https://image.tmdb.org/t/p/w185/' + movie.poster_path}
                             alt="Movie poster"/>
						}
						<div className="movie-details__overview">
							<Typography variant="body2">{movie.overview}</Typography>
						</div>
					</div>
				</div>
			</div>

			{videoKey &&
            <div className="video-section">
                <Container maxWidth="md">
                    <Typography variant="h5" component="h5">Trailer</Typography>
                    <div className='embed-container'>
                        <iframe title="Trailer" src={'https://www.youtube.com/embed/' + videoKey} frameBorder="0"
                                allow="accelerometer;  encrypted-media; " allowFullScreen></iframe>
                    </div>
                </Container>
            </div>}
		</div>
	);
}

export default withRouter(Movie);
