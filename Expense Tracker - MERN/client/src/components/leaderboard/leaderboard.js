
const LeaderBoard = (props) => {
    const {details} = props
    return (<div>
        {details.map((detail) => {
          return  <li key={detail._id}>{detail.name} - {detail.totalExpenses}</li>
        })}
    </div>)
}

export default LeaderBoard;