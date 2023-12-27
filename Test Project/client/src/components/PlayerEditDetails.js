import { useState } from "react";

const PlayerEditDetails = ({ playerData }) => {
	const [updatedPlayerData, setUpdatedPlayerData] = useState(playerData);

	const handleUpdate =  async(e) => {
        e.preventDefault();
        try {
			const response = await fetch(`http://localhost:3001/players/${updatedPlayerData.id}`, {
				method : 'PUT',
				headers : {
					'Content-Type' : 'application/json'
				},
				body : JSON.stringify(updatedPlayerData)
			})
			if(response.ok) {
				alert("Details upadted successfully")
			}
			
		} catch(err) {
			console.error('Error Updating Player: ', err.message);
		}
    };
	const handleChange = (e) => {
		const { name, value } = e.target;
		setUpdatedPlayerData((prevValues) => ({
			...prevValues,
			[name]: value,
		}));
	};

	return (
		<>
			<form>
				<label htmlFor="name">Name:</label>
				<input
					type="text"
					id="name"
					name="name"
					value={updatedPlayerData.name}
					onChange={handleChange}
					required
				/>
				<br />
				<br />
				<label htmlFor="dob">Date of Birth:</label>
				<input
					type="text"
					id="dob"
					name="dob"
					value={updatedPlayerData.dob}
					onChange={handleChange}
					required
				/>
				<br />
				<br />
				<label htmlFor="photoUrl">Photo URL:</label>
				<input
					type="text"
					id="photoUrl"
					name="photoUrl"
					value={updatedPlayerData.photoUrl}
					onChange={handleChange}
				/>
				<br />
				<br />
				<label htmlFor="birthplace">Birthplace:</label>
				<input
					type="text"
					id="birthplace"
					name="birthplace"
					value={updatedPlayerData.birthplace}
					onChange={handleChange}
				/>
				<br />
				<br />
				<label htmlFor="career">Career :</label>
				<textarea
					id="career"
					name="career"
					value={updatedPlayerData.career}
					onChange={handleChange}
				/>
				<br />
				<br />
				<label htmlFor="matches">matches:</label>
				<input
					type="text"
					id="matches"
					name="matches"
					value={updatedPlayerData.matches}
					onChange={handleChange}
				/>
				<br />
				<br />
				<label htmlFor="score">score:</label>
				<input
					type="text"
					id="score"
					name="score"
					value={updatedPlayerData.score}
					onChange={handleChange}
				/>
				<br />
				<br />
				<label htmlFor="fifties">fifties:</label>
				<input
					type="text"
					id="fifties"
					name="fifties"
					value={updatedPlayerData.fifties}
					onChange={handleChange}
				/>
				<br />
				<br />
				<label htmlFor="centuries">centuries:</label>
				<input
					type="text"
					id="centuries"
					name="centuries"
					value={updatedPlayerData.centuries}
					onChange={handleChange}
				/>
				<br />
				<br />
				<label htmlFor="wickets">wickets:</label>
				<input
					type="text"
					id="wickets"
					name="wickets"
					value={updatedPlayerData.wickets}
					onChange={handleChange}
				/>
				<br />
				<br />
				<label htmlFor="average">average:</label>
				<input
					type="text"
					id="average"
					name="average"
					value={updatedPlayerData.average}
					onChange={handleChange}
				/>
				<br />
				<br /> 
				<button type="button" onClick={handleUpdate}>Update</button>
			</form>
		</>
	);
};

export default PlayerEditDetails;
