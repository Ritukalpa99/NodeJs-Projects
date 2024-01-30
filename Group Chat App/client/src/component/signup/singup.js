import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phoneNo, setPhoneNo] = useState("");
	const [password, setPassword] = useState("");
	const [isLogin, setIsLogin] = useState(false);

    const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			let url = "http://localhost:3001/user/login";
			const formData = {
				email: email,
				password: password,
			};

			if (!isLogin) {
				url = "http://localhost:3001/user/signup";
				formData.name = name;
				formData.phoneNo = phoneNo;
			}
			const res = await fetch(url, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});

			const data = await res.json();
			if (res.ok) {
				if (isLogin) {
					alert("User successfully logged in");
                    localStorage.setItem('user', data.token);
					localStorage.setItem('username', data.username);
					localStorage.setItem('userId', data.userId);
					// localStorage.setItem('localMsg', []);
					// localStorage.setItem('lastId', "0");
                    navigate('/chat')
				} else {
					alert("User registered");
					setIsLogin(true);
				}
				setName("");
				setEmail("");
				setPassword("");
				setPhoneNo("");
			} else {
				alert(data.message);
			}
		} catch (err) {
			console.error(err.message);
		}
	};

	return (
		<>
			<h1>{!isLogin ? "Sign Up Page" : "Login Page"}</h1>
			<form onSubmit={handleSubmit}>
				{!isLogin && (
					<>
						<label htmlFor="name">Enter name</label>
						<input
							id="name"
							name="name"
							value={name}
							onChange={(e) => setName(e.target.value)}
							type="text"
							required
						/>
				<br />
				<br />
					</>
				)}
				<label htmlFor="email">Enter email</label>
				<input
					id="email"
					name="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					type="email"
					required
				/>
				<br />
				<br />
				{!isLogin && (
					<>
						<label htmlFor="phone">Enter phone number</label>
						<input
							id="phone"
							name="phone"
							value={phoneNo}
							onChange={(e) => setPhoneNo(e.target.value)}
							type="tel"
							pattern="[0-9]{10}"
							required
						/>
				<br />
				<br />
					</>
				)}
				<label htmlFor="password">Enter password</label>
				<input
					id="password"
					name="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					type="password"
					required
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
			</form>
		</>
	);
};

export default Signup;
