import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ForgotPassword from "../modal/forgetpassword";

const Singup = () => {
	const [name, setName] = useState("");
	const [mail, setMail] = useState("");
	const [password, setPassword] = useState("");
	const [isLogin, setIsLogin] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const location = useLocation();

	const navigate = useNavigate();

	const crossModal = () => {
		setShowModal(false)
	}
	useEffect(() => {
		if(location.pathname === '/login') {
			setIsLogin(true);
		}

	},[])
	const handleSubmit = async (e) => {
		e.preventDefault();
		// alert(`${name} ${mail} ${password}`)
		try {
			let url = "http://localhost:3001/user/login";
			const formData = {
				email: mail,
				password: password,
			};
			if (!isLogin) {
				url = "http://localhost:3001/user/signup";
				formData.name = name;
			}
			const res = await fetch(url, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});
			if(res.ok) {
				if(isLogin) {
					alert('User successfully logged in')
					const data = await res.json();
					localStorage.setItem('user', data.token);
					navigate('/expenses');
				} else {
					alert('User registered');
					setIsLogin(true);
				}
				// console.log(data);
			}
		} catch (err) {
			console.error(err.message);
		}
		setName("");
		setMail("");
		setPassword("");
	};

	return (
		<>
		{showModal && 
		
			<ForgotPassword closeModal={crossModal}/>
		}
			<h1>{!isLogin ? "Sign Up Page" : "Login Page"}</h1>
			<form onSubmit={handleSubmit}>
				{!isLogin && (
					<div>
						<label htmlFor="name">Enter Name</label>
						<input
							type="text"
							name="name"
							id="name"
							value={name}
							required
							onChange={(e) => setName(e.target.value)}
						/>
						<br />
						<br />
					</div>
				)}
				<label htmlFor="mail">Enter Email</label>
				<input
					type="email"
					name="mail"
					id="mail"
					value={mail}
					required
					onChange={(e) => setMail(e.target.value)}
				/>
				
				<br />
				<br />
				<label htmlFor="password">Enter Password</label>
				<input
					type="password"
					name="password"
					id="password"
					value={password}
					required
					onChange={(e) => setPassword(e.target.value)}
				/>
				<br />
				<br />
				<button type="submit">Submit</button>
				<br />
				<br />
				<button
					type="button"
					onClick={() => setIsLogin((prev) => !prev)}
				>
					{isLogin
						? "New User ? Sign Up"
						: "Already Registered? Sign In"}
				</button>
				<br/><br/>
				{isLogin && (
					<button onClick={() => setShowModal(true)}>Forgot Password</button>
				)}
			</form>
		</>
	);
};

export default Singup;
