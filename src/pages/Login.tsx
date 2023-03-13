import { Link } from "react-router-dom";

function Login() {
	return (
		<form>
			<h1 style={{ marginTop: "3rem" }}>Log In</h1>
			<div className="input-group">
				<label>Username</label>
				<input type="text" placeholder="Enter Username" name="uname" required />
			</div>

			<div className="input-group">
				<label>Password</label>
				<input type="password" placeholder="Enter Password" name="psw" required />
			</div>

			<Link to="communityEvents">
				<button>Login</button>
			</Link>
		</form>
	);
}
export default Login;
