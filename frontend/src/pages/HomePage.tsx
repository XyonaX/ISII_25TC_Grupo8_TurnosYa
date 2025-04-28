/*export const HomePage = () => {
  return (
    <div className="text-xl text-red-500">HomePage</div>
  )
  
}*/
import { Link } from 'react-router-dom';
export const HomePage = () => {
  return (
    <div>
        <div className="text-center mt-5">
        <div className="text-xl text-red-500">
          HomePage
        </div>

        {/* Aquí agregamos el botón de Bootstrap */}
        <button className="boton-ingresar">
          <Link className="nav-link" to="/turnos">
            Buscar Médicos
          </Link>
        </button>
        </div>
    </div>
    
  )
}
