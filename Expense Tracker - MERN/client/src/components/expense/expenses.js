import { useState } from "react"
import Pagination from "../pagination/pagination";
import "./expenses.css"

const Expense = ({expenses,onHandleDelete}) => {

    const [currentPage, setCurrentPage] = useState(1);
    const [expensesPerPage, setExpensesPerPage] = useState(5);

    const handleDelete = (id,amount) => {
        onHandleDelete(id,amount)
    }

    const indexOfLastExpense = currentPage * expensesPerPage;
    const indexOfFirstExpense = indexOfLastExpense - expensesPerPage;
    const currentExpense = expenses.slice(indexOfFirstExpense, indexOfLastExpense);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
    }
    return (<>
    <ul>
					{expenses.length <= 0 ? (
						<p>NO expenses</p>
					) : (
						currentExpense.map((exp) => (
							<div className="list-expenses">
								<li key={exp.id}>
									Rs. {exp.amount} - {exp.description} -{" "}
									{exp.category}
								</li>
								<button className="list-delete-btn"
									onClick={() =>
										handleDelete(exp.id, exp.amount)
									}
								>
									Delete
								</button>
							</div>
						))
					)}
				</ul>
                <label htmlFor="page">Pages Per Row</label>
					<select
						name="page"
						id="page"
						onChange={(e) => setExpensesPerPage(Number(e.target.value))}
					>
						<option value="5">5</option>
						<option value="10">10</option>
						<option value="15">15</option>
					</select>
                <Pagination expensePerPage={expensesPerPage} totalExpeses={expenses.length} paginate={paginate}/>
    </>)
}

export default Expense;