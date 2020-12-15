import React, { useContext, useState } from "react"
import { useHistory } from "react-router"
import { CredentialsContext } from "../App"

export const handleError = async (response) => {
  if (!response.ok) {
    const { message } = await response.json()
    throw Error(message)
  }
  return response.json()
}

const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const history = useHistory()
  const [, setCredentials] = useContext(CredentialsContext)

  const login = (e) => {
    e.preventDefault()
    fetch("http://localhost:4000/user/login", {
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
        const obj = { username: username, password: password }
        localStorage.setItem("auth", JSON.stringify(obj))

        setCredentials({
          username: username,
          password: password,
        })
        history.push("/")
      })

      .catch((error) => {
        setError(error.message)
      })
  }

  return (
    <div>
      <h1>Login</h1>
      {error ? <span style={{ color: "red" }}>{error}</span> : error}
      <form onSubmit={login}>
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
        <button type='submit'>Login</button>
      </form>
    </div>
  )
}

export default Login
