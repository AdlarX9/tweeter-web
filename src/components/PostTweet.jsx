import { useEffect, useState } from 'react';
import Chevron from '/assets/envoyer.png'
import io from 'socket.io-client';

const PostTweet = () => {

	const [value, setValue] = useState('');

	function handleChange(e) {
		setValue(e.target.value)
	}

	async function postTweet(e) {
		e.preventDefault();
		const tweet = {
			tweet: e.target.querySelector("[name=tweet]").value,
			token: localStorage.getItem('token')
		};
		const chargeUtile = JSON.stringify(tweet);
		const request = await fetch(`${import.meta.env.VITE_API_URL}/tweet`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: chargeUtile
		});
		const reponse = await request.json();
		if (reponse.message === 'Tweet envoyé !') {
			io(import.meta.env.VITE_API_URL).emit('tweet', tweet);
			setValue('');
		}
	}

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


	return (
		<form className='post-tweet' onSubmit={postTweet}>
			{loading ? (<label>Chargement...</label>) : (
				reponse.message === 'loggé' ? (
					<>
						<label>Tweet</label>
						<input
							type='text'
							name='tweet'
							value={value}
							onChange={handleChange}
							className='input-tweet'
							placeholder='Ce site est incroyable !'
						/>
						<button className='btn-envoyer'>
							<img src={Chevron} />
						</button>
					</>
				) : (
					<label>Connectez-vous !</label>
				)
			)}
		</form>
	)
}

export default PostTweet