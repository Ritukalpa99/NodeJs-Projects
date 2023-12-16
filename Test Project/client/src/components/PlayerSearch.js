import { useState } from "react";
import PlayerDetails from "./PlayerDetails";

const PlayerSearch = () => {
    const [searchName, setSearchName] = useState('');
    const [playerData, setPlayerData] = useState('');

    const handleSearch = async () => {
        try {
          const response = await fetch(`/players/${searchName}`);
    
          if (response.ok) {
            const data = await response.json();
            setPlayerData(data);
          } else {
            
            console.error('Failed to fetch player data');
          }
        } catch (err) {
          
          console.error(err.message);
        }
      };


    return (
        <>
        <input
        type="text"
        placeholder="Enter player name"
        value={searchName}
        onChange={(e) => setSearchName(e.target.value)}
      />
        <button onClick={handleSearch}>Search</button>
        <PlayerDetails playerData={playerData}/>
        </>
    )
}


export default PlayerSearch;