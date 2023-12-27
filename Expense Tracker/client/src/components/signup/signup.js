import { useState } from "react";

const Singup = () => {
	const [name, setName] = useState("");
	const [mail, setMail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
        // alert(`${name} ${mail} ${password}`)
        try {
            const formData = {
                'name' : name,
                'email' : mail,
                'password' : password,
            };
            await fetch(`http://localhost:3001/user/signup`, {
                method : "POST",
                headers : {
                    "Content-Type" : "application/json",
                },
                body : JSON.stringify(formData)
            });
        }
        catch(err) {
            console.error(err.message)
        }
	};

	return (
		<>
			<h1>Singup Page</h1>
			<form onSubmit={handleSubmit}>
				<label htmlFor="name">Enter Name</label>
				<input
					type="text"
					name="name"
					id="name"
					value={name}
					required
					onChange={(e) => setName(e.target.value)}
				/>{" "}
				<br />
				<br />
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
				<button type="submit">Singup</button>
			</form>
		</>
	);
};

export default Singup;
