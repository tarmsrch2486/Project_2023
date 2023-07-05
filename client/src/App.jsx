import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

//Import component
import Navbar_project from './component/Navbar_project'
import Show_data from './component/Show_data'
import Edit_data from './component/Edit_data'
import Login from './component/Login'
import Register from './component/Register'
import Homepage from './component/Homepage'
import Member_data from './component/Member_data'
//React-router
import { BrowserRouter, NavLink, Routes, Route, Navigate, Link } from 'react-router-dom'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <div>
        {/* < Navbar_project /> */}
        <Routes>
          <Route path='/Homepage' element={< Homepage />}>blank</Route>
          <Route path='/' element={< Show_data />}>Show_data</Route>
          <Route path='/edit_data/:id' element={< Edit_data />}>Edit_data</Route>
          <Route path='/login' element={< Login />}>Login</Route>
          <Route path='/register' element={< Register />}>Register</Route>
          <Route path='/register' element={< Register />}>Register</Route>
          <Route path='/member_data' element={< Member_data />}>member_data</Route>
        </Routes>
      </div>

    </BrowserRouter>
  )
}

export default App
