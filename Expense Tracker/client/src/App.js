import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ExpenseForm from "./components/expense/expenseForm";
import Singup from "./components/signup/signup";

function App() {
	return (
		<BrowserRouter>
			<div className="App">
					<h1>Expense Tracker</h1>
				<Routes>
					<Route path="/" element={<Singup />} />
					<Route path="/login" element={<Singup />} />
					<Route path="/expenses" element={<ExpenseForm />} />
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
