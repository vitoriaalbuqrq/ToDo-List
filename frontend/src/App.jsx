import todoFetch from "./axios/config";
import { useEffect, useState } from 'react'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Todo from "./components/layout/Todo";
import TodoForm from "./components/form/TodoForm";
import Search from "./components/layout/Search";
import Filter from "./components/layout/Filter";
import Header from "./components/layout/Header";

import useToast from "../hooks/useToast";
import './App.css'

function App() {
  const [todos, setTodos] = useState(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [sort, setSort] = useState("Asc");
  const [showTodoForm, setShowTodoForm] = useState(false)


  useEffect(() => {
    const loadTodos = async () => {
      const res = await todoFetch.get("/todos");
      setTodos(res.data);
      setShowTodoForm(false)
    };
    loadTodos();
  }, []);

  if (!todos) return <p>Carregando...</p>

  const createTodo = async (text, category) => {
    try {
      const todoData = {
        text,
        category,
        isCompleted: false,
      };

      const res = await todoFetch.post("/todos", todoData);

      if (res.status === 201) {
        const newTodo = res.data.response;
        setTodos(prevTodos => [...prevTodos, newTodo]);
        useToast(res.data.msg);
      }

    } catch (error) {
      console.error(error);
    }
  }

  const removeTodo = async (id) => {
    try {
      const newTodos = [...todos]

      const res = await todoFetch.delete(`/todo/${id}`);

      const filteredTodos = newTodos.filter((todo) => todo._id !== id);
      
      if (res.status === 200){
        setTodos(filteredTodos);
        useToast(res.data.msg);
      }

    } catch (error) {
      console.log(error)
    }
  }

  const completeTodo = async (id) => {
    try {
      const newTodos = [...todos];

      await todoFetch.put(`/todo/${id}`, { isCompleted: !newTodos.find(todo => todo._id === id).isCompleted });

      const updatedTodos = newTodos.map((todo) =>
        todo._id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      );

      setTodos(updatedTodos);

    } catch (error) {
      console.log(error);
    }
  };

  function toggleTodoForm() {
    setShowTodoForm(!showTodoForm)
  }

  return (
    <div>
      <ToastContainer />
      <Header>
        <div>
          <Search search={search} setSearch={setSearch} />
          <Filter filter={filter} setFilter={setFilter} setSort={setSort} />
        </div>
        <button onClick={toggleTodoForm}>Nova Tarefa</button>
      </Header>

      <h1>Lista de Tarefas</h1>

      <section>
        {showTodoForm && (
          <TodoForm createTodo={createTodo} />
        )}

        <div className="todo-list">
          {todos
            .filter((todo) => filter === "All" ? true : filter === "Completed" ? todo.isCompleted : !todo.isCompleted)
            .filter((todo) => todo.text && todo.text.toLowerCase().includes(search.toLowerCase()))
            .sort((a, b) => sort === "Asc" ? a.text.localeCompare(b.text) : b.text.localeCompare(a.text))
            .map((todo) => (
              <Todo
                key={todo._id}
                todo={todo}
                removeTodo={removeTodo}
                completeTodo={completeTodo} />
            ))}

        </div>

      </section>

    </div>
  )
}

export default App
