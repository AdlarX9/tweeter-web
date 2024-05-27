import { Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import Header from './components/Header'
import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn';
import Home from './pages/Home';

function App() {
	return (
		<main>
			<Router>
				<Header />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/LogIn" element={<LogIn />} />
					<Route path="/SignUp" element={<SignUp />} />
				</Routes>
			</Router>
		</main>
	)
}

export default App