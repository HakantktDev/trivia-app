import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Settings from './pages/Settings';
import Questions from './pages/Questions';
import FinalScreen from './pages/FinalScreen';
import WrongAnswer from './pages/WrongAnswer';
import logo from './logo.svg';
import './App.css';
import TimeIsUp from './pages/TimeIsUp';

function App() {
	return (
		<Router>
			<Switch>
				<Route path='/' exact>
					<div className='centered-column'>
						<img src={logo} className='App-logo' alt='logo' />
						<h2>A TRIVIA GAME</h2>
					</div>
					<Settings />
				</Route>
				<Route path='/questions'>
					<Questions />
				</Route>
				<Route path='/score'>
					<FinalScreen />
				</Route>
				<Route path='/wrong-answer'>
					<WrongAnswer />
				</Route>
				<Route path='/time-is-up'>
					<TimeIsUp />
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
