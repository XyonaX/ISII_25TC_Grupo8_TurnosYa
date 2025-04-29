import React from "react";

// ObraSocialInput.tsx
interface Props {
    value: string;
    onChange: (value: string) => void;
    obrasSociales: {_id: string, nombre_obra_social: string}[];
    error?: string;
}

const ObraSocialInput: React.FC<Props> = ({
    value,
    onChange,
    obrasSociales,
    error,
}) => (
    <div className='mb-4'>
        <label className='form-label'>Obra Social</label>
        <select
            className='form-control'
            name='id_obra_social'
            required
            value={value}
            onChange={(e) => onChange(e.target.value)}
        >
            <option value=''>Seleccione una obra social</option>
            {obrasSociales.map((obra) => (
                <option key={obra._id} value={obra._id}>
                    {obra.nombre_obra_social}
                </option>
            ))}
        </select>
        {error && <small className='text-danger'>{error}</small>}
    </div>
);
export default ObraSocialInput;
