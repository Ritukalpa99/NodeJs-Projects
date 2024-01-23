

const Header = ({username, currentGroup, onLogout}) => {
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
        <button onClick={onLogout}>Logout</button>
      </div>
        </section>
    )
}

export default Header;