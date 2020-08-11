import React, { PureComponent } from 'react';
import { Container, IconButton, InputBase, Link, Paper } from '@material-ui/core';
import { Search as SearchIcon } from '@material-ui/icons';

import './Search.scss';
import { Results } from './Results/Results';
import { getMoviesCached } from '../movie.service';

import logo from './icon.png';

interface IProps {
}

interface IState {
	searchString: string;
	tmdbResponse: any;
	isLoading: boolean;
	error?: string;
}

export default class Search extends PureComponent<IProps, IState> {

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

		// check if the user entered a nice string
		const query = this.state.searchString;
		if (query.length > 0) {
			this.setState({isLoading: true});
			this.fetchMovies(query);
		}
	}

	fetchMovies(query: string) {
		const queryString = encodeURI(query);
		getMoviesCached(queryString)
			.then((res: any) => {
					this.setState({
						isLoading: false,
						tmdbResponse: res,
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
		const {tmdbResponse, isLoading, error} = this.state;

		return (
			<Container maxWidth="md">
				<div className="brand">
					<img src={logo} className="brand__logo" alt="LeoMovies logo"/> <h1>LeoMovies</h1>
				</div>
				<h3>Discover great movies from <Link href="https://www.themoviedb.org/">TMDB</Link>.</h3>

				{error &&
                <p>{error}</p>
				}

				<Paper component="form" className="search" onSubmit={this.handleSubmit}>
					<InputBase
						className="search__input"
						placeholder="Search Movies"
						inputProps={{'aria-label': 'search movies'}}
						autoFocus
						value={this.state.searchString}
						onChange={this.handleChange}/>
					<IconButton type="submit" aria-label="search" data-testid="search-btn">
						<SearchIcon/>
					</IconButton>
				</Paper>

				{isLoading &&
                <p>Loading...</p>
				}

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
