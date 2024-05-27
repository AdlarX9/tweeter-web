import io from 'socket.io-client'

const Tweet = (tweets) => {
	async function deleteTweet() {
		const tweet = {
			username: tweets.tweets.username,
			token: localStorage.getItem('token')
		};

		const chargeUtile = JSON.stringify(tweet);

		const request = await fetch(`${import.meta.env.VITE_API_URL}/tweet/${tweets.tweets._id}`, {
			method: "DELETE",
			headers: { "Content-Type": "application/json" },
			body: chargeUtile
		});

		const reponse = await request.json();
		if (reponse.message === 'supprimé') io(import.meta.env.VITE_API_URL).emit('deleteTweet');
	}

	const tweet = tweets.tweets.tweet;
	const username = tweets.tweets.username;

	return (
		<>	
			<div className="top-wrapper">
				<p className="author">{username}</p>
				{localStorage.getItem('username') === username ? (
					<button className="btn-supprimer" onClick={deleteTweet}>supprimer</button>
				) : (<div></div>)}
			</div>
				<p className="content">{tweet}</p>
		</>
	)
}

export default Tweet