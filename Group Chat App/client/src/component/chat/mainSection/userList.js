import { useState, useEffect } from "react";
import "./mainSection.css";

const UserList = () => {
	const [userList, setUserList] = useState([]);
	const [searchQuery, setSearchQuery] = useState("");
    const [isAdminCheck, setIsAdminCheck] = useState(false);

	useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await fetch('http://localhost:3001/get-users', {
                    method : "GET",
                    headers : {
                        "Content-Type": "application/json",
					Authorization: localStorage.getItem("user"),
                    }
                })
                const data = await res.json();
                if(res.ok) {
                    // console.log(data.user);
                    setUserList(data.user)
                }
            }catch(err) {
                console.log(err)
            }
        }
        fetchUsers();
    },[]);

	const handleAddingUser = async (user) => {
		if (localStorage.getItem("groupId") == null) {
			return alert("Please select a group first");
		}
		const obj = {
			email: user.email,
			groupId: localStorage.getItem("groupId"),
			isAdmin: isAdminCheck,
		};
		try {
			await fetch(`http://localhost:3001/add-user`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: localStorage.getItem("user"),
				},
				body: JSON.stringify(obj),
			});
		} catch (err) {}
	};
	const filteresUsers = userList.filter(
		(user) =>
			user.name.toLowerCase().includes(searchQuery) ||
			user.email.toLowerCase().includes(searchQuery)
	);

	return (
		<div className="user-list-container">
			<h2> User List</h2>
			<div>
				<span>Name</span>
				<span>Email</span>
			</div>
			<hr />
			<input
				type="search"
				placeholder="filter"
				onChange={(e) => setSearchQuery(e.target.value.toLowerCase())}
			/>
			<div className="user-list">
				{filteresUsers.map((user) => (
					<div key={user.id}>
						<span>{user.name}</span>
						<span>{user.email}</span>
                        <input type="checkbox" checked={isAdminCheck} onChange={(e) => setIsAdminCheck(e.target.checked)}/>
						<button onClick={() => handleAddingUser(user)}>
							Add
						</button>
					</div>
				))}
			</div>
		</div>
	);
};

export default UserList;
