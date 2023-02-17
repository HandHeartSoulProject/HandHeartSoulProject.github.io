import { useState } from "react";
import { supabase } from "../supabaseClient";
import { Database } from "../types/supabase";
import Alert from '@mui/material/Alert';

function CreateUsers() {
	const roles:{value: string, label:string}[] = [
	{ value: 'contractor', label: 'Contractor' },
    { value: 'admin', label: 'Admin' },
    { value: 'employee', label: 'Employee' }];

    const[email, setEmail] = useState("");
	const[password, setPassword] = useState("")
	const[role, setRole] = useState("contractor")


	async function createUser() {
		const { data, error } = await supabase.auth.signUp({
			email: email,
			password: password,
			options: {
				data: {
					role: role
				}
			}
			})
		if (error || !data) console.error(error);
		console.log(role)
	}

    return (
		<div className="login">
			<h1>Create a new user</h1>
			<div>
				<label>
					<b>Email</b>
				</label>
				<input type="text" placeholder="Enter Username" name="uname" onChange={e => setEmail(e.target.value)} required />
			</div>

			<div>
				<label>
					<b>Password</b>
				</label>
				<input type="password" placeholder="Enter Password" name="psw" onChange={e => setPassword(e.target.value)}required />
			</div>

			<div>
				<label>
					<b>User Priveleges</b>
				</label>
				<select onChange={e => setRole(e.target.value)}>
					{roles.map(({ value, label }, index) => <option value={value} >{label}</option>)}
				</select>
			</div>

			

			<button onClick={createUser}>CreateUser</button>

			<Alert severity="error">This is a basic Alert.</Alert>
		</div>
		

		
	);
}
export default CreateUsers;