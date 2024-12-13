import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className='h-screen flex-col flex'>
      <Navbar/>
      <div className='flex-col flex mt-3'>
      <main className='flex-grow bg-white'>
        <Outlet/>
      </main>
      <Footer/>
      </div>
    </div>
  )
}

export default Layout