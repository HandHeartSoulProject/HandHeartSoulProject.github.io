import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import Snackbar from "@mui/material/Snackbar";
import Alert, { AlertColor } from "@mui/material/Alert";

function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const navigate = useNavigate();

	// For reference https://mui.com/material-ui/react-snackbar/#customization
	const [snackbar, setSnackBar] = useState<{ toggle: boolean; severity: AlertColor; message: string }>({
		toggle: false,
		severity: "error",
		message: ""
	});

	function handleSnackbar(open: boolean, severity: AlertColor, message: string) {
		setSnackBar({
			toggle: open,
			severity: severity,
			message: message
		});
	}
	function closeSnackbar() {
		handleSnackbar(false, snackbar.severity, snackbar.message);
	}

	async function loginWithAuthentication(e: React.FormEvent<HTMLButtonElement>) {
		e.preventDefault();

		console.log(email);
		console.log(password);
		const { data, error } = await supabase.auth.signInWithPassword({
			email: email,
			password: password
		});

		if (error) {
			console.error(error);
			handleSnackbar(true, "error", "Invalid Credentials. Username or password is incorrect.");
			return;
		}
		console.log(data);
		navigate("/communityEvents");
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

			<button onClick={loginWithAuthentication}>Login</button>
			<div>
				<Snackbar open={snackbar.toggle} autoHideDuration={3000} onClose={closeSnackbar}>
					<Alert onClose={closeSnackbar} severity={snackbar.severity} variant={"filled"}>
						{snackbar.message}
					</Alert>
				</Snackbar>
			</div>
		</form>
	);
}
export default Login;
