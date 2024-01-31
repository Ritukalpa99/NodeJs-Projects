import GroupChat from "./groupChat";
import GroupChatSocket from "./groupChatSocket";
import "./mainSection.css"
import GroupList from "./groupList";
import UserList from "./userList";
import { useState, useEffect } from "react";

const MainSection = () => {
	const [currentGroup, setCurrentGroup] = useState(1); // change to null

	useEffect(() => {
		const groupId = localStorage.getItem("groupId");
		if (groupId) {
			setCurrentGroup(groupId);
		}
	}, []);

	return (
		<section className="main">
			<GroupList/>

			<GroupChat />
			<UserList />
		</section>
	);
};

export default MainSection;
