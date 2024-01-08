import "./forgetpassword.css"

const ForgotPassword = ({closeModal}) => {

    const handleCross = () => {
        closeModal()
    }

	return (
		<div className="main-div">
            <div className="content">
            <h1> Reset Password form</h1>
			<form>
				<label htmlFor="email" className="form-label">Enter Email</label>
				<input id="email" name="email" type="email" className="form-input"/>
				<button className="form-button">Send Resend Link</button>
			</form>
            </div>
            <button onClick={handleCross}className="cross">x</button>
		</div>
	);
};

export default ForgotPassword;
