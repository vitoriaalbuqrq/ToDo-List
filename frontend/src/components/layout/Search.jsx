import { IoIosSearch } from "react-icons/io";
const Search = ({ search, setSearch }) => {
    return (
        <div className="search">
            <IoIosSearch />
            <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Digite para pesquisar a tarefa..." 
                />
        </div>
    )
}

export default Search