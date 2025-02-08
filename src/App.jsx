import { useState } from 'react'
import './App.css'
import Home from './Pages/Home'
import Layout from './Layouts/Layout'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Layout>
        <Home />
      </Layout>
    </div>
  )
}

export default App
