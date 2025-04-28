import './App.css';
import { Route, Routes } from 'react-router-dom';
/* Common */
import HeaderNavbar from "./components/common/HeaderNavbar";
import Footer from './components/common/Footer';
/* Pages */
import { HomePage } from './pages/HomePage';
import IniciarSesion from './pages/IniciarSesion';
import Registrarse from './pages/Registrarse';
import Turnos from './pages/Turnos';
import SobreNosotros from './pages/SobreNosotros';

function App() {
  return (
    <div className="app-container">
      <HeaderNavbar />
      <main className="container mt-4">
        <Routes>
          <Route path='/' element={<HomePage/>} />          
          <Route path='/login' element={<IniciarSesion/>} />
          <Route path='/registro' element={<Registrarse/>} />
          <Route path='/turnos' element={<Turnos/>} />
          <Route path='/sobrenosotros' element={<SobreNosotros/>} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;