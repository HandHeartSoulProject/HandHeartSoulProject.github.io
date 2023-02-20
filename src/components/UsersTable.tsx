import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import { Database } from "../types/supabase";
// import { userInfo } from "../types/userTypes";

import UserModal from "./UserModal";

function UsersTable() {
	type userInfo = Database["public"]["Tables"]["users"]["Row"];
	const [users, setUsers] = useState<userInfo[]>();
	const [selectedUser, setSelectedUser] = useState<userInfo>({
		id: 0, 
		email: '', 
		role:''
	});
	const [modalStatus, setModalStatus] = useState(false);

	useEffect(() => {
		fetchUsers();
	}, []);

	async function fetchUsers() {
		var { data: users, error } = await supabase.from("users").select("*");
		// console.log(users);
		if (error || !users) console.error(error);
		else setUsers(users as userInfo[]);
	}

	function handleSelectedUser(currentUser: userInfo) {
		toggleModal();
		setSelectedUser(currentUser);
	}

	function toggleModal() {	
		setModalStatus((modalStatus) => !modalStatus);
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
							<th></th>
						</tr>
					</thead>
					<tbody>
						{users.map(user => {
							return (
								<tr key={user.id}>
									<td>{user.email}</td>
									<td>{user.role}</td>
									<td>
										<button onClick={() => handleSelectedUser(user)}>
											Edit User
										</button>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			) : (
				<div>Loading...</div>
			)}
			<UserModal user = {selectedUser} modalStatus = {modalStatus} toggleModal = {toggleModal}></UserModal>
		</div>
	);
}

export default UsersTable;
