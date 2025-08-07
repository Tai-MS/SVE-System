import { useState } from 'react'
import Login from './components/Login'
import './App.css'

function App() {
  const [user, setUser] = useState<string | null>(null)
  return (
    <>

    <Login setUser={setUser}/>
    {user && <div>Logged in as: {user}</div>}

    </>
  )
}

export default App
