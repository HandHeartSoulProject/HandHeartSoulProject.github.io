import { Link } from "react-router-dom";

function Login() {
	return (
		<div className="login">
			<div>
				<h1>Log In</h1>
				<label>
					<b>Username</b>
				</label>
				<input type="text" placeholder="Enter Username" name="uname" required />
			</div>

			<div>
				<label>
					<b>Password</b>
				</label>
				<input type="password" placeholder="Enter Password" name="psw" required />
			</div>

			<Link to="/events">
				<button>Login</button>
			</Link>
		</div>
	);
}
export default Login;
