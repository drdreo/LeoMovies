import React, { PureComponent } from 'react';
import { Container } from '@material-ui/core';

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
			<Container maxWidth="md">
				{favorites.length > 0 ?
					<>
						<h2>Your Favourites</h2>
						<Results data={favorites}/>
					</>
					:
					<h2>You don't have any favourites yet</h2>
				}
			</Container>
		</React.Fragment>;
	}
}
