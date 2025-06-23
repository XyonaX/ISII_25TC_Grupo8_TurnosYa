import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaUserCircle } from "react-icons/fa";
import { useUserStore } from "../../store/userStore";

export default function HeaderNavbar() {
    const user = useUserStore((state) => state.user);
    const setUser = useUserStore((state) => state.setUser);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setUser(null);
        navigate("/");
    };

    return (
        <nav
            className='navbar navbar-expand-lg navbar-custom'
            style={{ backgroundColor: "#f9fffb" }}
        >
            <div className='container-fluid'>
                <Link className='navbar-brand d-flex align-items-center' to='/'>
                    <img
                        src='/logo.png'
                        alt='Logo'
                        className='navbar-logo me-2'
                    />
                    <span className='navbar-title'>
                        <span className='text-turnos'>Turnos</span>
                        <span className='text-ya'>Ya</span>
                    </span>
                </Link>

                <button
                    className='navbar-toggler'
                    type='button'
                    data-bs-toggle='collapse'
                    data-bs-target='#navbarSupportedContent'
                    aria-controls='navbarSupportedContent'
                    aria-expanded='false'
                    aria-label='Toggle navigation'
                >
                    <span className='navbar-toggler-icon'></span>
                </button>

                <div
                    className='collapse navbar-collapse'
                    id='navbarSupportedContent'
                >
                    <div></div>
                    <ul className='navbar-nav ms-auto mb-3 mb-lg-0'>
                        {!user ? (
                            <>
                                <li className='nav-item custom-nav-link'>
                                    <Link className='nav-link' to='/login'>
                                        INICIAR SESIÓN
                                    </Link>
                                </li>
                                <li className='nav-item custom-nav-link'>
                                    <Link className='nav-link' to='/registro'>
                                        REGISTRARSE
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <div>
                                <li className='nav-item dropdown'>
                                    <a
                                        className='nav-link dropdown-toggle d-flex align-items-center'
                                        href='#'
                                        id='navbarDropdown'
                                        role='button'
                                        data-bs-toggle='dropdown'
                                        aria-expanded='false'
                                    >
                                        <FaUserCircle
                                            size={24}
                                            className='me-2'
                                        />
                                        {user.nombre_usuario}{" "}
                                        {user.apellido_usuario}
                                    </a>
                                    <ul
                                        className='dropdown-menu dropdown-menu-end'
                                        aria-labelledby='navbarDropdown'
                                    >
                                        <li>
                                            <Link
                                                className='dropdown-item'
                                                to='/perfil'
                                            >
                                                Mi perfil
                                            </Link>
                                        </li>
                                        {user.tipo_usuario === "medico" && (
                                            <>
                                                <li>
                                                    <Link
                                                        className='dropdown-item'
                                                        to='/gestion-turnos'
                                                    >
                                                        Gestion de turnos
                                                    </Link>
                                                </li>
                                            </>
                                        )}
                                        <li>
                                            <hr className='dropdown-divider' />
                                        </li>
                                        <li>
                                            <button
                                                className='dropdown-item'
                                                onClick={handleLogout}
                                            >
                                                Cerrar sesión
                                            </button>
                                        </li>
                                    </ul>
                                </li>
                                <p className="text-center fw-semibold mb-0 text-uppercase" style={{color: "#ad3ebd"}}>{ user?.tipo_usuario}</p>
                            </div>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}
