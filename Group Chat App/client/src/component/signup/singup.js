import { useState } from "react";

const Signup = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phoneNo, setPhoneNo] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = async(e) => {
		e.preventDefault();

        const res = await fetch('http://localhost:3001/user/signup', {
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({name, email, password, phoneNo})
        })
        // alert('Successfully submitted')
        if(res.ok) {
            alert('User registered');
        }

		setName("");
		setEmail("");
		setPassword("");
		setPhoneNo("");
	};

	return (
		<>
			<form onSubmit={handleSubmit}>
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
				<button>Submit</button>
			</form>
		</>
	);
};

export default Signup;
