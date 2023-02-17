import { useState, Fragment } from "react";
import { supabase } from "../supabaseClient";
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

function CreateUsers() {
	
	// roles for a user, formatted to serve as drop down menu options
	const roles:{value: string, label:string}[] = [
		{ value: 'contractor', label: 'Contractor' },
		{ value: 'admin', label: 'Admin' },
		{ value: 'employee', label: 'Employee' }
	];

    const[email, setEmail] = useState("");
	const[password, setPassword] = useState("");
	const[role, setRole] = useState("contractor");
	// for reference https://mui.com/material-ui/react-snackbar/#customization
	const[snackbar, setSnackBar] = useState({
		toggle: false,
		severity: "",
		message: ""
	})
	const[feedback, setFeedback] = useState(false); // state for the snackbar notification
	const[snackbarMessage, setSnackbarMessage] = useState("");

	function handleSnackbar(open:boolean, message: string) {
		setFeedback(open);
		setSnackbarMessage(message);
	}
  
	
	const action = (
		<Fragment>
		  <IconButton
			size="small"
			aria-label="close"
			color="inherit"
			onClick={() =>handleSnackbar(false, "")}
		  >
			<CloseIcon fontSize="small" />
		  </IconButton>
		</Fragment>
	  );


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
			console.error(error);
			setSnackbarMessage("Error creating user. Please try again");
			setFeedback(true);

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
					<b>User Priveleges</b>
				</label>
				<select onChange={e => setRole(e.target.value)}>
					{roles.map(({ value, label }, index) => (
						<option value={value}>{label}</option>
					))}
				</select>
			</div>

			<button onClick={createUser}>CreateUser</button>

			<div>
				<Button onClick={() => handleSnackbar(true, 'test')}>Open simple snackbar</Button>
				<Snackbar
					open={feedback}
					autoHideDuration={6000}
					onClose={() => handleSnackbar(false, "")}
					message={snackbarMessage}
					action={action}
				/>
			</div>
		</div>
	);
}
export default CreateUsers;