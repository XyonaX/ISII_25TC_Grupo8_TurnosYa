import { Link } from 'react-router-dom';

const PoliticasPrivacidad = () => {
    return (
        <div className="container py-5" style={{ minHeight: 'calc(100vh - 245px)' }}>
            <div className="row justify-content-center">
                <div className="col-lg-8">
                    <div className="card shadow border-0" style={{ borderRadius: '15px', border: '2px solid #04a658' }}>
                        <div className="card-body p-4 p-md-5">
                            <h1 className="text-center mb-4" style={{ fontFamily: "'Trebuchet MS', sans-serif" }}>
                                <span style={{ color: '#ae5bbf' }}>Política</span> 
                                <span style={{ color: '#04a658' }}> de Privacidad</span>
                            </h1>

                            <p className="text-muted text-center mb-4">
                                Última actualización: {new Date().toLocaleDateString('es-AR')}
                            </p>

                            {/* Introducción */}
                            <div className="mb-5">
                                <h3 style={{ color: '#04a658', fontFamily: "'Trebuchet MS', sans-serif" }}>1. Introducción</h3>
                                <p style={{ color: '#555', textAlign: 'justify' }}>
                                    En TurnosYa valoramos tu privacidad. Esta política describe cómo recopilamos, usamos, compartimos y protegemos tu información personal conforme a la Ley 25.326 de Protección de Datos Personales de Argentina.
                                </p>
                            </div>

                            {/* Datos que recolectamos */}
                            <div className="mb-5">
                                <h3 style={{ color: '#04a658', fontFamily: "'Trebuchet MS', sans-serif" }}>2. Información que Recopilamos</h3>
                                <ul style={{ color: '#555' }}>
                                    <li className="mb-2">Datos personales: nombre, DNI, fecha de nacimiento, correo electrónico, teléfono.</li>
                                    <li className="mb-2">Datos médicos: especialidades consultadas, historial de turnos.</li>
                                    <li>Información de pago (cuando aplique).</li>
                                </ul>
                            </div>

                            {/* Uso de los datos */}
                            <div className="mb-5">
                                <h3 style={{ color: '#04a658', fontFamily: "'Trebuchet MS', sans-serif" }}>3. Finalidad de Uso de la Información</h3>
                                <p style={{ color: '#555', textAlign: 'justify' }}>
                                    Utilizamos tus datos para:
                                </p>
                                <ul style={{ color: '#555' }}>
                                    <li className="mb-2">Gestionar turnos médicos.</li>
                                    <li className="mb-2">Comunicar recordatorios y actualizaciones.</li>
                                    <li>Mejorar nuestros servicios y experiencia de usuario.</li>
                                </ul>
                            </div>

                            {/* Compartir datos */}
                            <div className="mb-5">
                                <h3 style={{ color: '#04a658', fontFamily: "'Trebuchet MS', sans-serif" }}>4. Compartición de Datos</h3>
                                <p style={{ color: '#555', textAlign: 'justify' }}>
                                    Solo compartimos tus datos personales con profesionales médicos registrados en TurnosYa o cuando sea necesario para cumplir obligaciones legales. No vendemos ni comercializamos tu información.
                                </p>
                            </div>

                            {/* Seguridad */}
                            <div className="mb-5">
                                <h3 style={{ color: '#04a658', fontFamily: "'Trebuchet MS', sans-serif" }}>5. Seguridad de la Información</h3>
                                <p style={{ color: '#555', textAlign: 'justify' }}>
                                    Implementamos medidas de seguridad administrativas, técnicas y físicas para proteger tus datos personales contra pérdida, robo o acceso no autorizado.
                                </p>
                            </div>

                            {/* Derechos ARCO */}
                            <div className="mb-5">
                                <h3 style={{ color: '#04a658', fontFamily: "'Trebuchet MS', sans-serif" }}>6. Derechos del Usuario</h3>
                                <p style={{ color: '#555', textAlign: 'justify' }}>
                                    Como titular de datos personales, tienes derecho a:
                                </p>
                                <ul style={{ color: '#555' }}>
                                    <li className="mb-2">Acceder a tus datos personales.</li>
                                    <li className="mb-2">Solicitar la rectificación de datos inexactos.</li>
                                    <li className="mb-2">Solicitar la supresión o bloqueo de tus datos.</li>
                                    <li>Oponerte al tratamiento de tus datos en determinadas circunstancias.</li>
                                </ul>
                                <p style={{ color: '#555', textAlign: 'justify' }}>
                                    Para ejercer estos derechos, podés contactarnos a través de nuestro formulario o correo electrónico disponible en la plataforma.
                                </p>
                            </div>

                            {/* Cookies */}
                            <div className="mb-5">
                                <h3 style={{ color: '#04a658', fontFamily: "'Trebuchet MS', sans-serif" }}>7. Uso de Cookies</h3>
                                <p style={{ color: '#555', textAlign: 'justify' }}>
                                    Utilizamos cookies para mejorar la navegación y experiencia de usuario en TurnosYa. Podés configurar tu navegador para rechazar cookies, aunque esto podría afectar algunas funcionalidades.
                                </p>
                            </div>

                            {/* Modificaciones */}
                            <div className="mb-5">
                                <h3 style={{ color: '#04a658', fontFamily: "'Trebuchet MS', sans-serif" }}>8. Modificaciones a esta Política</h3>
                                <p style={{ color: '#555', textAlign: 'justify' }}>
                                    Nos reservamos el derecho de modificar esta política de privacidad. Cualquier cambio será publicado y entrará en vigencia a los 30 días de su publicación.
                                </p>
                            </div>

                            {/* Autoridad de aplicación */}
                            <div className="mb-5">
                                <h3 style={{ color: '#04a658', fontFamily: "'Trebuchet MS', sans-serif" }}>9. Autoridad de Aplicación</h3>
                                <p style={{ color: '#555', textAlign: 'justify' }}>
                                    La Agencia de Acceso a la Información Pública, en su carácter de órgano de control de la Ley 25.326, tiene la atribución de atender las denuncias y reclamos que se interpongan respecto del incumplimiento de las normas sobre protección de datos personales.
                                </p>
                            </div>

                            {/* Botón Volver */}
                            <div className="text-center mt-5">
                                <Link to="/" className="btn" style={{ 
                                    backgroundColor: '#04a658', 
                                    color: 'white',
                                    borderRadius: '8px',
                                    padding: '10px 25px'
                                }}>
                                    Volver al Inicio
                                </Link>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PoliticasPrivacidad;
