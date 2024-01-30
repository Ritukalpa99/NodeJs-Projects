import GroupChat from "./groupChat";
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
		<section>
			<GroupList/>
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