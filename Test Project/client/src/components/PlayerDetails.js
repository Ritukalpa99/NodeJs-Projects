import { useState } from "react";
import PlayerEditDetails from "./PlayerEditDetails";

const PlayerDetails = ({ playerData }) => {
	const [toggleEdit, setToggleEdit] = useState(false);

	const handleToggle = () => {
		setToggleEdit((prev) => !prev);
	};

	return (
		<div>
			{playerData ? (
				<div>
					<button onClick={handleToggle}>{toggleEdit ? <span>Hide Edit options </span>: <span>Show edit options</span>}</button>
					{toggleEdit ? (
						<PlayerEditDetails playerData={playerData}/>
					) : (
						<div>
							<h2>Player Details</h2>
							<p>Name: {playerData.name}</p>
							<p>Date of Birth: {playerData.dob}</p>
							<div>
								<img
									src={playerData.photoUrl}
									alt={playerData.name}
								/>
							</div>
							<p>Birthplace: {playerData.birthplace}</p>
							<p>Career: {playerData.career}</p>
							<p>matches: {playerData.matches}</p>
							<p>score : {playerData.score}</p>
							<p>fifties : {playerData.fifties}</p>
							<p>centuries: {playerData.centuries}</p>
							<p>wickets: {playerData.wickets}</p>
							<p>average: {playerData.average}</p>
						</div>
					)}
				</div>
			) : (
				<p>No player data available</p>
			)}
		</div>
	);
};

export default PlayerDetails;
