import { Link } from "react-router-dom";

function Login() {
	return (
		<form>
			<h1>Log In</h1>
			<div className="input-group">
				<label>Username</label>
				<input type="text" placeholder="Enter Username" name="uname" required />
			</div>

			<div className="input-group">
				<label>Password</label>
				<input type="password" placeholder="Enter Password" name="psw" required />
			</div>

			<Link to="events">
				<button>Login</button>
			</Link>
		</form>
	);
}
export default Login;
