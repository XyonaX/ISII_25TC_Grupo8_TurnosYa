import './App.css'
import { Route, Routes } from 'react-router-dom'
/* Common*/
import HeaderNavbar from "./components/common/HeaderNavbar";
/* Pages */
import { HomePage } from './pages/HomePage'

function App() {

  return (
    <>
        <HeaderNavbar />
      <Routes>
        <Route path='/' element={<HomePage/>} />
      </Routes>
    </>

  )
}

export default App
