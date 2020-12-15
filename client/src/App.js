import logo from "./logo.svg"
import React, { useContext, useEffect } from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import "./App.css"
import Register from "./screens/Register"
import Home from "./screens/Home"
import Login from "./screens/Login"

import { useState } from "react"
import Update from "./screens/Update"

export const CredentialsContext = React.createContext()

function App() {
  const credentialsState = useState(null)

  return (
    <div className='App'>
      <CredentialsContext.Provider value={credentialsState}>
        <Router>
          <Switch>
            <Route exact path='/'>
              <Home />
            </Route>
            <Route path='/Register'>
              <Register />
            </Route>
            <Route path='/login'>
              <Login />
            </Route>
            <Route path='/update'>
              <Update />
            </Route>
          </Switch>
        </Router>
      </CredentialsContext.Provider>
    </div>
  )
}

export default App
