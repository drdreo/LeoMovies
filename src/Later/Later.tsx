import React, { PureComponent } from 'react';
import { Container, Typography } from '@material-ui/core';
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
			<Container maxWidth="md" className="container">
				{later.length > 0 ?
					<>
						<Typography variant="h4" component="h1">Your Watch Later Movies</Typography>
						<Results data={later}/>
					</>
					:
					<Typography variant="h4" component="h1">You don't have any movies saved yet.</Typography>
				}
			</Container>
		</React.Fragment>;
	}
}
