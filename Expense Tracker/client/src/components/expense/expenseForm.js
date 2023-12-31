import { useState, useEffect } from "react";

const ExpenseForm = () => {
	const [expenses, setExpenses] = useState([]);
	const [amount, setAmount] = useState(0);
	const [description, setDescription] = useState("");
	const [category, setCategory] = useState("");

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch("http://localhost:3001/expenses");

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

	const handleAddExpense = async (e) => {
        // alert(category)
		try {
			const response = await fetch(
				"http://localhost:3001/expenses/add-expense",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ amount, description ,category }),
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
				<select name="category" id="category" onChange={(e) => setCategory(e.target.value)}>
					<option value="food">Food</option>
					<option value="travel">Travel</option>
					<option value="shopping">Shopping</option>
					<option value="misc">Miscellaneous</option>
				</select>
				<button>Add Expenses</button>
			</form>
            <ul>
				{expenses.length <= 0 ? (
					<p>NO expenses</p>
				) : (
					expenses.map((exp) => (
						<li key={exp.id}>
							Rs. {exp.amount} - {exp.description} - {exp.category} 
						</li>
					))
				)}
			</ul>
		</>
	);
};

export default ExpenseForm;
