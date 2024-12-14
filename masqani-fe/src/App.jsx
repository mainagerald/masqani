import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Login from './pages/LoginPage';
import Billing from './pages/Billing'
import LoginPage from './pages/LoginPage'

function App() {

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/oauth2/redirect" element={<LoginPage />} />
      <Route path='/' element={<Layout/>}>
        <Route index element={<Home/>}/>
        <Route path='/billing' element={<Billing/>}/>
      </Route>
    </Routes>
  )
}

export default App
