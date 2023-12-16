const PlayerDetails = ({ playerData }) => {
	return (
		<div>
			{playerData ? (
				<div>
					<h2>Player Details</h2>
					<p>Name: {playerData.name}</p>
					<p>Date of Birth: {playerData.dob}</p>
					<p>
						<img src={playerData.imageUrl} alt={playerData.name} />
					</p>
					<p>Birthplace: {playerData.birthplace}</p>
					<p>Career: {playerData.career}</p>
					<p>matches: {playerData.matches}</p>
					<p>score : {playerData.score}</p>
					<p>fifties : {playerData.fifties}</p>
					<p>centuries: {playerData.centuries}</p>
					<p>wickets: {playerData.wickets}</p>
					<p>average: {playerData.average}</p>
				</div>
			) : (
				<p>No player data available</p>
			)}
		</div>
	);
};

export default PlayerDetails;
