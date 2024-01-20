import { useState } from "react";

const Chat = () => {

    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        // alert(message)
        try {
            const res = await fetch('http://localhost:3001/chat/post-message', {
                method : "POST",
                headers : {
                    "Content-Type": "application/json",
                    Authorization : localStorage.getItem('user'),
                },
                body : JSON.stringify({message}),
            })
            if(res.ok) {
                alert('sent')
            }else {
                throw new Error('something went wrong')
            }
        }catch(err) {
            console.error(err.message)
        }
    }

	return (
		<>
			<h1>Chat App</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="enter your message"/>
                <button type="submit">Send</button>
            </form>
		</>
	);
};

export default Chat;
