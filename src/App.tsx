import "./styles/App.scss";
import Login from "./pages/Login";
import Events from "./components/Events";
import Users from "./components/Users";
import CreateUsers from "./components/CreateUsers";
import { HashRouter, Routes, Route } from "react-router-dom";

function App() {
	return (
		<div className="App">
			<HashRouter>
				<Routes>
					<Route path="/" element={<Login />} />
					<Route path="/events" element={<Events />} />
					<Route path="/users" element={<Users />} />
					<Route path="/create-users" element={<CreateUsers />} />
				</Routes>
			</HashRouter>
		</div>
	);
}

export default App;
