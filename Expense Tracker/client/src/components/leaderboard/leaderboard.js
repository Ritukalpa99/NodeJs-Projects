
const LeaderBoard = (props) => {
    const {details} = props
    return (<div>
        {details.map((detail) => {
          return  <li>{detail.name} - {detail.total}</li>
        })}
    </div>)
}

export default LeaderBoard;