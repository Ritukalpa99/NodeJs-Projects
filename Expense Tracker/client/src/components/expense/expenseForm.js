import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ExpenseForm = () => {
	const [expenses, setExpenses] = useState([]);
	const [amount, setAmount] = useState(0);
	const [description, setDescription] = useState("");
	const [category, setCategory] = useState("");
	const navigate = useNavigate();

	useEffect(() => {
		const token = localStorage.getItem("user");
		const fetchData = async () => {
			try {
				const response = await fetch("http://localhost:3001/expenses", {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: token,
					},
				});

				if (!response.ok) {
					throw new Error("Error fetching expenses");
				}
				const data = await response.json();
				setExpenses(data);
			} catch (err) {
				console.error("Error fetching expense", err.message);
			}
		};
		fetchData();
	}, []);

	const handleDelete = async (id) => {
		try {
			const token = localStorage.getItem("user");
			const response = await fetch(
				`http://localhost:3001/expenses/delete-expense/${id}`,
				{
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
						Authorization: token,
					},
				}
			);

			if (response.ok) {
				// throw new Error("not working");
				setExpenses((prevExp) =>
					prevExp.filter((exp) => exp.id !== id)
				);
				navigate("/expenses");
			}
		} catch (e) {
			console.log("err" + e.message);
		}
	};

	const handleAddExpense = async (e) => {
		// alert(category)
		try {
			const token = localStorage.getItem("user");
			const response = await fetch(
				"http://localhost:3001/expenses/add-expense",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: token,
					},
					body: JSON.stringify({ amount, description, category }),
				}
			);

			if (!response.ok) {
				throw new Error("not working");
			}
			const newExpensee = await response.json();

			setExpenses([...expenses, newExpensee]);
		} catch (e) {
			console.log("err" + e.message);
		}
	};

	const handlePremium = async (e) => {
		e.preventDefault();
		const token = localStorage.getItem("user");
		const response = await fetch("http://localhost:3001/premium/get-premium", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: token,
			},
		});
		console.log(await response.json());
		// alert('nuttom clicked')
	};

	return (
		<>
			<form onSubmit={handleAddExpense}>
				<label htmlFor="amount">Enter amount</label>
				<input
					type="number"
					name="amount"
					id="amount"
					value={amount}
					onChange={(e) => setAmount(e.target.value)}
				/>
				<label htmlFor="description">Enter Description</label>
				<input
					type="text"
					id="description"
					name="description"
					placeholder="description"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
				/>
				<label htmlFor="category">Select Category</label>
				<select
					name="category"
					id="category"
					onChange={(e) => setCategory(e.target.value)}
				>
					<option value="food">Food</option>
					<option value="travel">Travel</option>
					<option value="shopping">Shopping</option>
					<option value="misc">Miscellaneous</option>
				</select>
				<button>Add Expenses</button>
			</form>
			<button onClick={handlePremium}>Buy Premium</button>
			<ul>
				{expenses.length <= 0 ? (
					<p>NO expenses</p>
				) : (
					expenses.map((exp) => (
						<div>
							<li key={exp.id}>
								Rs. {exp.amount} - {exp.description} -{" "}
								{exp.category}
							</li>
							<button onClick={() => handleDelete(exp.id)}>
								Delete
							</button>
						</div>
					))
				)}
			</ul>
		</>
	);
};

export default ExpenseForm;
