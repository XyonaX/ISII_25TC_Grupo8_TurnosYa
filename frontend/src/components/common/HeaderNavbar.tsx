export default function HeaderNavbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-custom " style={{ backgroundColor: "#f9fffb" }}>
    <div className="container-fluid">
        <a className="navbar-brand d-flex align-items-center" href="#">
            <img
                src="/logo.png"  
                alt="Logo"
                className="navbar-logo me-2"
                />
            <span className="navbar-title">
                <span className="text-turnos">Turnos</span> 
                <span className="text-ya">Ya</span>
            </span>
        </a>
        <button
            className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-3 mb-lg-0">
                <li className="nav-item custom-nav-link">
                    <a className="nav-link" aria-current="page" href="#">INICIAR SESION
                    </a>
                </li>
                <li className="nav-item custom-nav-link">
                    <a className="nav-link" href="#">
                    REGISTRARSE
                    </a>
                </li>
            </ul>
        </div>
    </div>
  </nav>

  )

}

