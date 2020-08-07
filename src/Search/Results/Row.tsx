import React, { Component } from 'react';
import { Box, Collapse, Hidden, IconButton, Menu, MenuItem, TableCell, TableRow, Typography } from '@material-ui/core';
import {
	Favorite as FavoriteIcon,
	KeyboardArrowDown as KeyboardArrowDownIcon,
	KeyboardArrowUp as KeyboardArrowUpIcon,
	MoreVert as MoreVertIcon,
	WatchLater as WatchLaterIcon,
} from '@material-ui/icons';

import './Row.scss';
import { Link } from 'react-router-dom';

export interface IRow {
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
	row: IRow;
}

interface IState {
	open: boolean;
	menuAnchor: any;
}

export class Row extends Component<IProps, IState> {


	constructor(props: any) {
		super(props);

		this.state = {
			open: false,
			menuAnchor: null,
		};

		this.toggleRow = this.toggleRow.bind(this);
		this.openMenu = this.openMenu.bind(this);
		this.closeMenu = this.closeMenu.bind(this);
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
						<Link to={'movie/' + row.id}>{row.title}</Link>
					</TableCell>
					<Hidden smDown>
						<TableCell align="right">{row.popularity}</TableCell>
					</Hidden>
					<TableCell align="right">{row.release_date}</TableCell>
					<TableCell align="right">
						<IconButton aria-controls="simple-menu" aria-haspopup="true" aria-label="add to favourites"
									onClick={this.openMenu}>
							<MoreVertIcon/>
						</IconButton>
						<Menu variant="menu"
							  anchorEl={menuAnchor}
							  open={Boolean(menuAnchor)}
							  onClose={this.closeMenu}>
							<MenuItem onClick={this.closeMenu}>
								<IconButton aria-label="add to watch later">
									<WatchLaterIcon/>
								</IconButton>
								Add to favourites
							</MenuItem>
							<MenuItem onClick={this.closeMenu}>
								<IconButton aria-label="add to favourites">
									<FavoriteIcon/>
								</IconButton>
								Save to Watch Later
							</MenuItem>
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
