import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { turnosService } from "../services/turnos";
interface Turno {
    _id: string;
    fecha_turno: string;
    hora_turno: string;
}

interface Medico {
    _id: string;
    nombre: string;
    especialidad: string[];
    obraSocial: string[];
    fotoPerfil?: string;
    reputacion?: number; // de 1 a 5
}

export const MedicoPage = () => {
    const { id } = useParams<{ id: string }>();
    const [medico, setMedico] = useState<Medico | null>(null);
    const [turnos, setTurnos] = useState<Turno[]>([]);
    const [motivo, setMotivo] = useState<string>("");
    const [turnoSeleccionado, setTurnoSeleccionado] = useState<string>("");

    useEffect(() => {
        if (!id) return;

        turnosService.getMedicoById(id).then(setMedico).catch(console.error);
        turnosService
            .getTurnosDisponiblesByMedicoId(id)
            .then(setTurnos)
            .catch(console.error);
    }, [id]);

    const handleAgendar = async () => {
        try {
            const userStr = localStorage.getItem("user");
            if (!userStr) return alert("No hay usuario autenticado");
            const user = JSON.parse(userStr);
            await turnosService.agendarTurno(
                turnoSeleccionado,
                motivo,
                user._id
            );

            alert("Turno agendado correctamente");
            setTurnos((prev) =>
                prev.filter((t) => t._id !== turnoSeleccionado)
            );
            setTurnoSeleccionado("");
            setMotivo("");
        } catch (error: any) {
            alert("Error al agendar el turno: " + error.message);
        }
    };

    const renderStars = (count: number = 0) =>
        Array.from({ length: 5 }, (_, i) => (
            <span
                key={i}
                className={`text-${i < count ? "warning" : "secondary"}`}
            >
                ★
            </span>
        ));

    return (
        <div className='container mt-5'>
            <div className='card p-4 shadow-sm'>
                <div className='row g-4 align-items-center'>
                    <div className='col-md-4 text-center'>
                        <img
                            src='https://cdn-icons-png.freepik.com/256/1513/1513568.png'
                            alt='Perfil del médico'
                            className='img-fluid rounded-circle shadow'
                            style={{
                                width: "200px",
                                height: "200px",
                                objectFit: "cover",
                            }}
                        />
                    </div>

                    <div className='col-md-8'>
                        <h2>{medico?.nombre}</h2>
                        <p>
                            <strong>Especialidades:</strong>{" "}
                            {medico?.especialidad.join(", ")}
                        </p>
                        <p>
                            <strong>Obras Sociales:</strong>{" "}
                            {medico?.obraSocial.join(", ")}
                        </p>
                        <p>
                            <strong>Reputación:</strong>{" "}
                            {renderStars(medico?.reputacion)}
                        </p>
                    </div>
                </div>
            </div>

            <div className='mt-4'>
                <h4 className='mb-3'>Turnos disponibles</h4>
                {turnos.length === 0 ? (
                    <p>No hay turnos disponibles en este momento</p>
                ) : (
                    <div className='d-flex flex-wrap gap-3'>
                        {turnos.map((t) => {
                            const fecha = new Date(t.fecha_turno);
                            const fechaTexto = fecha.toLocaleDateString(
                                "es-AR",
                                {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                }
                            );

                            const isSelected = turnoSeleccionado === t._id;

                            return (
                                <div
                                    key={t._id}
                                    className={`turno-card ${
                                        isSelected ? "selected" : ""
                                    }`}
                                    onClick={() => setTurnoSeleccionado(t._id)}
                                >
                                    <div className='turno-fecha'>
                                        {fechaTexto}
                                    </div>
                                    <div className='turno-hora'>
                                        {t.hora_turno}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {turnoSeleccionado && (
                <div className='mt-4'>
                    <h5 className='mb-2'>Motivo (opcional)</h5>
                    <input
                        type='text'
                        className='form-control mb-3 shadow-sm'
                        placeholder='¿Cuál es el motivo de la consulta?'
                        value={motivo}
                        onChange={(e) => setMotivo(e.target.value)}
                    />
                    <button
                        className='btn btn-success w-100 py-2 shadow'
                        onClick={handleAgendar}
                    >
                        Confirmar turno
                    </button>
                </div>
            )}
        </div>
    );
};
