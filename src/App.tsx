import React from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import './App.scss';

// Page Components
import { Favorites } from './Favorites/Favorites';
import { Movie } from './Movie/Movie';
import { Later } from './Later/Later';
import { Search } from './Search/Search';


import { BottomNavigation, BottomNavigationAction, Container } from '@material-ui/core';
import { Favorite as FavoriteIcon, Search as SearchIcon, WatchLater as WatchLaterIcon } from '@material-ui/icons';

function App() {
	return (
		<Router>
			<Container className="app">
				<Switch>
					<Route path="/movie/:movieId">
						<Movie/>
					</Route>
					<Route path="/favorites">
						<Favorites/>
					</Route>
					<Route path="/later">
						<Later/>
					</Route>
					<Route path="/">
						<Search/>
					</Route>
				</Switch>

				<BottomNavigation showLabels>
					<Link to="/">
						<BottomNavigationAction label="Discover" icon={<SearchIcon/>}/>
					</Link>
					<Link to="/favorites">
						<BottomNavigationAction label="Favourites" icon={<FavoriteIcon/>}/>
					</Link>
					<Link to="/later">
						<BottomNavigationAction label="Watch Later" icon={<WatchLaterIcon/>}/>
					</Link>
				</BottomNavigation>
			</Container>
		</Router>
	);
}

export default App;
