import React, { useContext, useState } from "react"
import { useHistory } from "react-router"
import { CredentialsContext } from "../App"
import { handleError } from "./Login"

const Register = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const history = useHistory()
  const [, setCredentials] = useContext(CredentialsContext)

  const register = (e) => {
    e.preventDefault()
    fetch("http://localhost:4000/user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then(handleError)
      .then(() => {
        setCredentials({
          username,
          password,
        })
        history.push("/")
      })

      .catch((error) => {
        setError(error.message)
      })
  }

  return (
    <div>
      <h1>Register</h1>
      {error ? <span style={{ color: "red" }}>{error}</span> : error}
      <form onSubmit={register}>
        <input
          type='email'
          onChange={(e) => setUsername(e.target.value)}
          placeholder='email'
        />
        <br />
        <input
          type='password'
          onChange={(e) => setPassword(e.target.value)}
          placeholder='Password'
        />
        <br />
        <button type='submit'>Register</button>
      </form>
    </div>
  )
}

export default Register
