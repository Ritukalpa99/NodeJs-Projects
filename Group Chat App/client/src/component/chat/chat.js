import Header from "./header/header";
import MainSection from "./mainSection/mainSection";

const Chat = () => {


	// const fetchChat = async () => {
	// 	try {
	// 		const res = await fetch("http://localhost:3001/chat/get-message", {
	// 			headers: {
	// 				"Content-Type": "application/json",
	// 				Authorization: localStorage.getItem("user"),
	// 			},
	// 		});
	// 		const data = await res.json();
	// 		if (res.ok) {
	// 			setChats(data);
	// 		}
	// 	} catch (err) {
	// 		console.error(err);
	// 	}
	// };
    

	return (
		<>
			<h1>Chat App</h1>
			<Header />
			<MainSection/>
		</>
	);
};

export default Chat;
