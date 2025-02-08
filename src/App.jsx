import './App.css'
import Home from './Pages/Home'
import { Route, Routes } from 'react-router-dom'
import Signup from './Pages/Auth/Signup'
import Login from './Pages/Auth/Login'
import NotFound from './Pages/NotFound'
import Denied from './Pages/Denied'
import AddProduct from './Pages/Admin/AddProduct'

function App() {

  return (
    <>
      <Routes>
        <Route path="/denied" element={<Denied />} />
        <Route path="/" element={<Home />} />
        <Route path="/auth/signup" element={<Signup />} />
        <Route path="/auth/login" element={<Login />} />

        <Route path="/admin/addproduct" element={<AddProduct />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
