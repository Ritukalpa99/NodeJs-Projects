import "./pagination.css"

const Pagination = ({expensePerPage, totalExpeses, paginate}) => {
    const pageNumebers = [];

    for(let i = 1; i <= Math.ceil(totalExpeses/expensePerPage); i++) {
        pageNumebers.push(i);
    }
    return (<nav>
        <ul>
           {pageNumebers.map(number => (
            <li className="page-num" key={number}>
                <button onClick={() =>paginate(number)} className="page-link">
                    {number}
                </button>
            </li>
           ))} 
        </ul>
    </nav>)
}

export default Pagination