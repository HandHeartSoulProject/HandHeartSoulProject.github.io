import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

import Modal from "react-modal";

import { userInfo } from "../types/userTypes";

Modal.setAppElement("#root");


function UserModal({user, modalStatus, toggleModal}) {

    async function deleteUser() {
		// const { data, error } = await supabase.auth.admin.deleteUser("4a506eec-c743-463e-a4d7-393ff47df6cd");

            const { data: { users }, error } = await supabase.auth.admin.listUsers()

		    if (error) console.error(error);
	}
	return (
		<Modal isOpen={modalStatus}>
			<body>
				<div className="body">
					<h1>{user.id}</h1>
					<button onClick={toggleModal}> Close Modal</button>
					<button onClick={deleteUser}> Delete User</button>
				</div>
			</body>
		</Modal>
	);

}

export default UserModal;