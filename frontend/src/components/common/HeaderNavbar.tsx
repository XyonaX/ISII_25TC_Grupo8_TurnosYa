import { Link } from 'react-router-dom';
export default function HeaderNavbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-custom " style={{ backgroundColor: "#f9fffb" }}>
        <div className="container-fluid">
            <Link className="navbar-brand d-flex align-items-center" to="/">
                <img
                    src="/logo.png"  
                    alt="Logo"
                    className="navbar-logo me-2"
                    />
                <span className="navbar-title">
                    <span className="text-turnos">Turnos</span> 
                    <span className="text-ya">Ya</span>
                </span>
            </Link>
            <button
                className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ms-auto mb-3 mb-lg-0">
                    <li className="nav-item custom-nav-link">
                        <Link className="nav-link" to="/login">
                            INICIAR SESIÓN
                        </Link>
                    </li>
                    <li className="nav-item custom-nav-link">
                        <Link className="nav-link" to="/registro">
                            REGISTRARSE
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    </nav>

    )
}

