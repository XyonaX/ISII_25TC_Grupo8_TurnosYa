import { Link } from 'react-router-dom';

const TerminosCondiciones = () => {
    return (
        <div className="container py-5" style={{ minHeight: 'calc(100vh - 245px)' }}>
        <div className="row justify-content-center">
            <div className="col-lg-8">
            <div className="card shadow border-0" style={{ borderRadius: '15px', border: '2px solid #04a658' }}>
                <div className="card-body p-4 p-md-5">
                <h1 className="text-center mb-4" style={{ fontFamily: "'Trebuchet MS', sans-serif" }}>
                    <span style={{ color: '#ae5bbf' }}>Términos</span>
                    <span style={{ color: '#04a658' }}> y Condiciones</span>
                </h1>
                
                <p className="text-muted text-center mb-4">
                    Última actualización: {new Date().toLocaleDateString('es-AR')}
                </p>

                <div className="mb-5">
                    <h3 style={{ color: '#04a658', fontFamily: "'Trebuchet MS', sans-serif" }}>1. Aceptación de los Términos</h3>
                    <p style={{ color: '#555', textAlign: 'justify' }}>
                    Al utilizar TurnosYa ("la Plataforma"), usted acepta cumplir con estos Términos y Condiciones. 
                    Si no está de acuerdo con alguno de estos términos, por favor absténgase de utilizar nuestros servicios.
                    </p>
                </div>

                <div className="mb-5">
                    <h3 style={{ color: '#04a658', fontFamily: "'Trebuchet MS', sans-serif" }}>2. Descripción del Servicio</h3>
                    <p style={{ color: '#555', textAlign: 'justify' }}>
                    TurnosYa es una plataforma digital que conecta pacientes con profesionales de la salud, facilitando:
                    </p>
                    <ul style={{ color: '#555' }}>
                    <li className="mb-2">Búsqueda de profesionales por especialidad, ubicación y cobertura médica</li>
                    <li className="mb-2">Reserva de turnos médicos en línea</li>
                    <li className="mb-2">Gestión de agenda para profesionales de la salud</li>
                    <li>Pago electrónico de consultas (cuando aplique)</li>
                    </ul>
                </div>

                <div className="mb-5">
                    <h3 style={{ color: '#04a658', fontFamily: "'Trebuchet MS', sans-serif" }}>3. Registro y Cuentas</h3>
                    <h5 style={{ color: '#ae5bbf', marginTop: '1rem' }}>3.1 Para Pacientes</h5>
                    <p style={{ color: '#555', textAlign: 'justify' }}>
                    Deberá proporcionar información veraz y actualizada. Es responsable de mantener la confidencialidad de sus credenciales.
                    </p>
                    
                    <h5 style={{ color: '#ae5bbf', marginTop: '1rem' }}>3.2 Para Profesionales</h5>
                    <p style={{ color: '#555', textAlign: 'justify' }}>
                    Deberá acreditar su matrícula profesional vigente. Es responsable de la exactitud de la información sobre especialidades, horarios y tarifas.
                    </p>
                </div>

                <div className="mb-5">
                    <h3 style={{ color: '#04a658', fontFamily: "'Trebuchet MS', sans-serif" }}>4. Cancelaciones y Reembolsos</h3>
                    <h5 style={{ color: '#ae5bbf', marginTop: '1rem' }}>4.1 Política de Cancelación</h5>
                    <p style={{ color: '#555', textAlign: 'justify' }}>
                    Los turnos cancelados con menos de 24 horas de anticipación podrían estar sujetos a cargos según la política del profesional.
                    </p>
                    
                    <h5 style={{ color: '#ae5bbf', marginTop: '1rem' }}>4.2 Reembolsos</h5>
                    <p style={{ color: '#555', textAlign: 'justify' }}>
                    Los reembolsos por pagos anticipados se regirán por las políticas establecidas por cada profesional y se procesarán dentro de los 5-10 días hábiles.
                    </p>
                </div>

                <div className="mb-5">
                    <h3 style={{ color: '#04a658', fontFamily: "'Trebuchet MS', sans-serif" }}>5. Privacidad y Protección de Datos</h3>
                    <p style={{ color: '#555', textAlign: 'justify' }}>
                    La información personal y médica se maneja según nuestra Política de Privacidad. Cumplimos con las regulaciones de protección de datos personales.
                    </p>
                </div>

                <div className="mb-5">
                    <h3 style={{ color: '#04a658', fontFamily: "'Trebuchet MS', sans-serif" }}>6. Limitación de Responsabilidad</h3>
                    <p style={{ color: '#555', textAlign: 'justify' }}>
                    TurnosYa actúa como intermediario. No somos responsables por la calidad de los servicios médicos prestados ni por diagnósticos o tratamientos.
                    </p>
                </div>

                <div className="mb-5">
                    <h3 style={{ color: '#04a658', fontFamily: "'Trebuchet MS', sans-serif" }}>7. Modificaciones</h3>
                    <p style={{ color: '#555', textAlign: 'justify' }}>
                    Nos reservamos el derecho de modificar estos términos. Las actualizaciones serán notificadas y entrarán en vigor 30 días después de su publicación.
                    </p>
                </div>

                <div className="mb-5">
                    <h3 style={{ color: '#04a658', fontFamily: "'Trebuchet MS', sans-serif" }}>8. Jurisdicción</h3>
                    <p style={{ color: '#555', textAlign: 'justify' }}>
                        Estos términos se rigen por las leyes de la República Argentina. 
                        Ante cualquier conflicto, las partes se someten a la jurisdicción de los tribunales ordinarios de la Ciudad Autónoma de Buenos Aires, renunciando a cualquier otro fuero o jurisdicción que pudiera corresponder.
                    </p>
                </div>

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

export default TerminosCondiciones;