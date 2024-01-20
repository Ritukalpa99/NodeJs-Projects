import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LeaderBoard from "../leaderboard/leaderboard";
import Expense from "./expenses";
import "./expenseForm.css"

const ExpenseForm = () => {
	const [expenses, setExpenses] = useState([]);
	const [amount, setAmount] = useState(0);
	const [description, setDescription] = useState("");
	const [category, setCategory] = useState("");
	const [isPremium, setIsPremium] = useState(false);
	const [showLeaderboard, setShowLeaderboard] = useState(false);
	const [leaderboard, setLeaderboard] = useState([]);
	const [reports, setReport] = useState([]);

	const navigate = useNavigate();

	function parseJwt(token) {
		var base64Url = token.split(".")[1];
		var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
		var jsonPayload = decodeURIComponent(
			window
				.atob(base64)
				.split("")
				.map(function (c) {
					return (
						"%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)
					);
				})
				.join("")
		);

		return JSON.parse(jsonPayload);
	}

	useEffect(() => {
		const token = localStorage.getItem("user");
		const isPrem = parseJwt(token).isPremiumuser;

		const fetchData = async () => {
			try {
				const response = await fetch("http://localhost:3001/expenses", {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						"Authorization": localStorage.getItem("user"),
					},
				});

				if (!response.ok) {
					throw new Error("Error fetching expenses");
				}
				const data = await response.json();
				setExpenses(data);

				setIsPremium(isPrem);
			} catch (err) {
				console.error("Error fetching expense", err.message);
			}
		};
		fetchData();
	}, []);

	const handleDelete = async (id, amount) => {
		try {
			// const token = localStorage.getItem("user");
			const response = await fetch(
				`http://localhost:3001/expenses/delete-expense/${id}:${amount}`,
				{
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
						"Authorization": localStorage.getItem("user"),
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
			// const token = localStorage.getItem("user");
			const response = await fetch(
				"http://localhost:3001/expenses/add-expense",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						"Authorization": localStorage.getItem("user"),
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

	const handleReport = async (e) => {
		e.preventDefault();
		if(!isPremium) {
			alert('You are not a premium User');
			return;
		}
		try {
			// const token = localStorage.getItem("user");
			const response = await fetch(
				"http://localhost:3001/expenses/get-reports",
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						"Authorization": localStorage.getItem("user"),
					},
				}
			);

			if (!response.ok) {
				throw new Error("Error fetching expenses");
			}
			const data = await response.json();
			setReport(data);
		} catch (err) {
			console.error(err.message);
		}
	};

	const handlePremium = async (e) => {
		// const token = localStorage.getItem("user");
		const response = await fetch(
			"http://localhost:3001/premium/get-premium",
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					"Authorization": localStorage.getItem("user"),
				},
			}
		);
		const data = await response.json();
		// console.log(data.orderId);
		// alert(data.orderId, data.key_id);
		if (data) {
			// alert('its working')
			var options = {
				key: data.key_id,
				order_id: data.orderId,
				handler: async function (response) {
					const callResponse = await fetch(
						"http://localhost:3001/premium/update-transaction",
						{
							method: "POST",
							headers: {
								"Content-Type": "application/json",
								"Authorization": localStorage.getItem("user"),
							},
							body: JSON.stringify({
								order_id: options.order_id,
								payment_id: response.razorpay_payment_id,
							}),
						}
					);
					const tokenData = await callResponse.json();
					// console.log(tokenData);
					localStorage.setItem("user", tokenData.token);
					alert("You are a Premium User");
					setIsPremium(true);
				},
			};
			const rzp1 = new window.Razorpay(options);
			rzp1.on("payment.failed", function (response) {
				alert(response.err.code);
				console.log(response);
			});
			rzp1.open();
			e.preventDefault();
		}
	};

	const handleLogout = () => {
		localStorage.removeItem('user');
		navigate('/');
	}

	const handleLeaderboard = async (e) => {
		e.preventDefault();
		setShowLeaderboard((prev) => !prev);
		try {
			const response = await fetch(
				"http://localhost:3001/premium/leaderboard",
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				}
			);

			if (!response.ok) {
				throw new Error("Error fetching expenses");
			}
			const data = await response.json();
			setLeaderboard(data);
		} catch (err) {
			console.error("Error fetching expense", err.message);
		}
	};

	const handleDownload = async () => {
		// const token = localStorage.getItem("user");
		try {
			if(!isPremium) {
				alert('You are not a premium user');
				return;
			}
			const response = await fetch(
				"http://localhost:3001/expenses/download-expenses",
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						"Authorization": localStorage.getItem("user"),
					},
				}
			);

			if (response.status === 201) {
				const data = await response.json();

				const a = document.createElement("a");
				a.href = data.fileURL;
				a.download = "myexpense.csv";
				a.click();
			} else {
				throw new Error((await response.json()).message);
			}
		} catch (err) {
			console.log(err);
		}
	};
	return (
		<div className="main-expense-body">
			<button onClick={handleLogout} className="btn-logout">Logout</button>
			<div className="expense-form">
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
				{isPremium ? (
					<p> You are a premium User</p>
				) : (
					<button onClick={handlePremium}>Buy Premium</button>
				)}
			</div>
			<button onClick={handleDownload}>Download Expense</button>
			<div>
				<Expense expenses={expenses} onHandleDelete={handleDelete}/>
			</div>
			<div>
				<button onClick={handleReport}>Show Report</button>
				{reports
					? reports.map((report) => {
							const { createdAt } = report;
							const date = new Date(createdAt).toLocaleString(
								undefined,
								{ timeZone: "Asia/Kolkata" }
							);
							return (
								<li id={report.id}>
									<a href={report.fileUrl}>{date}</a>
								</li>
							);
					  })
					: null}
			</div>
			<div>
				{isPremium ? (
					<div>
						<button onClick={handleLeaderboard}>
							{showLeaderboard
								? "Hide LeaderBoard"
								: "Show LeaderBoard"}
						</button>
						{showLeaderboard ? (
							leaderboard ? (
								<LeaderBoard details={leaderboard} />
							) : (
								<p>"loading" </p>
							)
						) : null}
					</div>
				) : null}
			</div>
		</div>
	);
};

export default ExpenseForm;
