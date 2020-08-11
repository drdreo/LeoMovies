import React, { PureComponent } from 'react';
import { Container, Typography } from '@material-ui/core';

import { IMovie } from '../Search/Results/Row';
import { Results } from '../Search/Results/Results';


interface IProps {
}

interface IState {
	favorites: IMovie[];
}

export default class Favorites extends PureComponent<IProps, IState> {

	constructor(props: any) {
		super(props);

		this.state = {
			favorites: JSON.parse(localStorage.getItem('favorites') || '[]'),
		};
	}

	render() {
		const {favorites} = this.state;

		return <React.Fragment>
			<Container maxWidth="md" className="container">
				{favorites.length > 0 ?
					<>
						<Typography variant="h4" component="h1">Your Favourites</Typography>
						<Results data={favorites}/>
					</>
					:
					<Typography variant="h4" component="h1">You don't have any favourites yet</Typography>
				}
			</Container>
		</React.Fragment>;
	}
}
