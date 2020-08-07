import React, { PureComponent } from 'react';
import { Container, IconButton, InputBase, Paper } from '@material-ui/core';
// discover all movies https://api.themoviedb.org/3/discover/movie?api_key=
// get poster: poster_path  https://image.tmdb.org/t/p/w500/kqjL17yufvn9OVLyXYpvtyrFfak.jpg
import { Search as SearchIcon } from '@material-ui/icons';
import './Search.scss';
import { Results } from './Results/Results';
import { getMovies } from '../movie.service';

interface IProps {
}

interface IState {
	searchString: string;
	tmdbResponse: any;
	isLoading: boolean;
	error?: string;
}

export class Search extends PureComponent<IProps, IState> {

	constructor(props: any) {
		super(props);

		this.state = {
			searchString: '',
			tmdbResponse: null,
			isLoading: false,
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		this.setState({searchString: e.target.value});
	}

	handleSubmit(event: React.FormEvent<any>) {
		event.preventDefault();

		this.setState({isLoading: true});
		this.fetchMovies(this.state.searchString);
	}

	fetchMovies(query: string) {

		// check if the user entered a nice string
		if (query.length > 0) {
			const queryString = encodeURI(query);
			getMovies(queryString)
				.then((res) => {
						this.setState({
							isLoading: false,
							tmdbResponse: res,
						});
					}, (error) => {
						this.setState({
							isLoading: false,
							error: error.message,
						});
					},
				);
		}
	}

	render() {
		const {tmdbResponse, isLoading, error} = this.state;

		return (
			<Container className="app" maxWidth="md">
				<h1>Welcome</h1>
				<h3>Discover great movies from TMDB.</h3>

				{error &&
                <p>{error}</p>
				}

				<Paper component="form" className="search" onSubmit={this.handleSubmit}>
					<InputBase
						className="search__input"
						placeholder="Search Movies"
						inputProps={{'aria-label': 'search movies'}}
						value={this.state.searchString} onChange={this.handleChange}
					/>
					<IconButton type="submit" aria-label="search">
						<SearchIcon/>
					</IconButton>
				</Paper>

				{isLoading &&
                <p>Loading...</p>}

				{tmdbResponse?.results && <div className="results">
					{tmdbResponse.results.length > 0 &&
                    <Results data={tmdbResponse.results}/>
					}
					{tmdbResponse.results.length === 0 &&
                    <p>No movie was found. </p>
					}
                </div>}
			</Container>
		);
	}
}
