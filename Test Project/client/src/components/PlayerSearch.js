import { useState } from "react";
import PlayerDetails from "./PlayerDetails";

const PlayerSearch = () => {
    const [searchName, setSearchName] = useState('');
    const [playerData, setPlayerData] = useState('');

    const handleSearch = async (e) => {
      e.preventDefault();
        try {
          const response = await fetch(`http://localhost:3001/players/${searchName}`);
    
          if (response.ok) {
            const data = await response.json();
            console.log(data[0]);
            setPlayerData(data[0]);
            // alert(data);
          } else {
            // alert('inside else');
            console.error('Failed to fetch player data');
            
          }
        } catch (err) {
          // alert('inside catch' + err.message);
          console.error(err.message);
        }
      };


    return (
        <form onSubmit={handleSearch}>
        <input
        type="text"
        placeholder="Enter player name"
        value={searchName}
        onChange={(e) => setSearchName(e.target.value)}
      />
        <button type="submit">Search</button>
        <PlayerDetails playerData={playerData}/>
        </form>
    )
}


export default PlayerSearch;