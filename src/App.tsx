import React, { Component, Suspense } from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';

// Material Components
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import { Favorite as FavoriteIcon, Search as SearchIcon, WatchLater as WatchLaterIcon } from '@material-ui/icons';
import './App.scss';


// Page Components lzayloaded
const Favorites = React.lazy(() => import('./Favorites/Favorites'));
const MovieWithRouter = React.lazy(() => import('./Movie/Movie'));
const Later = React.lazy(() => import('./Later/Later'));
const Search = React.lazy(() => import('./Search/Search'));

interface IProps {
}

interface IState {
	route: string;
}

class App extends Component<IProps, IState> {

	constructor(props: any) {
		super(props);
		this.state = {route: window.location.pathname.substr(1)}; // init to current path, e.g. "/favorites" remove first "/"
		this.handleRouteChange = this.handleRouteChange.bind(this);
	}

	handleRouteChange(event: any, newValue: string) {
		this.setState({route: newValue});
	}

	render() {
		const {route} = this.state;

		return (
			<Suspense fallback={<span>Loading...</span>}>
				<Router>
					<Switch>
						<Route path="/movie/:movieId" component={MovieWithRouter}/>
						<Route path="/favorites" component={Favorites}/>
						<Route path="/later" component={Later}/>
						<Route path="/" component={Search}/>
					</Switch>

					<footer className="navigation">
						<BottomNavigation value={route} onChange={this.handleRouteChange} showLabels>
							<BottomNavigationAction component={Link} to="/"
													value="" label="Discover" icon={<SearchIcon/>}/>
							<BottomNavigationAction component={Link} to="/favorites"
													value="favorites" label="Favourites" icon={<FavoriteIcon/>}/>
							<BottomNavigationAction component={Link} to="/later"
													value="later" label="Watch Later" icon={<WatchLaterIcon/>}/>
						</BottomNavigation>
					</footer>
				</Router>
			</Suspense>
		);
	}
}

export default App;
