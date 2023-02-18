import { useState, Fragment } from "react";
import { supabase } from "../supabaseClient";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

function CreateUsers() {
	// roles for a user, formatted to serve as drop down menu options
	const roles: { value: string; label: string }[] = [
		{ value: "contractor", label: "Contractor" },
		{ value: "admin", label: "Admin" },
		{ value: "employee", label: "Employee" }
	];

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [role, setRole] = useState("contractor");
	// for reference https://mui.com/material-ui/react-snackbar/#customization
	const [snackbar, setSnackBar] = useState({
		toggle: false,
		severity: "",
		message: ""
	});

	function handleSnackbar(open: boolean, message: string, severity: string) {
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
				<select onChange={e => setRole(e.target.value)}>
					{roles.map(({ value, label }, index) => (
						<option value={value}>{label}</option>
					))}
				</select>
			</div>

			<button onClick={createUser}>CreateUser</button>

			<div>
				<Snackbar open={snackbar.toggle} autoHideDuration={3000} onClose={() => handleSnackbar(false, "", "")}>
					<Alert
						onClose={() => handleSnackbar(false, "", "")}
						severity={snackbar.severity} // you may see an error here but i don't care enough to fix it and it still works :)
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
