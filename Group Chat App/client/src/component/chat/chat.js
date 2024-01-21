import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Chat = () => {
	const [message, setMessage] = useState("");
	const [chats, setChats] = useState();
	const navigate = useNavigate();

	const fetchChat = async () => {
		try {
			const res = await fetch("http://localhost:3001/chat/get-message", {
				headers: {
					"Content-Type": "application/json",
					Authorization: localStorage.getItem("user"),
				},
			});
			const data = await res.json();
			if (res.ok) {
				setChats(data);
			}
		} catch (err) {
			console.error(err);
		}
	};
    setInterval(fetchChat, 1000);
	useEffect(() => {
		fetchChat();
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		// alert(message)
		try {
			const res = await fetch("http://localhost:3001/chat/post-message", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: localStorage.getItem("user"),
				},
				body: JSON.stringify({ message }),
			});
			// const data = await res.json();
			if (!res.ok) {
				throw new Error("something went wrong");
			} else {
			}
			setMessage("");
		} catch (err) {
			console.error(err.message);
		}
	};
	const handleLogout = () => {
		localStorage.removeItem("user");
		navigate("/");
	};

	return (
		<>
			<h1>Chat App</h1>
			<button onClick={handleLogout}>Logout</button>
			<br />
			<br />
			<br />
			{/* {console.log(chats)} */}
			{chats &&
				chats.map((chat) => {
					return (
						<li key={chat.id}>
							{chat.username} : {chat.message}
						</li>
					);
				})}
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					value={message}
					onChange={(e) => setMessage(e.target.value)}
					placeholder="enter your message"
				/>
				<button type="submit">Send</button>
			</form>
		</>
	);
};

export default Chat;
