import Alert, { AlertColor } from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { useState } from "react";

import { supabase } from "../supabaseClient";
import { userRole, dropDownRoles } from "../types/userTypes";

function CreateUsers() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [role, setRole] = useState<userRole>("contractor");
	
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

	async function createUser(e: React.FormEvent<HTMLButtonElement>) {
		e.preventDefault();
		const { data, error } = await supabase.auth.signUp({
			email: email,
			password: password,
			options: {
				data: {
					role: role
				}
			}
		});
		if (error || !data) {
			console.error("error");
			handleSnackbar(true, "error", "Error creating user. Please try again");
		} else {
			handleSnackbar(true, "success", "User added successfully");
		}
	}

	return (
		<form>
			<h1>Create a new user</h1>
			<div className="input-group">
				<label>Email</label>
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

			<div className="input-group">
				<label>User Privileges</label>
				<select onChange={e => setRole(e.target.value as userRole)}>
					{dropDownRoles.map(({ value, label }) => (
						<option value={value}>{label}</option>
					))}
				</select>
			</div>

			<button onClick={createUser}>Create User</button>

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
export default CreateUsers;
