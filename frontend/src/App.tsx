import './App.css';
import { Route, Routes } from 'react-router-dom';
/* Common */
import HeaderNavbar from "./components/common/HeaderNavbar";
import Footer from './components/common/Footer';
/* Pages */
import HomePage from './pages/HomePage';
import IniciarSesion from './pages/IniciarSesion';
import Registrarse from './pages/Registrarse';
import Turnos from './pages/Turnos';
import SobreNosotros from './pages/SobreNosotros';
import PreguntasFrecuentes from './pages/PreguntasFrecuentes';
import TerminosCondiciones from './pages/TerminosCondiciones';
import PoliticasPrivacidad from './pages/PoliticasPrivacidad';

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
          <Route path='/preguntasfrecuentes' element={<PreguntasFrecuentes/>} />
          <Route path='/terminos' element={<TerminosCondiciones/>} />
          <Route path='/privacidad' element={<PoliticasPrivacidad/>} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;