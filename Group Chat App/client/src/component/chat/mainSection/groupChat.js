import { useState, useEffect } from "react";

const GroupChat = () => {
	const [localMsg, setLocalMsg] = useState(
		JSON.parse(localStorage.getItem("localMsg")) || []
	); // Might have errors for how we're init localMsg
	const [message, setMessage] = useState("");
	const [lastId, setLastId] = useState(0);
	const groupId = localStorage.getItem("groupId");
    

    useEffect(() => {
        if(localMsg.length === 0) {
            setLastId(0);
        }else {
            setLastId(localMsg[localMsg.length - 1].id);
        }
        const fetchMessages = async () => {
            if(localStorage.getItem('groupId') !== null) {
                const res = await fetch(`http://localhost:3001/get-message?id=${lastId}&gId=${groupId}`);
                const data = await res.json();
                if(res.ok) {
                    let retrievedMsg =  localMsg.concat(data.chat);

                    if(retrievedMsg.length > 100) {
                        retrievedMsg = retrievedMsg.slice(retrievedMsg.length - 100);
                    }
                    localStorage.setItem('localMsg', JSON.stringify(retrievedMsg));

                    setLocalMsg(retrievedMsg)
                }
            }
        }
        fetchMessages();
    },[groupId,lastId, localMsg])

	const handleSendGroupMsg = async (e) => {
		e.preventDefault();
		if (localStorage.getItem("groupId") === null) {
			alert("Select a group first");
		} else {
			const obj = {
				message,
				username: localStorage.getItem("username"),
				groupId: localStorage.getItem("groupId"),
			};
			try {
				await fetch("http://localhost:3001/post-message", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: localStorage.getItem("user"),
					},
					body: JSON.stringify(obj),
				});
			} catch (err) {
				console.log(err);
			}
		}
	};

	return (
		<div>
			<h2>Group Chat</h2>
			<div className="message-container">
				{localMsg.map((chat) => (
					<div key={chat.id}>
						<span>
							<b>{chat.username}</b>
						</span>
						<span>{chat.message}</span>
					</div>
				))}
			</div>
			<form onSubmit={handleSendGroupMsg}>
				<input
					type="text"
					placeholder="type your message"
					value={message}
					onChange={(e) => setMessage(e.target.value)}
				/>
				<button type="submiy">Send</button>
			</form>
		</div>
	);
};

export default GroupChat;
