import { NavLink, NavLinkProps } from "react-router-dom";

import "../styles/Nav.scss";
import logo from "../assets/logo.webp";
import { Link } from "react-router-dom";
import { supabase } from "../supabaseClient";

function NavBar() {
	const activeClass = ({ isActive }: { isActive: boolean }) => (isActive ? "active" : undefined);

	async function signOut() {
		const { error } = await supabase.auth.signOut()
	}

	return (
		<nav>
			<div className="links">
				<img src={logo} alt="Hand, Heart, and Soul" className="logo" />
				<NavLink to="communityEvents" className={activeClass}>
					Community Events
				</NavLink>
				<NavLink to="childrensEvents" className={activeClass}>
					Childrens Events
				</NavLink>
				<NavLink to="create-user" className={activeClass}>
					Create User
				</NavLink>
				<NavLink to="users" className={activeClass}>
					Users
				</NavLink>
			</div>
			<button onClick={signOut} className="sign-out">
				<Link to="/">Sign Out</Link>
			</button>
		</nav>
	);
}

export default NavBar;
