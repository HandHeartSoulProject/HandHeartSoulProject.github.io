import { Link } from "react-router-dom";
import { useState } from "react";
import { supabase } from "../supabaseClient";

function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	async function loginWithAuthentication(e: React.FormEvent<HTMLButtonElement>) {
		e.preventDefault();
		console.log(email)
		console.log(password)
		const { data, error } = await supabase.auth.signInWithPassword({
			email: email,
			password: password
		  })
		
		if (data) {
			console.log(data)
		}

		if (error) {
			console.log(error)
		}
	}

	return (
		<form>
			<h1 style={{ marginTop: "3rem" }}>Log In</h1>
			<div className="input-group">
				<label>Username</label>
				<input
					type="text"
					placeholder="Enter Username"
					name="uname"
					onChange={e => setEmail(e.target.value)}
					required
				/>
			</div>

			<div className="input-group">
				<label>Password</label>
				<input
					type="password"
					placeholder="Enter Password"
					name="psw"
					onChange={e => setPassword(e.target.value)}
					required
				/>
			</div>

			{/* <Link to="communityEvents"> */}
				<button onClick={loginWithAuthentication}>Login</button>
			{/* </Link> */}
		</form>
	);
}
export default Login;
