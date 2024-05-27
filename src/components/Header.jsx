import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

const Header = () => {

	const [reponse, setReponse] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const checkConnection = async () => {

			const token = {token: localStorage.getItem('token') ?? 'yobitch'};
			const chargeUtile = JSON.stringify(token);
			const request = await fetch(`${import.meta.env.VITE_API_URL}/logged`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: chargeUtile
			});
			const response = await request.json();
			setReponse(response);
			setLoading(false);
		};

		checkConnection();
	}, []);

	function deconnection() {
		localStorage.removeItem('token');
		localStorage.removeItem('username');
		location.reload();
	}

	return (
		<header>
			<NavLink to='/' className='btn-home'>Home</NavLink>
			<ul className='auth'>
			{loading ? (
				<li>Chargement...</li>
			) : (
				reponse.message === 'loggé' ? (
					
					<li onClick={deconnection}>Se déconnecter</li>
				) : (
					<>
						<li><NavLink to='/LogIn' className='navlink'>Log In</NavLink></li>
						<li><NavLink to='/SignUp' className='navlink'>Sign Up</NavLink></li>
					</>
				)
			)}
			</ul>
		</header>
	)
}

export default Header