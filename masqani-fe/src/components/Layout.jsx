import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className='min-h-screen flex-col flex'>
      <Navbar/>
      <main className='flex-grow overflow-y-auto'>
        <Outlet/>
      </main>
      <Footer/>
    </div>
  )
}

export default Layout