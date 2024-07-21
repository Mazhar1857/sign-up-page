import React from 'react'
import './App.css'
import Head from './component/Head'
import Advertise from './component/Advertise'
import SignUpPage from './component/SignUpPage'
import LoginPage from './component/LoginPage'
import EmailVerification from './component/EmailVerification'
import CategoriesPage from './component/CategoriesPage'
import { Route, Routes } from 'react-router-dom'


const App = () => {
  return (
    <div className='main'>
      <Head />
      <Advertise />
      <section className='sign-up-section'>

        <Routes>
          <Route path='/' element={<SignUpPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/verification' element={<EmailVerification />} />
          <Route path='/categories' element={<CategoriesPage />} />
        </Routes>

      </section>
    </div>
  )
}

export default App
