import { useState, useEffect } from "react";

const GroupList = () => {
	const [groups, setGroups] = useState([]);
	const [newGroupName, setNewGroupName] = useState("");

	useEffect(() => {
		const fetchGroups = async () => {
			try {

				const res = await fetch('http://localhost:3001/get-groups', {
					method : "GET",
					headers : {
						"Content-Type" : 'application/json',
						Authorization : localStorage.getItem('user'),
					}
				})
				const data = await res.json();
				if(res.ok) {
					
					setGroups(data.groups);
				}
			}catch(err) {
				console.error(err);
			}
		}
		fetchGroups();
	},[])
	const handleCreateGroup = async (e) => {
		e.preventDefault();

		try {
			const res = await fetch('http://localhost:3001/create-group', {
				method : "POST",
				headers : {
					"Content-Type" : "application/json",
					Authorization : localStorage.getItem('user'),
				},
				body : JSON.stringify({name : newGroupName, isAdmin : true})
			})
			const data = await res.json();
			if(res.ok) {
				setGroups((prev) => {
					return [...prev, data.group]
				})
				const groupId = data.group.id;
				localStorage.setItem('groupId', groupId);
			}
		} catch (err) {}
	};
	return (
		<div>
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
						<button>Show Users</button>
						<button>Enter Chat</button>
						<button>Delete Group</button>
					</li>
				);
			})}
		</div>
	);
};

export default GroupList;
