import { useState } from "react";

const GroupFrom = ({onSubmit}) => {

    const [groupName, setGroupName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (groupName) {
      onSubmit(groupName);
      setGroupName(''); 
    }
  };

    return (<form onSubmit={handleSubmit}>
        <input type="text" placeholder="Enter group name" value={groupName} onChange={(e) => setGroupName(e.target.value)}/>
        <button type="submit">Create Group</button>
    </form>)
}

export default GroupFrom;