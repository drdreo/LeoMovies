import React, { Component } from 'react';
import { Hidden, Paper, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';

import { IMovie, Row } from './Row';


interface IProps {
	data: any;
}

interface IState {
	snackbarMessage: string;
	timer: any;
}

export class Results extends Component<IProps, IState> {

	constructor(props: any) {
		super(props);

		this.state = {snackbarMessage: '', timer: null};
		this.handleActionSuccess = this.handleActionSuccess.bind(this);
	}

	componentWillUnmount() {
		// prevent memory leak
		clearTimeout(this.state.timer);
	}

	handleActionSuccess(message: string) {
		this.setState({snackbarMessage: message});
		clearTimeout(this.state.timer);
		// auto clear snackbar after 3.5s
		let timer = setTimeout(() => {
			this.setState({snackbarMessage: ''});
		}, 3500);
		this.setState({timer});
	}

	render() {
		const {data} = this.props;
		const {snackbarMessage} = this.state;

		return (
			<TableContainer component={Paper}>
				<Table aria-label="collapsible table">
					<TableHead>
						<TableRow>
							<TableCell/>
							<TableCell>Title</TableCell>
							<Hidden smDown>
								<TableCell align="right">Popularity</TableCell>
							</Hidden>
							<TableCell align="right">Release</TableCell>
							<TableCell align="right">Actions</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{data && data.map((row: IMovie) => (
							<Row key={row.id} row={row} onActionSuccess={this.handleActionSuccess}/>
						))}
					</TableBody>
				</Table>
				<Snackbar open={snackbarMessage.length > 0}>
					<Alert severity="success">
						<AlertTitle>Success</AlertTitle>
						{snackbarMessage}
					</Alert>
				</Snackbar>
			</TableContainer>
		);
	}
}
