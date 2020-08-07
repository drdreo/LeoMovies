import React, { Component } from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';

// Material Components
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import { Favorite as FavoriteIcon, Search as SearchIcon, WatchLater as WatchLaterIcon } from '@material-ui/icons';

// Page Components
import { Favorites } from './Favorites/Favorites';
import { MovieWithRouter } from './Movie/Movie';
import { Later } from './Later/Later';
import { Search } from './Search/Search';
import './App.scss';


interface IProps {
}

interface IState {
	route: string;
}

class App extends Component<IProps, IState> {

	constructor(props: any) {
		super(props);
		this.state = {route: ''}; // init to home route

		this.handleRouteChange = this.handleRouteChange.bind(this);
	}

	handleRouteChange(event: any, newValue: string) {
		this.setState({route: newValue});
	}

	render() {
		const {route} = this.state;

		return (
			<Router>

				<Switch>
					<Route path="/movie/:movieId" component={MovieWithRouter}/>
					<Route path="/favorites" component={Favorites}/>
					<Route path="/later" component={Later}/>
					<Route path="/" component={Search}/>
				</Switch>

				<BottomNavigation className="navigation" value={route} onChange={this.handleRouteChange} showLabels>
					<BottomNavigationAction component={Link} to="/"
											value="" label="Discover" icon={<SearchIcon/>}/>
					<BottomNavigationAction component={Link} to="/favorites"
											value="favorites" label="Favourites" icon={<FavoriteIcon/>}/>
					<BottomNavigationAction component={Link} to="/later"
											value="later" label="Watch Later" icon={<WatchLaterIcon/>}/>
				</BottomNavigation>

			</Router>
		);
	}
}

export default App;
