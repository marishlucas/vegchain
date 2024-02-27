import Dashboard from './components/Dashboard'
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom'
import Login from './components/Login'
import Layout from './components/Layout'
import { useEffect, useState } from 'react'
import Home from './components/Home'
import Batch from './components/Batch'


const Format = ({ user, setUser }) => {
  return (
    user ? <>
      <Layout setUser={setUser}>
        <Outlet />
      </Layout>
    </> : <Navigate to="/" />
  )
}


function App() {
  const [user, setUser] = useState(getUser());
  const [mode, setMode] = useState("create");

  const [batches, setBatches] = useState([]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }, [user])

  function getUser() {
    return JSON.parse(localStorage.getItem('user'))
  }

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}>
          </Route>
          <Route path="login" element={<Login user={user} setUser={setUser} />}></Route>
          <Route path="dashboard" element={<Format user={user} setUser={setUser} />}>
            <Route path="" element={<Dashboard user={user} setMode={setMode} setBatches={setBatches} />}></Route>
            <Route path="batch" element={<Batch user={user} mode={mode} batches={batches} />}></Route>
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
