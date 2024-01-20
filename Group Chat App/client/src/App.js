import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./component/signup/singup";
import Chat from "./component/chat/chat";

function App() {
	return (
		<BrowserRouter>
			<div className="App">
				<Routes>
					<Route path="/" element={<Signup />} />
					<Route path="/chat" element={<Chat />} />
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
