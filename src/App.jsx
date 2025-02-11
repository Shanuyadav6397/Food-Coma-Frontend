import './App.css'
import Home from './Pages/Home'
import { Route, Routes } from 'react-router-dom'
import Signup from './Pages/Auth/Signup.jsx'
import NotFound from './Pages/NotFound.jsx'
import Denied from './Pages/Denied.jsx'
import AddProduct from './Pages/Admin/AddProduct.jsx'
import Login from './Pages/Auth/Login.jsx'
import ProductDetails from './Pages/Products/ProductDetails.jsx'

function App() {

  return (
    <>
      <Routes>
        <Route path="/denied" element={<Denied />} />
        <Route path="/" element={<Home />} />
        <Route path="/auth/signup" element={<Signup />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/product/:productId" element={<ProductDetails />} />
        <Route path="/admin/addproduct" element={<AddProduct />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
