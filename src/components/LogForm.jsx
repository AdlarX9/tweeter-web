import { useState } from "react";

const LogForm = ({type}) => {

	const [reponse, setReponse] = useState(null);

	async function handleSubmit(event) {

		event.preventDefault();
		const avis = {
			username: event.target.querySelector("[name=username]").value,
			password: event.target.querySelector("[name=password]").value
		};
		const chargeUtile = JSON.stringify(avis);
		const request = await fetch(`${import.meta.env.VITE_API_URL}/${type}`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: chargeUtile
		});
		const reponse = await request.json();

		setReponse(reponse.message);

		localStorage.setItem('token', JSON.stringify(reponse.token));
		localStorage.setItem('username', JSON.stringify(reponse.username).split('').filter(char => char !== '"').join(''));
		if (reponse.username) window.location.pathname = "/";
	};

	return (
		<form className="log-form" onSubmit={handleSubmit}>
			<div className="form-section">
				<label>Username</label>
				<input type="text" name="username" placeholder="superusername" />
			</div>
			<div className="form-section">
				<label>Mot de passe</label>
				<input type="password" name="password" />
			</div>
			<p style={{color: 'red', fontSize: '1.5rem'}}>{reponse ?? (<></>)}</p>
			<button className="submit-btn">Envoyer</button>
		</form>
	)
}

export default LogForm