import React, { useContext, useEffect } from "react"
import { Link } from "react-router-dom"
import Todo from "../components/Todo"
import { useHistory } from "react-router"
import { CredentialsContext } from "../App"

const Home = () => {
  const history = useHistory()
  const [credentials] = useContext(CredentialsContext)

  const [, setCredentials] = useContext(CredentialsContext)

  useEffect(() => {
    let data = localStorage.getItem("auth")
    if (data != null && !credentials) {
      const { username, password } = JSON.parse(data)
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
        .then(() => {
          setCredentials({
            username: username,
            password: password,
          })
          history.push("/")
        })

        .catch((error) => {
          localStorage.clear()
        })
    }
  }, [credentials])
  const hanldeLogout = () => {
    localStorage.clear()
    setCredentials(null)
  }

  return (
    <div>
      <h1>Welcome {credentials && credentials.username}</h1>
      {!credentials && <Link to='/register'>Register</Link>}
      <br />
      {!credentials && (
        <div>
          <br />
          <Link to='/login'>Login</Link>
        </div>
      )}

      {credentials && (
        <Link to='/' onClick={hanldeLogout}>
          Logout
        </Link>
      )}
      <br />
      <br />
      {credentials && <Todo />}
    </div>
  )
}

export default Home
