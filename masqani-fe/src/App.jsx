import './App.css'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Billing from './pages/Billing'
import LoginPage from './pages/LoginPage'
import SignUp from './pages/SignUp';
import ListProperty from './pages/property/create/ListProperty'
import PrivateRoute from './utils/PrivateRoute'
import AllRent from './pages/property/rentals/AllRent'
import AllSale from './pages/property/sale/AllSale'
import ApartmentSale from './pages/property/sale/ApartmentSale'
import HouseSale from './pages/property/sale/HouseSale'
import CommercialSale from './pages/property/sale/CommercialSale'
import AffordabilityCalc from './pages/guides/buyer/AffordabilityCalc'
import BuyersGuide from './pages/guides/buyer/BuyersGuide'
import ApartmentsRent from './pages/property/rentals/ApartmentsRent'
import HouseRent from './pages/property/rentals/HouseRent'
import SellerGuide from './pages/guides/seller/SellerGuide'
import AgentList from './pages/guides/agents/AgentList'
import NewsInsights from './pages/guides/seller/NewsInsights'

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
        <Route path='/properties-list-property' element={<PrivateRoute><ListProperty /></PrivateRoute>} />
        <Route path='/properties-rent' element={<AllRent />} />
        <Route path='/properties/apartments-rent' element={<ApartmentsRent />} />
        <Route path='/properties/houses-rent' element={<HouseRent />} />
        <Route path='/properties/commercial-rent' element={<AllRent />} />
        
        <Route path='/properties-buy' element={<AllSale />} />
        <Route path='/properties/apartments-sale' element={<ApartmentSale />} />
        <Route path='/properties/houses-sale' element={<HouseSale />} />
        <Route path='/properties/commercial-sale' element={<CommercialSale />} />
        
        <Route path='/guide/affordability-calc' element={<AffordabilityCalc />} />
        <Route path='/guide/buyer' element={<BuyersGuide />} />
        <Route path='/guide/sellers' element={<SellerGuide />} />

        <Route path='/agents/list' element={<AgentList />} />
        <Route path='/news-insights' element={<NewsInsights/>}/>
      </Route>
    </Routes>
  )
}

export default App
