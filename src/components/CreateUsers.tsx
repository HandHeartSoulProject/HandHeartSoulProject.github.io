import Alert, { AlertColor } from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { useState } from "react";
import { supabase } from "../supabaseClient";
import { userRole } from "../types/userTypes";

function CreateUsers() {
	// roles for a user, formatted to serve as drop down menu options
	const roles: { value: userRole; label: string }[] = [
		{ value: "contractor", label: "Contractor" },
		{ value: "admin", label: "Admin" },
		{ value: "employee", label: "Employee" }
	];

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [role, setRole] = useState<userRole>("contractor");
	// For reference https://mui.com/material-ui/react-snackbar/#customization
	const [snackbar, setSnackBar] = useState<{ toggle: boolean; severity: AlertColor; message: string }>({
		toggle: false,
		severity: "error",
		message: ""
	});

	function handleSnackbar(open: boolean = false, message: string = "", severity: AlertColor = "error") {
		setSnackBar({
			toggle: open,
			severity: severity,
			message: message
		});
	}

	async function createUser() {
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
			handleSnackbar(true, "Error creating user. Please try again", "error");
		} else {
			handleSnackbar(true, "User added successfully", "success");
		}
	}

	return (
		<div className="login">
			<h1>Create a new user</h1>
			<div>
				<label>
					<b>Email</b>
				</label>
				<input
					type="text"
					placeholder="Enter Username"
					name="uname"
					onChange={e => setEmail(e.target.value)}
					required
				/>
			</div>

			<div>
				<label>
					<b>Password</b>
				</label>
				<input
					type="password"
					placeholder="Enter Password"
					name="psw"
					onChange={e => setPassword(e.target.value)}
					required
				/>
			</div>

			<div>
				<label>
					<b>User Privileges</b>
				</label>
				<select onChange={e => setRole(e.target.value as userRole)}>
					{roles.map(({ value, label }) => (
						<option value={value}>{label}</option>
					))}
				</select>
			</div>

			<button onClick={createUser}>Create User</button>

			<div>
				<Snackbar open={snackbar.toggle} autoHideDuration={3000} onClose={() => handleSnackbar()}>
					<Alert
						onClose={() => handleSnackbar()}
						severity={snackbar.severity}
						variant={"filled"}
						sx={{ width: "100%" }}
					>
						{snackbar.message}
					</Alert>
				</Snackbar>
			</div>
		</div>
	);
}
export default CreateUsers;
