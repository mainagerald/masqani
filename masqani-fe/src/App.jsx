import './App.css'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Billing from './pages/Billing'
import LoginPage from './pages/LoginPage'
import SignUp from './pages/SignUp';
import ListProperty from './pages/property/create/ListProperty'
import PrivateRoute from './utils/PrivateRoute'

function App() {

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/oauth2/redirect" element={<LoginPage />} />
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='/billing' element={
          <PrivateRoute><Billing /></PrivateRoute>} />
          <Route path='/properties-listprop'element={<PrivateRoute><ListProperty/></PrivateRoute>}/>
      </Route>
    </Routes>
  )
}

export default App
