import GroupChat from "./groupChat";
import GroupList from "./groupList/groupList";
import UserList from "./userList";
import { useState, useEffect } from "react";

const MainSection = ({ onCreateGroup, onGroupChange }) => {
	const [currentGroup, setCurrentGroup] = useState(1); // change to null

	useEffect(() => {
		const groupId = localStorage.getItem("groupId");
		if (groupId) {
			setCurrentGroup(groupId);
		}
	}, []);

	const handleCreateGroup = (name) => {};

	const handleGroupChange = (groupId) => {
		onGroupChange(groupId);
		localStorage.setItem("groupId", groupId);
	};

	return (
		<section>
			<GroupList
				onCreateGroup={handleCreateGroup}
				onGroupChange={handleGroupChange}
			/>
			{currentGroup && (
				<>
					<GroupChat groupId={currentGroup} />
					<UserList groupId={currentGroup} />
				</>
			)}
		</section>
	);
};

export default MainSection;
