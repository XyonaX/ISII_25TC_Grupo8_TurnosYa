import React from 'react';
import { Link } from 'react-router-dom';

const SobreNosotros = () => {
    return (
        <div className="container py-5" style={{ minHeight: 'calc(100vh - 245px)' }}>
        <div className="row justify-content-center">
            <div className="col-lg-8">
            <div className="card shadow border-0" style={{ borderRadius: '15px', border: '2px solid #04a658' }}>
                <div className="card-body p-4 p-md-5">
                <h1 className="text-center mb-4" style={{ fontFamily: "'Trebuchet MS', sans-serif" }}>
                    <span style={{ color: '#ae5bbf' }}>Sobre</span>
                    <span style={{ color: '#04a658' }}> Nosotros</span>
                </h1>
                
                <div className="mb-4">
                    <h3 style={{ color: '#04a658', fontFamily: "'Trebuchet MS', sans-serif" }}>
                    Nuestra Misión
                    </h3>
                    <p className="text-justify" style={{ color: '#555', lineHeight: '1.8' }}>
                    En TurnosYa, nos dedicamos a simplificar la gestión de turnos médicos, conectando pacientes con profesionales de la salud de manera rápida, segura y eficiente. Nuestra plataforma elimina las largas esperas telefónicas y las dificultades para encontrar especialistas disponibles.
                    </p>
                </div>

                <div className="mb-4">
                    <h3 style={{ color: '#04a658', fontFamily: "'Trebuchet MS', sans-serif" }}>
                    ¿Cómo Funciona?
                    </h3>
                    <div className="row g-4">
                    <div className="col-md-6">
                        <div className="p-3" style={{ backgroundColor: '#f9fffb', borderRadius: '10px' }}>
                        <h5 style={{ color: '#ae5bbf' }}>Para Pacientes</h5>
                        <ul style={{ color: '#555' }}>
                            <li className="mb-2">Busca médicos por especialidad, zona u obra social</li>
                            <li className="mb-2">Reserva turnos en pocos clics</li>
                            <li className="mb-2">Paga online de forma segura</li>
                            <li>Gestiona tus turnos desde cualquier dispositivo</li>
                        </ul>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="p-3" style={{ backgroundColor: '#f9fffb', borderRadius: '10px' }}>
                        <h5 style={{ color: '#ae5bbf' }}>Para Médicos</h5>
                        <ul style={{ color: '#555' }}>
                            <li className="mb-2">Visualiza tu agenda diaria/semanal</li>
                            <li className="mb-2">Gestiona cancelaciones urgentes</li>
                            <li className="mb-2">Administra tus horarios disponibles</li>
                            <li>Recibe notificaciones de nuevas reservas</li>
                        </ul>
                        </div>
                    </div>
                    </div>
                </div>

                <div className="mb-4">
                    <h3 style={{ color: '#04a658', fontFamily: "'Trebuchet MS', sans-serif" }}>
                    Nuestros Valores
                    </h3>
                    <div className="d-flex flex-wrap justify-content-center gap-3">
                    {['Transparencia', 'Eficiencia', 'Confidencialidad', 'Innovación', 'Accesibilidad'].map((valor, index) => (
                        <span 
                        key={index}
                        className="px-3 py-2"
                        style={{
                            backgroundColor: '#e8f5e9',
                            color: '#04a658',
                            borderRadius: '20px',
                            fontWeight: 'bold'
                        }}
                        >
                        {valor}
                        </span>
                    ))}
                    </div>
                </div>

                <div className="text-center mt-5">
                    <Link to="/registro" className="btn me-3" style={{ 
                    backgroundColor: '#ae5bbf', 
                    color: 'white',
                    borderRadius: '8px',
                    padding: '10px 25px'
                    }}>
                    Regístrate Ahora
                    </Link>
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

export default SobreNosotros;