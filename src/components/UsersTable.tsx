import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { Database } from "../types/supabase";

import { userRole } from "../types/userTypes";

function UsersTable() {
	var r: userRole[] = ["contractor", "admin"];
	type user = Database["public"]["Tables"]["users"]["Row"];
	const [users, setUsers] = useState<user[]>();

	useEffect(() => {
		fetchUsers();
	}, []);

	async function fetchUsers() {
		var { data: users, error } = await supabase.from("users").select("*");
		console.log(users);
		if (error || !users) console.error(error);
		else setUsers(users as user[]);
	}

	return (
		<div className="events">
			<h1>Users</h1>
			{users ? (
				<table>
					<thead>
						<tr>
							<th>Email</th>
							<th>Role</th>
						</tr>
					</thead>
					<tbody>
						{users.map(user => {
							return (
								<tr key={user.id}>
									<td>{user.email}</td>
									<td>{user.role}</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			) : (
				<div>Loading...</div>
			)}
		</div>
	);
}

export default UsersTable;
