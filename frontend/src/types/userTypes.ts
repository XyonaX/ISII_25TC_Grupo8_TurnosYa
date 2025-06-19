export interface UsuarioBase {
  _id?: string;
  dni_usuario: string;
  nombre_usuario: string;
  apellido_usuario: string;
  fecha_nac_usuario: Date | string;
  celular_usuario: string;
  email_usuario: string;
  clave_usuario?: string; // Solo para creación/actualización
  calle_usuario: string;
  num_usuario: string;
  dpto_usuario?: string;
  cod_postal: string;
  tipo_usuario: "paciente" | "medico";
  id_ciudad: string;
  id_estado_usuario: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Definición de PacienteData
export interface PacienteData {
  id_obra_social?: string;
}

// Definición de MedicoData 
export interface MedicoData {
  matricula_medico: string;
  especialidades?: string[];
}

export interface Medico {
  id: string; // Corresponde al _id del usuario/médico
  nombreCompleto: string; // Corresponde al campo 'medico' del pipeline (nombre + apellido)
  especialidad: string; // Corresponde al campo 'especialidad' del pipeline (nombre de la especialidad)
  obraSocial: string; // Corresponde al campo 'obraSocial' del pipeline (nombre de la obra social)
  estado: string; // Corresponde al campo 'estado' del pipeline (nombre del estado)
  matricula?: string; // Corresponde al campo 'matricula' del pipeline
}

// Tipos para relaciones pobladas (si tu backend las popula)
export interface Ciudad {
  _id: string;
  nombre_ciudad: string;
  provincia?: {
    _id: string;
    nombre_provincia: string;
    pais?: {
      _id: string;
      nombre_pais: string;
    };
  };
}

export interface ObraSocial {
  _id: string;
  nombre_obra_social: string;
  codigo?: string;
}

export interface Especialidad {
  _id: string;
  nombre_especialidad: string;
}

export interface EstadoUsuario {
  _id: string;
  nombre_estado_usuario: string;
}

// Tipos extendidos para respuestas con relaciones pobladas
export interface UsuarioResponse extends Omit<UsuarioBase, 'id_ciudad' | 'id_estado_usuario'> {
  id_ciudad?: Ciudad; // Objeto poblado
  id_estado_usuario?: EstadoUsuario; // Objeto poblado
}

export interface PacienteResponse extends UsuarioResponse, PacienteData {
  tipo_usuario: "paciente";
}

export interface MedicoResponse extends UsuarioResponse, MedicoData {
  tipo_usuario: "medico";
}
// Tipo para formulario de registro 
export type RegisterFormData = Omit<UsuarioBase, "_id" | "createdAt" | "updatedAt"> & {
  clave_usuario: string;
} & {
  id_obra_social?: string;
  matricula_medico?: string;
  especialidades?: string[];
};

// Tipo para login
export interface LoginData {
  email_usuario: string;
  clave_usuario: string;
}

// Tipo para errores de registro
export type RegisterErrors = Partial<Record<keyof Omit<RegisterFormData, 'id_ciudad' | 'id_estado_usuario'>, string>> & {
  id_ciudad?: { message: string };
  id_estado_usuario?: { message: string };
  general?: string;
};