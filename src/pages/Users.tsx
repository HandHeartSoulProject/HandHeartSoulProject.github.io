import { Link } from "react-router-dom";

function Users() {
	return (
		<div>
			<Link to="/create-users">
				<button>Add a User</button>
			</Link>
			<Link to="/users-table">
				<button>View Users</button>
			</Link>
		</div>
	);
}

export default Users;
