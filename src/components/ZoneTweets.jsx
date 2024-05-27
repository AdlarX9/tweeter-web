import Tweet from './Tweet'

const ZoneTweets = (tweets) => {

	let arrayTweets = tweets.tweets.tweets.reverse();

	return (
		<section className="zone-tweets">
			{arrayTweets.map((tweet, index) => (
				<div className="tweet" key={index}>
					{<Tweet tweets={tweet} />}
				</div>
			))}
		</section>
	)
}

export default ZoneTweets