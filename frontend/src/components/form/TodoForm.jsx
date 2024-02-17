import { useState } from 'react'
import "./TodoForm.css"


const TodoForm = ({ createTodo }) => {
    const [value, setValue] = useState("")
    const [category, setCategory] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!value || !category) return;
        //adcionar todo
        createTodo(value, category);
        //limpar campos
        setValue("")
        setCategory("")

    }

    return (
        <div className="todo-form">

            <h2>Criar tarefa:</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Digite o título"
                    value={value}
                    onChange={(e) => setValue(e.target.value)} />

                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="">Selecione uma categoria</option>
                    <option value="Trabalho">Trabalho</option>
                    <option value="Pessoal">Pessoal</option>
                    <option value="Estudos">Estudos</option>
                    <option value="Outra">Outra</option>
                </select>
                <div className='btn-createTodo'>
                    <button type='submit'>Criar tarefa</button>
                </div>
            </form>
        </div>
    )
}

export default TodoForm