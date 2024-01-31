import { useState, useEffect } from "react";
import io from "socket.io-client";

const GroupChatSocket = () => {
	const [message, setMessage] = useState("");
	const [messageReceived, setMessageReceived] = useState([]);

	const socket = io("http://localhost:3333");
	// useEffect(() => {
    //     console.log('i fire once');
	// 	socket.on("message", (newMessage) => {
	// 		console.log(newMessage);
	// 		setMessageReceived((prev) => {
	// 			return [...prev, newMessage];
	// 		});
	// 	});
		
	// }, []);

//      useEffect(() => {
//     const handleReceive = async (data) => {
//       try {
//         if (groupId === data) {
//           const newMessages = await axios.get(`/new-messages/?groupId=${groupId}&lastMsgId=${lastMsgId}`);
//           setLastMsgId(newMessages.data[newMessages.data.length - 1].id);
//           newMessages.data.forEach((elem) => {
//             display(elem);
//           });
//         }
//       } catch (err) {
//         alert('something went wrong!!!');
//       }
//     };

//     // Subscribe to socket event
//     socket.on('receive', handleReceive);

//     // Clean up socket subscription on component unmount
//     return () => {
//       socket.off('receive', handleReceive);
//     };
//   }, [groupId, lastMsgId]);

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
