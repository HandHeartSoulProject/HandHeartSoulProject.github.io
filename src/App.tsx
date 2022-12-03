import "./App.scss";
import Login from "./pages/Login"
import Events from "./components/Events"
import {BrowserRouter, Routes, Route} from 'react-router-dom';

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Login />} />
					<Route path="/events" element={<Events />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
