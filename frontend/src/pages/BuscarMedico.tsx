import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import PaginationUI from "../utils/PaginationUI";
import { dataService } from "../services/userServices"; // Importar dataService
import { Especialidad, ObraSocial } from "../types/userTypes"; // Importar tipos
import { useNavigate } from "react-router-dom";
import { turnosService } from "../services/turnos";

interface Medico {
    id: string;
    medico: string;
    especialidad: string;
    obraSocial: string;
    estado: string;
    matricula?: string;
    tieneTurnosDisponibles?: boolean;
}

const BuscarMedico = () => {
    const [medicos, setMedicos] = useState<Medico[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    // Estados para filtros
    const [nombreFiltro, setNombreFiltro] = useState("");
    const [especialidadFiltro, setEspecialidadFiltro] =
        useState("Especialidades");
    const [obraSocialFiltro, setObraSocialFiltro] = useState("Obras Sociales");

    // Obtener opciones únicas para los filtros
    const [especialidadesOptions, setEspecialidadesOptions] = useState<
        string[]
    >([]);
    const [obrasSocialesOptions, setObrasSocialesOptions] = useState<string[]>(
        []
    );
    const [loadingOptions, setLoadingOptions] = useState(true); // Estado de carga para las opciones
    const token = localStorage.getItem("token");
    
    // Estados para paginación
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(8); // Número de médicos por página
    
    // Cargar médicos desde backend
    useEffect(() => {
        const fetchMedicos = async () => {
            try {
                setLoading(true);
                setLoadingOptions(true);

                // Usar dataService.getMedicos() en lugar de axios.get directo
                const medicosResponse = await dataService.getMedicos();
                
                

                let medicosConTurnos;
                if (!token) {
                    // Si no hay token, marcamos que no hay turnos disponibles
                    medicosConTurnos = medicosResponse.map((m) => ({
                        ...m,
                        tieneTurnosDisponibles: false,
                    }));
                } else {
                    // Si hay token, consultamos los turnos disponibles de cada médico
                    medicosConTurnos = await Promise.all(
                        medicosResponse.map(async (medico) => {
                            try {
                                const turnosDisponibles =
                                    await turnosService.getTurnosDisponiblesByMedicoId(
                                        medico.id
                                    );
                                return {
                                    ...medico,
                                    tieneTurnosDisponibles:
                                        turnosDisponibles.length > 0,
                                };
                            } catch (err) {
                                console.error(
                                    `Error al verificar turnos para el médico ${medico.id}`,
                                    err
                                );
                                return {
                                    ...medico,
                                    tieneTurnosDisponibles: false,
                                };
                            }
                        })
                    );
                }

                setMedicos(medicosConTurnos);
                
                // Cargar especialidades
                const uniqueEspecialidades = Array.from(
                    new Set(
                        medicosResponse.map((medico) => medico.especialidad)
                    )
                );
                setEspecialidadesOptions(uniqueEspecialidades);

                // Cargar obras sociales
                const uniqueObrasSociales = Array.from(
                    new Set(medicosResponse.map((medico) => medico.obraSocial))
                );
                setObrasSocialesOptions(uniqueObrasSociales);
            } catch (err) {
                console.error("Error al traer los médicos:", err);
                setError(
                    "Error al cargar los médicos. Intente nuevamente más tarde."
                );
            } finally {
                setLoading(false);
                setLoadingOptions(false); // Finalizar carga de opciones
            }
        };

        fetchMedicos();
    }, []);
    

    // Lógica de filtrado actualizada
    const medicosFiltrados = medicos.filter((medico) => {
        const coincideNombre = medico.medico
            .toLowerCase()
            .includes(nombreFiltro.toLowerCase());
        const coincideEspecialidad =
        especialidadFiltro === "Todas" || especialidadFiltro === "Especialidades" ||
        medico.especialidad === especialidadFiltro;

    const coincideObraSocial =
        obraSocialFiltro === "Todas" || obraSocialFiltro === "Obras Sociales" ||
        medico.obraSocial === obraSocialFiltro;

        return coincideNombre && coincideEspecialidad && coincideObraSocial;
    });

    // Cálculo de médicos a mostrar
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentMedicos = medicosFiltrados.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(medicosFiltrados.length / itemsPerPage);

    // Función para cambiar de página
    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Opcional: scroll al inicio
    };

     // Mostrar spinner si se está cargando médicos O las opciones de los dropdowns
    if (loading || loadingOptions) {
        return (
            <div className='container text-center mt-5'> 
                <div className='spinner-border text-primary' role='status'>
                    <span className='visually-hidden'>Cargando...</span>
                </div>
                <p>Cargando médicos...</p>
            </div>
        );
    }

    if (error) {
        return <div className='container alert alert-danger mt-5'>{error}</div>;
    }

    return (
        <div className='container container-formulario p-6 mb-5 mt-5'>
            <div className='row justify-content-center'>
                <div className='col-md-12 col-lg-10'>
                    <div className='card shadow-lg border-0 card-formulario'>
                        <div className='card-body p-4 row'>
                            <h2 className='card-title text-center mb-4 card-titulo'>
                                <span className='text-iniciar'>Buscar</span>
                                <span className='text-sesion'> Médicos</span>
                            </h2>

                            {/* Input de búsqueda por nombre */}
                            <div className='row mb-4 justify-content-center'>
                                <div className='col-auto'>
                                    <input
                                        type='text'
                                        className='form-control'
                                        placeholder='Buscar por nombre/apellido'
                                        value={nombreFiltro}
                                        onChange={(e) => {
                                            const valor = e.target.value;
                                            // Solo permite letras (mayúsculas/minúsculas) y espacios
                                            if (/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/.test(valor)) {
                                                setNombreFiltro(valor);
                                            }
                                        }}
                                        style={{
                                            borderRadius: "8px",
                                            border: "2px solid #ae5bbf",
                                            height: "40px",
                                            minWidth: "300px",
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Filtros adicionales */}
                            <div className='container d-flex flex-column align-items-center'>
                                <div className='col-auto d-flex justify-content-center gap-4 mb-2'>
                                
                                    {/* Especialidades */}
                                    <div className='d-flex align-items-center'>
                                        <label
                                            htmlFor='especialidadSelect'
                                            className='form-label label-formulario me-2 mb-0'
                                        >
                                            Especialidad:
                                        </label>
                                        <select
                                            id='especialidadSelect'
                                            className='form-select form-select-sm input-formulario'
                                            value={especialidadFiltro}
                                            onChange={(e) => setEspecialidadFiltro(e.target.value)}
                                            style={{
                                                borderRadius: "8px",
                                                border: "2px solid #ae5bbf",
                                                height: "40px",
                                            }}
                                        >
                                            <option value='Todas'>Todas</option>
                                            {especialidadesOptions.map((esp) => (
                                                <option key={esp} value={esp}>
                                                    {esp}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Obras Sociales */}
                                    <div className='d-flex align-items-center'>
                                        <label
                                            htmlFor='obraSocialSelect'
                                            className='form-label label-formulario  me-2 mb-0'
                                        >
                                            Obra Social:
                                        </label>
                                        <select
                                            id='obraSocialSelect'
                                            className='form-select form-select-sm input-formulario'
                                            value={obraSocialFiltro}
                                            onChange={(e) => setObraSocialFiltro(e.target.value)}
                                            style={{
                                                borderRadius: "8px",
                                                border: "2px solid #ae5bbf",
                                                height: "40px",
                                            }}
                                        >
                                            <option value='Todas'> Todas</option>
                                            {obrasSocialesOptions.map((obra) => (
                                                <option key={obra} value={obra}>
                                                    {obra}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className='container'>
                                    <div className='row justify-content-center'>
                                        {medicosFiltrados.length > 0 ? (
                                            currentMedicos.map((medico) => (
                                                <div
                                                    key={medico.id}
                                                    className='col-12 col-sm-6 col-md-4 col-lg-3 mb-4 d-flex'
                                                >
                                                    <div className='card h-100 w-100 shadow-sm'>
                                                        <div className='position-relative'>
                                                            <img
                                                                src='https://cdn-icons-png.freepik.com/256/1513/1513568.png'
                                                                className='card-img-top'
                                                                alt='Imagen del médico'
                                                                style={{ height: "200px", objectFit: "cover" }}
                                                            />
                                                            {token && (
                                                                <span
                                                                className={`badge position-absolute top-0 end-0 m-2 ${
                                                                    medico.tieneTurnosDisponibles ? "bg-success" : "bg-danger"
                                                                }`}
                                                                style={{
                                                                    padding: "0.5em 0.75em",
                                                                    fontSize: "0.8rem",
                                                                    borderRadius: "10px",
                                                                }}
                                                                >
                                                                {medico.tieneTurnosDisponibles ? "Turnos disponibles" : "Sin turnos"}
                                                                </span>
                                                            )}
                                                            </div>
                                                        <div className='card-body d-flex flex-column'>
                                                            <h5 className='card-title'>
                                                                {medico.medico}
                                                            </h5>
                                                            <h6
                                                                className='card-subtitle mb-2'
                                                                style={{
                                                                    color: "#9a4aad",
                                                                    fontWeight:
                                                                        "bold",
                                                                }}
                                                            >
                                                                {
                                                                    medico.especialidad
                                                                }
                                                            </h6>
                                                            <p
                                                                className='card-text mb-1'
                                                                style={{
                                                                    fontSize:
                                                                        "14px",
                                                                }}
                                                            >
                                                                <strong>
                                                                    Obra Social:
                                                                </strong>{" "}
                                                                {
                                                                    medico.obraSocial
                                                                }
                                                            </p>
                                                            <div className='mt-auto'>
                                                                <button className='btn btn-outline-success btn-sm w-100'
                                                                onClick={() => navigate(`/medico/${medico.id}`)}
                                                                >
                                                                    Consultar
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className='col-12'>
                                                <div className='alert alert-info text-center'>
                                                    No se encontraron médicos
                                                    con los filtros aplicados
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Componente de paginación */}
                            <PaginationUI
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                                disabled={false}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BuscarMedico;
