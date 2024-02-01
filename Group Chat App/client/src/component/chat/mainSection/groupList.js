import { useState, useEffect } from "react";
import "./mainSection.css";
const GroupList = () => {
	const [groups, setGroups] = useState([]);
	const [newGroupName, setNewGroupName] = useState("");
	const [users, setUsers] = useState([]);

	useEffect(() => {
		const fetchGroups = async () => {
			try {
				const res = await fetch("http://localhost:3001/get-groups", {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
						Authorization: localStorage.getItem("user"),
					},
				});
				const data = await res.json();
				if (res.ok) {
					setGroups(data.groups);
				}
			} catch (err) {
				console.error(err);
			}
		};
		fetchGroups();
	}, []);

	const handleShowUser = async (gId) => {
		setUsers([]);
		const res = await fetch(`http://localhost:3001/get-users/?gId=${gId}`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: localStorage.getItem("user"),
			},
		});
		const data = await res.json();
		if (res.ok) {
			// console.log(data);
			setUsers(data);
		}
	};

	const handleDeleteGroup = async (gId) => {
		// alert("deleting group");
		if (window.confirm("are you sure?")) {
			try {
				const res = await fetch(
					`http://localhost:3001/delete-group/${gId}`,
					{
						method: "DELETE",
						headers: {
							"Content-Type": "application/json",
							Authorization: localStorage.getItem("user"),
						},
					}
				);
				const data = await res.json();
				if (res.ok) {
					alert(data.message);
					window.location.reload();
				}
			} catch (err) {
				console.log(err);
			}
		}
	};

	const handleEnterChat = async (gId) => {
		try {
			const res = await fetch(
				`http://localhost:3001/get-group-by-id/${gId}`,
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
				console.log(data.group[0]);
				// setUsers(data);
				localStorage.setItem("groupId", data.group[0].id);
				localStorage.setItem("groupName", data.group[0].name);
				localStorage.setItem("localMsg", "[]");
				window.location.reload(true);
			}
		} catch (err) {
			console.log(err);
		}
	};

	const handleMakeAdmin = async (email, gId) => {
		try {
			const res = await fetch("http://localhost:3001/make-admin", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: localStorage.getItem("user"),
				},
				body: JSON.stringify({ email, gId }),
			});
			const data = await res.json();
			if (res.ok) {
				alert(`${email} ${data.message}`);
				window.location.reload();
			} else {
				throw new Error(data.message);
			}
		} catch (err) {
			alert(err.message)
		}
	};

	const handleRemoveUser = async (email, gId) => {
		if (window.confirm(`Are you user you want to remove ${email}`)) {
			try {
				const res = await fetch("http://localhost:3001/delete-user", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: localStorage.getItem("user"),
					},
					body: JSON.stringify({ email, gId }),
				});
				const data = await res.json();
				if (res.ok) {
					alert(`${email} ${data.message}`);
					window.location.reload();
				} else {
					throw new Error(data.message)
				}
			} catch (err) {
				alert(err.message)
			}
		}
	};

	const handleCreateGroup = async (e) => {
		e.preventDefault();

		try {
			const res = await fetch("http://localhost:3001/create-group", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: localStorage.getItem("user"),
				},
				body: JSON.stringify({ name: newGroupName, isAdmin: true }),
			});
			const data = await res.json();
			if (res.ok) {
				setGroups((prev) => {
					return [...prev, data.group];
				});
				const groupId = data.group.id;
				localStorage.setItem("groupId", groupId);
			}
			setNewGroupName("");
		} catch (err) {}
	};
	return (
		<div className="group-list-container">
			<form onSubmit={handleCreateGroup}>
				<input
					type="text"
					value={newGroupName}
					onChange={(e) => setNewGroupName(e.target.value)}
					placeholder="Enter group name"
					required
				/>
				<button type="submit">Create</button>
			</form>
			<h2>Group List</h2>
			{groups.map((group) => {
				return (
					<li key={group.id}>
						<span>{group.name}</span>
						<button
							className="btn show-user-btn"
							onClick={() => handleShowUser(group.id)}
						>
							Show Users
						</button>
						<button
							className="btn enter-chat-btn"
							onClick={() => handleEnterChat(group.id)}
						>
							Enter Chat
						</button>
						<button
							className="btn danger"
							onClick={() => handleDeleteGroup(group.id)}
						>
							Delete Group
						</button>
					</li>
				);
			})}
			<hr />
			{users.map((user) => {
				return (
					<li key={user.groups[0].id}>
						<span className="userlist-span">{user.name}</span>
						<span className="userlist-span">{user.email}</span>
						<span className="userlist-span">
							{String(user.groups[0].userGroup.isAdmin) === "true"
								? "Admin"
								: "Participant"}
						</span>
						<button
							className="btn danger"
							onClick={() =>
								handleRemoveUser(user.email, user.groups[0].id)
							}
						>
							Remove
						</button>
						{user.groups[0].userGroup.isAdmin !== true ? (
							<button
								className="btn admin-btn"
								onClick={() =>
									handleMakeAdmin(
										user.email,
										user.groups[0].id
									)
								}
							>
								Make Admin
							</button>
						) : null}
					</li>
				);
			})}
		</div>
	);
};

export default GroupList;
