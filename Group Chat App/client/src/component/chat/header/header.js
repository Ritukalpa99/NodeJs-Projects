import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [username] = useState(localStorage.getItem('username'));
  const [currentGroup] = useState((localStorage.getItem('groupName')) || "Select a Group");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  }

    return (
        <section>
            <div>
                <span>Logged in as :</span>
                <span>{username}</span>
            </div>
            <div>
        <span>Current Group:</span>
        <span>{currentGroup}</span>
      </div>
      <div>
        <button onClick={handleLogout}>Logout</button>
      </div>
        </section>
    )
}

export default Header;