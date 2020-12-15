import React, { useContext, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { useHistory } from "react-router"
import { CredentialsContext } from "../App"

const Update = () => {
  let { id, text } = useLocation()
  const [todosText, setTodoText] = useState("")
  const [credentials] = useContext(CredentialsContext)
  const history = useHistory()

  const updateTodo = (e) => {
    e.preventDefault()
    if (todosText.length != 0) {
      fetch("http://localhost:4000/todo/updateTodos", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${credentials.username}:${credentials.password}`,
        },
        body: JSON.stringify({ id, text: todosText }),
      })
        .then((response) => response.json())
        .then(() => history.push("/"))
    }
  }

  return (
    <div>
      <h1>Previous text</h1>
      <label>{text}</label>

      <form onSubmit={updateTodo}>
        <input
          value={todosText}
          onChange={(e) => setTodoText(e.target.value)}
          type='text'
        ></input>
        <button type='submit'>Update</button>
      </form>
      <br />
      <Link to='/'>Back</Link>
      <br />
    </div>
  )
}

export default Update
