import './Todo.css'
import { BsFillTrashFill } from 'react-icons/bs'

const Todo = ({ todo, removeTodo, completeTodo}) => {

    return (
        <div className={`todo ${todo.category.toLowerCase()}`}>
            <div className="content">
            <h3><span style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}>{todo.text}</span></h3>
                <p className={`${[todo.category.toLowerCase()]}`}>{todo.category}</p>
            </div>
            <div className='action-buttons'>
                <button className='complete' onClick={() => completeTodo(todo._id)}>Concluir</button>
                <button className='remove' onClick={() => removeTodo(todo._id)}><BsFillTrashFill /></button>
            </div>
        </div>
    )
}

export default Todo