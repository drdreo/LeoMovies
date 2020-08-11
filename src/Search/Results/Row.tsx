import React, { Component } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Collapse, Hidden, IconButton, Link, Menu, MenuItem, TableCell, TableRow, Typography } from '@material-ui/core';
import {
	Favorite as FavoriteIcon,
	KeyboardArrowDown as KeyboardArrowDownIcon,
	KeyboardArrowUp as KeyboardArrowUpIcon,
	MoreVert as MoreVertIcon,
	WatchLater as WatchLaterIcon,
} from '@material-ui/icons';

import './Row.scss';

export interface IMovie {
	popularity: number;
	vote_count: number;
	video: boolean;
	poster_path: string;
	id: number;
	adult: boolean;
	backdrop_path: string;
	original_language: string;
	original_title: string;
	genre_ids: number[];
	title: string;
	vote_average: number;
	overview: string;
	release_date: string;
}

interface IProps {
	row: IMovie;
	onActionSuccess: Function;
}

interface IState {
	open: boolean;
	menuAnchor: any;
	isFavorite: boolean;
}

export class Row extends Component<IProps, IState> {

	get isFavorite(): boolean {
		let storedFavs = localStorage.getItem('favorites');

		if (!storedFavs) {
			return false;
		}
		const favorites = [...JSON.parse(storedFavs)];
		return favorites.some(movie => movie.id === this.props.row.id);
	}

	get isLater(): boolean {
		let storedLater = localStorage.getItem('later');

		if (!storedLater) {
			return false;
		}
		const later = [...JSON.parse(storedLater)];
		return later.some(movie => movie.id === this.props.row.id);
	}

	constructor(props: any) {
		super(props);

		this.state = {
			open: false,
			menuAnchor: null,
			isFavorite: false,
		};

		this.toggleRow = this.toggleRow.bind(this);
		this.openMenu = this.openMenu.bind(this);
		this.closeMenu = this.closeMenu.bind(this);
		this.addFavorite = this.addFavorite.bind(this);
		this.removeFavorite = this.removeFavorite.bind(this);
		this.addWatchLater = this.addWatchLater.bind(this);
		this.removeWatchLater = this.removeWatchLater.bind(this);
	}

	toggleRow() {
		this.setState({open: !this.state.open});
	}

	openMenu(event: any) {
		this.setState({menuAnchor: event.currentTarget});
	}

	closeMenu() {
		this.setState({menuAnchor: null});
	}

	addFavorite() {
		this.closeMenu();
		let favorites: IMovie[] = [];
		let storedFavs = localStorage.getItem('favorites');

		if (storedFavs) {
			favorites = [...JSON.parse(storedFavs)];
		}

		favorites.push(this.props.row);
		localStorage.setItem('favorites', JSON.stringify(favorites));
		this.props.onActionSuccess('Favourite added successfully.');
	}

	removeFavorite() {
		this.closeMenu();
		let favorites: IMovie[] = [];
		let storedFavs = localStorage.getItem('favorites');

		if (storedFavs) {
			favorites = [...JSON.parse(storedFavs)];
			favorites = favorites.filter((movie: IMovie) => movie.id !== this.props.row.id);
			localStorage.setItem('favorites', JSON.stringify(favorites));
			this.props.onActionSuccess('Favourite removed.');
		}
	}

	addWatchLater() {
		this.closeMenu();
		let later: IMovie[] = [];
		let storedLater = localStorage.getItem('later');

		if (storedLater) {
			later = [...JSON.parse(storedLater)];
		}

		later.push(this.props.row);
		localStorage.setItem('later', JSON.stringify(later));
		this.props.onActionSuccess('Added to Watch Later successfully.');
	}

	removeWatchLater() {
		this.closeMenu();
		let later: IMovie[] = [];
		let storedLater = localStorage.getItem('later');

		if (storedLater) {
			later = [...JSON.parse(storedLater)];
			later = later.filter((movie: IMovie) => movie.id !== this.props.row.id);
			localStorage.setItem('later', JSON.stringify(later));
			this.props.onActionSuccess('Removed from Watch Later.');
		}
	}

	render() {
		const {row} = this.props;
		const {open, menuAnchor} = this.state;

		return (
			<React.Fragment>
				<TableRow className="movie">
					<TableCell>
						<IconButton aria-label="expand row" size="small" onClick={this.toggleRow}>
							{open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
						</IconButton>
					</TableCell>
					<TableCell component="th" scope="row">
						<Link component={RouterLink} to={'movie/' + row.id}>{row.title}</Link>
					</TableCell>
					<Hidden smDown>
						<TableCell align="right">{row.popularity}</TableCell>
					</Hidden>
					<TableCell align="right">{row.release_date}</TableCell>
					<TableCell align="right">
						<IconButton className="movie__menu" aria-controls="simple-menu" aria-haspopup="true"
									onClick={this.openMenu}>
							<MoreVertIcon/>
						</IconButton>
						<Menu variant="menu"
							  disableScrollLock={true}
							  anchorEl={menuAnchor}
							  open={Boolean(menuAnchor)}
							  onClose={this.closeMenu}>
							{this.isFavorite ?
								<MenuItem onClick={this.removeFavorite}>
									<IconButton aria-label="remove favourite">
										<FavoriteIcon/>
									</IconButton>
									Remove favourite
								</MenuItem> :
								<MenuItem onClick={this.addFavorite} data-test-id="add-fav-btn">
									<IconButton aria-label="add to favourites">
										<FavoriteIcon/>
									</IconButton>
									Add to favourites
								</MenuItem>

							}
							{this.isLater ?
								<MenuItem onClick={this.removeWatchLater}>
									<IconButton aria-label="remove from watch later list">
										<WatchLaterIcon/>
									</IconButton>
									Remove from Watch Later
								</MenuItem>
								:
								<MenuItem onClick={this.addWatchLater} data-test-id="add-later-btn">
									<IconButton aria-label="add to watch later list">
										<WatchLaterIcon/>
									</IconButton>
									Save to Watch Later
								</MenuItem>}
						</Menu>
					</TableCell>
				</TableRow>
				<TableRow>
					<TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={6}>
						<Collapse in={open} timeout="auto" unmountOnExit>
							<Box margin={1}>
								<Typography variant="h6" gutterBottom component="div">
									Overview
								</Typography>
								<img className="movie__poster" src={'https://image.tmdb.org/t/p/w185/' + row.poster_path} alt=""/>
								{row.overview}
							</Box>
						</Collapse>
					</TableCell>
				</TableRow>
			</React.Fragment>
		);
	}
}
