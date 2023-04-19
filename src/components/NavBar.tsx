import { Link, NavLink } from "react-router-dom";

import logo from "../assets/logo.webp";
import "../styles/Nav.scss";
import { supabase } from "../supabaseClient";

function NavBar() {
	const activeClass = ({ isActive }: { isActive: boolean }) => (isActive ? "active" : undefined);

	async function signOut() {
		const { error } = await supabase.auth.signOut();
		if (error) console.error(error);
	}

	return (
		<nav>
			<div className="links">
				<img src={logo} alt="Hand, Heart, and Soul" className="logo" />
				<NavLink to="community-events" className={activeClass}>
					Community Events
				</NavLink>
				<NavLink to="childrens-events" className={activeClass}>
					Childrens Events
				</NavLink>
				<NavLink to="event-types" className={activeClass}>
					Event Types
				</NavLink>
				<NavLink to="create-user" className={activeClass}>
					Create User
				</NavLink>
				<NavLink to="users" className={activeClass}>
					Users
				</NavLink>
				<NavLink to="vis" className={activeClass}>
					Data Visualization
				</NavLink>
			</div>
			<button onClick={signOut} className="sign-out">
				<Link to="/">Sign Out</Link>
			</button>
		</nav>
	);
}

export default NavBar;
