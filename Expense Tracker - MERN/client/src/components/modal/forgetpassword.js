import "./forgetpassword.css";
import { useState } from "react";

const ForgotPassword = ({ closeModal }) => {
	const [email, setEmail] = useState("");

	const handleCross = () => {
		closeModal();
	};

	const handleSubmut = async(e) => {
		e.preventDefault();
		try {
			const res = await fetch("http://localhost:3001/password/forgot-password",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({email}),
			})
			if(res.ok) {
				alert('Reset email successfully sent')
			}
		}catch(err) {
			console.log(err);
		}
	};
	return (
		<div className="main-div">
			<div className="content">
				<h1> Reset Password form</h1>
				<form onSubmit={handleSubmut}>
					<label htmlFor="email" className="form-label">
						Enter Email
					</label>
					<input
						id="email"
						name="email"
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className="form-input"
					/>
					<button type="submit" className="form-button">Send Resend Link</button>
				</form>
			</div>
			<button onClick={handleCross} className="cross">
				x
			</button>
		</div>
	);
};

export default ForgotPassword;
