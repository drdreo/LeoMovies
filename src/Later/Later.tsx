import React, { PureComponent } from 'react';
import { Container } from '@material-ui/core';
import { Results } from '../Search/Results/Results';
import { IMovie } from '../Search/Results/Row';

interface IProps {
}

interface IState {
	later: IMovie[];
}

export default class Later extends PureComponent<IProps, IState> {

	constructor(props: any) {
		super(props);

		this.state = {
			later: JSON.parse(localStorage.getItem('later') || '[]'),
		};
	}

	render() {
		const {later} = this.state;

		return <React.Fragment>
			<Container maxWidth="md">
				{later.length > 0 ?
					<>
						<h2>Your Watch Later Movies</h2>
						<Results data={later}/>
					</>
					:
					<h2>You don't have any movies saved yet.</h2>
				}
			</Container>
		</React.Fragment>;
	}
}
