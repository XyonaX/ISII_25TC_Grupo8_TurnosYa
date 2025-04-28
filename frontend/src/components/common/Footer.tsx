import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="footer mt-auto py-4" style={{ backgroundColor: '#f9fffb', borderTop: '2px solid #04a658' }}>
            <div className="container">
                <div className="row justify-content-center">
                    {/* Columna Logo */}
                    <div className="col-md-3 mb-4 mb-md-0">
                        <div className="d-flex align-items-center">
                            <Link className="navbar-brand d-flex align-items-center" to="/">
                                <img
                                    src="/logo.png"
                                    alt="Logo TurnosYa"
                                    className="me-2"
                                    style={{ height: '40px', width: 'auto' }}
                                />
                                <h5 className="m-0" style={{ fontFamily: "'Trebuchet MS', sans-serif" }}>
                                    <span style={{ color: '#ae5bbf' }}>Turnos</span>
                                    <span style={{ color: '#04a658' }}>Ya</span>
                                </h5>
                            </Link>
                        </div>
                        <p className="mt-3 mb-0" style={{ color: '#555', fontFamily: "'Trebuchet MS', sans-serif" }}>
                            <span className="d-block">Tu solución confiable</span>
                            <span className="d-block ps-3">para la gestión de turnos</span>
                        </p>
                    </div>

                    {/* Columna Enlaces */}
                    <div className="col-md-2 mb-4 mb-md-0">
                        <h5 style={{ color: '#04a658', fontFamily: "'Trebuchet MS', sans-serif" }}>Enlaces</h5>
                        <ul className="list-unstyled">
                            <li className="mb-2">
                                <Link to="/" className="text-decoration-none" style={{ color: '#555' }}>
                                    Inicio
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link to="/sobrenosotros" className="text-decoration-none" style={{ color: '#555' }}>
                                    Sobre Nosotros
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link to="/registro" className="text-decoration-none" style={{ color: '#555' }}>
                                    Registrarse
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link to="/login" className="text-decoration-none" style={{ color: '#555' }}>
                                    Iniciar Sesión
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Columna Para Médicos */}
                    <div className="col-md-2 mb-4 mb-md-0">
                        <h5 style={{ color: '#04a658', fontFamily: "'Trebuchet MS', sans-serif" }}>Para Médicos</h5>
                        <ul className="list-unstyled">
                            <li className="mb-2">
                                <Link to="/registro" className="text-decoration-none" style={{ color: '#555', fontFamily: "'Trebuchet MS', sans-serif" }}>
                                    Registro Profesional
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link to="/turnos" className="text-decoration-none" style={{ color: '#555', fontFamily: "'Trebuchet MS', sans-serif" }}>
                                    Gestión de Turnos
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Columna Legal */}
                    <div className="col-md-2">
                        <h5 style={{ color: '#04a658', fontFamily: "'Trebuchet MS', sans-serif" }}>Legal</h5>
                        <ul className="list-unstyled" style={{ color: '#555' }}>
                            <li className="mb-2">
                                <Link to="/terminos" className="text-decoration-none" style={{ color: '#555' }}>
                                    Términos y Condiciones
                                </Link>
                            </li>
                            <li className="mb-2">
                                <Link to="/privacidad" className="text-decoration-none" style={{ color: '#555' }}>
                                    Política de Privacidad
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Derechos de autor */}
                <div className="text-center mt-4 pt-3" style={{ borderTop: '1px solid #ddd', color: '#555' }}>
                    <p className="m-0">
                        &copy; {new Date().getFullYear()} TurnosYa - Plataforma de gestión de turnos médicos
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
