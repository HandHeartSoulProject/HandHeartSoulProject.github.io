import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { Database } from "../types/supabase";

function CreateUsers() {
    const[username, setUserName] = useState("");
	

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
				<input type="password" placeholder="Enter Password" name="psw" onChange={(e) => handlePasswordChange(e)}required />
			</div>

		</div>
	);
}
export default CreateUsers;