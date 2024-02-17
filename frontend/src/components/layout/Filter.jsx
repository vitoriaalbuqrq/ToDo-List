const Filter = ({filter, setFilter, setSort}) => {
    return (
        <div className="filter">
            <div className="filter-options">
                <div>
                    <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                        <option value="All">Todas</option>
                        <option value="Completed">Concluídas</option>
                        <option value="Incomplete">Incompletas</option>
                    </select>
                </div>
                <div className="sort">
                    <button onClick={() => setSort("Asc")}>Asc</button>
                    <button onClick={() => setSort("Desc")}>Desc</button>
                </div>
            </div>
        </div>
    )
}

export default Filter