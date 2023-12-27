import PlayerForm from "./components/PlayerForm";
import PlayerSearch from "./components/PlayerSearch";
import { useState } from "react";
import "./App.css"

function App() {

  const [searchToggle, setSearchToggle] = useState(false);

  const handleToggle = () => {
    setSearchToggle((prev) => !prev);
  }
  return (
    <div className="App">
      <h1>Cricket Info</h1>
      {searchToggle ? <PlayerSearch/> : <PlayerForm/>}
      {searchToggle ? <button onClick={handleToggle}>Close Search Bar</button> : <button onClick={handleToggle}>Open Search Bar</button>}
      
    </div>
  );
}

export default App;
