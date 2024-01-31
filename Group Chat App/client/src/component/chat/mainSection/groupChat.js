import { useState, useEffect } from "react";

const GroupChat = () => {
	const [localMsg, setLocalMsg] = useState(
		JSON.parse(localStorage.getItem("localMsg")) || []
	); // Might have errors for how we're init localMsg
	const [message, setMessage] = useState("");
	const groupId = localStorage.getItem("groupId");
	const [file, setFile] = useState(null);

	useEffect(() => {
		let lastId = 0;
		if (localMsg.length !== 0) {
			lastId = localMsg[localMsg.length - 1].id;
		}
		const fetchMessages = async () => {
			if (localStorage.getItem("groupId") !== null) {
				const res = await fetch(
					`http://localhost:3001/get-message?id=${lastId}&gId=${groupId}`,
					{
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							Authorization: localStorage.getItem("user"),
						},
					}
				);
				const data = await res.json();
				if (res.ok) {
					let retrievedMsg = localMsg.concat(data.chat);

					if (retrievedMsg.length > 100) {
						retrievedMsg = retrievedMsg.slice(
							retrievedMsg.length - 100
						);
					}
					localStorage.setItem(
						"localMsg",
						JSON.stringify(retrievedMsg)
					);

					setLocalMsg(retrievedMsg);
				}
			}
		};
		fetchMessages();
	}, [groupId, localMsg.length]);

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

	const handleFileUpload = async (e) => {
		e.preventDefault();

		if (!file) {
			alert("Please choose an image");
			return;
		}
		const formData = new FormData();
		formData.append("image", file);
		try {
			const res = await fetch("http://localhost:3001/upload", {
				method: "POST",
				headers: {
					Authorization: localStorage.getItem("user"),
				},
				body: formData,
			});
			if (res.status === 200) {
				const data = await res.json();

				const a = document.createElement("a");
				a.href = data.fileURL;
				a.download = "file";
				a.click();
			} else {
				throw new Error((await res.json()).message);
			}
		} catch (err) {
			console.log(err);
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
				<button type="submit">Send</button>
			</form>
			<form encType="multipart/form-data" onSubmit={handleFileUpload}>
				<input
					type="file"
					name="file"
					onChange={(e) => setFile(e.target.files[0])}
					required
				/>
				<button type="submit">Send File</button>
			</form>
		</div>
	);
};

export default GroupChat;
