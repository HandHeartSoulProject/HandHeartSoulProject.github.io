import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

import Modal from "react-modal";
import { dropDownRoles } from "../types/userTypes";

Modal.setAppElement("#root");

var test: string = 'admin';
function UserModal({user, modalStatus, toggleModal}) {
	async function deleteUser() {
		//TODO fill out
	}
	return (
		// <Modal isOpen={modalStatus}>
		<div className="login">
			<div>
				<h1>User Info</h1>
				<label>
					<b>Username</b>
				</label>
				<input type="text" placeholder={user.email} name="uname" required />
			</div>

            <div>
				<label>
					<b>User Privileges</b>
				</label>
				<select>
					{dropDownRoles.map(({ value, label }) => (
						<option value={value} selected={value == user.role}>{label}</option>
					))}

                {/* <option>1</option>  
                <option selected={user.role == test}>2</option>   
                <option>3</option>   
                <option>4</option>        */}
				</select>
			</div>

			<button onClick={toggleModal}> Close Modal</button>
			<button onClick={deleteUser}> Delete User</button>
			<button onClick={deleteUser}> Update User</button>
		</div>

		// </Modal>
	);
}

export default UserModal;