import { useState, useEffect } from "react";
import "./mainSection.css"
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
				await fetch(`http://localhost:3001/delete-group/${gId}`, {
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
						Authorization: localStorage.getItem("user"),
					},
				});
				

			}catch(err) {
				console.log(err)
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

	const handleMakeAdmin = async (email,gId) => {
		try {
			const res = await fetch("http://localhost:3001/make-admin", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: localStorage.getItem("user"),
				},
				body: JSON.stringify({email,gId}),
			});
			const data = await res.json();
			if(res.ok) {
				alert(`${email} ${data.message}`);
			}
		}catch(err) {
			console.log(err)
		}
	}

	const handleRemoveUser = async(email,gId) => {
		if(window.confirm(`Are you user you want to remove ${email}`)) {
			try {
				const res = await fetch("http://localhost:3001/delete-user", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: localStorage.getItem("user"),
					},
					body: JSON.stringify({email,gId}),
				});
				const data = await res.json();
				if(res.ok) {
					alert(`${email} ${data.message}`);
				}
			}catch(err) {
				console.log(err)
			}
		}
	}

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
		} catch (err) {}
	};
	return (
		<div className="group-list-container">
			<form onSubmit={handleCreateGroup} className="create-group">
				<input
					type="text"
					value={newGroupName}
					onChange={(e) => setNewGroupName(e.target.value)}
					className="create-group-input"
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
						<button onClick={() => handleShowUser(group.id)}>
							Show Users {group.id}
						</button>
						<button onClick={() => handleEnterChat(group.id)}>
							Enter Chat
						</button>
						<button onClick={() => handleDeleteGroup(group.id)}>
							Delete Group
						</button>
					</li>
				);
			})}
			<hr />
			{users.map((user) => {
				return (
					<li key={user.groups[0].id}>
						<span>{user.groups[0].userGroup.userId}</span>
						<span>{user.name}</span>
						<span>{user.email}</span>
						<span>
							{String(user.groups[0].userGroup.isAdmin) === "true"
								? "Admin"
								: "Participant"}
						</span>
						<button onClick={() => handleRemoveUser(user.email,user.groups[0].id )}>Remove</button>
						{/* change !== false to !== true */}
						{user.groups[0].userGroup.isAdmin !== false ? (
							<button onClick={() => handleMakeAdmin(user.email,user.groups[0].id )}>Make Admin</button>
						) : null}
					</li>
				);
			})}
		</div>
	);
};

export default GroupList;
