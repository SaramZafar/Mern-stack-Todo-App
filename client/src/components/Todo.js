import React, { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { CredentialsContext } from "../App"
import { useHistory } from "react-router"

const Todo = () => {
  const [todos, setTodo] = useState([])
  const [todosText, setTodoText] = useState("")
  const [credentials] = useContext(CredentialsContext)
  const [filter, setFilter] = useState("uncompleted")
  const [value, setValue] = useState(0)

  const persist = (newTodos) => {
    fetch("http://localhost:4000/todo/addTodos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${credentials.username}:${credentials.password}`,
      },
      body: JSON.stringify(newTodos),
    })
      .then((response) => response.json())
      .then((todos) => setTodo(todos))
  }

  const delTodoById = (id) => {
    fetch("http://localhost:4000/todo/deleteTodo", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${credentials.username}:${credentials.password}`,
      },
      body: JSON.stringify({ id }),
    })
      .then((response) => response.json())
      .then((todos) => setTodo(todos))
  }

  useEffect(() => {
    fetch("http://localhost:4000/todo/getTodos", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${credentials.username}:${credentials.password}`,
      },
    })
      .then((response) => response.json())
      .then((todos) => setTodo(todos))
  }, [])

  const addTodo = (e) => {
    e.preventDefault()
    if (todosText.length != 0) {
      const newTodos = [...todos, { checked: false, text: todosText }]
      persist(newTodos)
      setTodoText("")
    }
  }
  const toggleTodo = (id) => {
    const newTodo = [...todos]
    const todoItem = newTodo.find((todo) => todo._id === id)
    todoItem.checked = !todoItem.checked
    persist(newTodo)
  }
  const getTodos = () => {
    return todos.filter((todo) =>
      filter === "uncompleted" ? !todo.checked : todo.checked
    )
  }
  const changeFilter = (newFilter) => {
    setFilter(newFilter)
  }

  return (
    <div>
      <select onChange={(e) => changeFilter(e.target.value)}>
        <option value='uncompleted'>Uncompleted</option>
        <option value='completed'>Completed</option>
      </select>
      <br />
      <br />

      {getTodos().map((todo) => {
        return (
          <div className='todoBox' key={todo._id}>
            <li className='text'>
              <strong>{todo.text}</strong>
            </li>

            <input
              className='checkMargin'
              checked={todo.checked}
              onChange={() => toggleTodo(todo._id)}
              type='checkbox'
            />

            <Link
              className='LinkMarginLeftRight'
              to={{
                pathname: "/update",
                id: todo._id,
                text: todo.text,
              }}
            >
              Update
            </Link>
            <Link
              className='LinkMarginLeftRight'
              to='/'
              onClick={(e) => {
                delTodoById(todo._id)
              }}
            >
              Delete
            </Link>
          </div>
        )
      })}

      {getTodos().length === 0 ? "*Empty todo list*" : null}

      <br />

      <form onSubmit={addTodo}>
        <input
          value={todosText}
          onChange={(e) => setTodoText(e.target.value)}
          type='text'
          placeholder='Write a todo here'
        ></input>
        <button type='submit'>Add</button>
      </form>
    </div>
  )
}

export default Todo
