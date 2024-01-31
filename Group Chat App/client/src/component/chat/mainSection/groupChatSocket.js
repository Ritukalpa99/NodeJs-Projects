import { useState, useEffect } from "react";
import io from "socket.io-client";

const GroupChatSocket = () => {
	const [message, setMessage] = useState("");
	const [messageReceived, setMessageReceived] = useState([]);

	const socket = io("http://localhost:3333");
	useEffect(() => {
        console.log('i fire once');
		socket.on("message", (newMessage) => {
			console.log(newMessage);
			setMessageReceived((prev) => {
				return [...prev, newMessage];
			});
		});
		
	}, []);

	const handleSendGroupMsg = async (e) => {
		e.preventDefault();
		socket.emit("sendMessage", message);

		setMessage("");
	};

	return (
		<div>
			<h2>Group Chat</h2>

			<h1>Messages</h1>
			{messageReceived.map((msg) => {
				return <li>{msg}</li>;
			})}

			<form onSubmit={handleSendGroupMsg}>
				<input
					type="text"
					placeholder="type your message"
					value={message}
					onChange={(e) => setMessage(e.target.value)}
				/>
				<button type="submit">Send</button>
			</form>
		</div>
	);
};

export default GroupChatSocket;
