import React from "react";

interface Props {
    value: string;
    onChange: (value: string) => void;
    especialidades: string[];
    error?: string;
}

const EspecialidadInput: React.FC<Props> = ({
    value,
    onChange,
    especialidades,
    error,
}) => (
    <div className='mb-4'>
        <label className='form-label'>Especialidad</label>
        <select
            className='form-control'
            name='especialidades'
            required
            value={value}
            onChange={(e) => onChange(e.target.value)}
        >
            <option value=''>Seleccione una especialidad</option>
            {especialidades.map((esp, i) => (
                <option key={i} value={esp}>
                    {esp}
                </option>
            ))}
        </select>
        {error && <small className='text-danger'>{error}</small>}
    </div>
);

export default EspecialidadInput;
