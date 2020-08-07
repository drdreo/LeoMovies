import { Hidden, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import React, { Component } from 'react';
import { IMovie, Row } from './Row';

interface IProps {
	data: any;
}

export class Results extends Component<IProps> {

	render() {
		const {data} = this.props;
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
							<Row key={row.id} row={row}/>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		);
	}
}


