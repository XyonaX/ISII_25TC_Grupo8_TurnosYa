import React from "react";

interface Props {
    tipo: "paciente" | "medico";
    tipoActual: "paciente" | "medico";
    onSelect: (tipo: "paciente" | "medico") => void;
}

const TipoUsuarioButton: React.FC<Props> = ({ tipo, tipoActual, onSelect }) => (
    <button
        type='button'
        className={`btn ${
            tipoActual === tipo ? "btn-success" : "btn-outline-success"
        } mx-2`}
        onClick={() => onSelect(tipo)}
    >
        {tipo === "paciente" ? "Paciente" : "Médico"}
    </button>
);

export default TipoUsuarioButton;
