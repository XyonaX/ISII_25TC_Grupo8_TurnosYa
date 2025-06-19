import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
}

export const MedicoPage = () => {
    const BASE_URL_API = import.meta.env.VITE_BASE_URL_API;

    const { id } = useParams<{ id: string }>();
    const [medico, setMedico] = useState<Medico | null>(null);
    const [turnos, setTurnos] = useState<Turno[]>([]);
    const [motivo, setMotivo] = useState<string>("");
    const [turnoSeleccionado, setTurnoSeleccionado] = useState<string>("");

    useEffect(() => {
        fetch(`${BASE_URL_API}/medico/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setMedico(data.data);
                console.log("Médico:", data.data);
            });
    }, []);

    return (
        <div className='container mt-4'>
            <h2>{medico?.nombre}</h2>
            <p>
                <strong>Especialidades:</strong>{" "}
                {medico?.especialidad.join(", ")}
            </p>
            <p>
                <strong>Obras Sociales:</strong> {medico?.obraSocial.join(", ")}
            </p>

            <h4>Turnos disponibles</h4>
            {turnos.length === 0 ? (
                <p>No hay turnos disponibles en este momento</p>
            ) : (
                <ul className='list-group'>
                    {turnos.map((t) => (
                        <li
                            key={t._id}
                            className={`list-group-item ${
                                turnoSeleccionado === t._id ? "active" : ""
                            }`}
                            onClick={() => setTurnoSeleccionado(t._id)}
                            style={{ cursor: "pointer" }}
                        >
                            {t.fecha_turno} - {t.hora_turno}
                        </li>
                    ))}
                </ul>
            )}

            {turnoSeleccionado && (
                <>
                    <h4 className='mt-3'>Motivo (opcional)</h4>
                    <input
                        type='text'
                        className='form-control mb-2'
                        value={motivo}
                        onChange={(e) => setMotivo(e.target.value)}
                    />
                    <button className='btn btn-primary' onClick={handleAgendar}>
                        Confirmar turno
                    </button>
                </>
            )}
        </div>
    );
};
