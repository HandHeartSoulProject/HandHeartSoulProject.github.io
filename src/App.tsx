import "./styles/App.scss";
import Login from "./pages/Login";
import Events from "./components/Events";
import { HashRouter, Routes, Route } from "react-router-dom";

function App() {
	return (
		<div className="App">
			<HashRouter>
				<Routes>
					<Route path="/" element={<Login />} />
					<Route path="/events" element={<Events />} />
				</Routes>
			</HashRouter>
		</div>
	);
}

export default App;
