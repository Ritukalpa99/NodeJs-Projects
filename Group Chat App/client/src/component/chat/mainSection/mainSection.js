import GroupChat from "./groupChat";
// eslint-disable-next-line no-unused-vars
import GroupChatSocket from "./groupChatSocket";
import "./mainSection.css";
import GroupList from "./groupList";
import UserList from "./userList";

const MainSection = () => {
	return (
		<section className="main">
			<GroupList />

			<GroupChat />
			<UserList />
		</section>
	);
};

export default MainSection;
