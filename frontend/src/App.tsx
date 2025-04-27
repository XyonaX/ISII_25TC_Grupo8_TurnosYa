
import './App.css';
import { Route, Routes } from 'react-router-dom';
/* Common */
import HeaderNavbar from "./components/common/HeaderNavbar";
/* Pages */
import { HomePage } from './pages/HomePage';
import Turnos from './pages/Turnos';

function App() {
  return (
    <div className="app-container">
      <HeaderNavbar />
      <main className="container mt-4">
        <Routes>
          <Route path='/' element={<HomePage/>} />
          <Route path='/turnos' element={<Turnos/>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;