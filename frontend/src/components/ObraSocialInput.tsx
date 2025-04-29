import React from "react";

interface Props {
    value: string;
    onChange: (value: string) => void;
    obrasSociales: string[];
}

const ObraSocialInput: React.FC<Props> = ({
    value,
    onChange,
    obrasSociales,
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
            {obrasSociales.map((obra, i) => (
                <option key={i} value={obra}>
                    {obra}
                </option>
            ))}
        </select>
    </div>
);

export default ObraSocialInput;
