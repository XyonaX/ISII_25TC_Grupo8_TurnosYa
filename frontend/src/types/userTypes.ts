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
  id_ciudad: string;
  id_estado_usuario: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Definición de PacienteData
export interface PacienteData {
  id_obra_social: string;
}

// Definición de MedicoData 
export interface MedicoData {
  matricula_medico: string;
}

// Tipos para relaciones pobladas (si tu backend las popula)
export interface Ciudad {
  _id: string;
  nombre_ciudad: string;
  id_provincia: string | Provincia;
}

export interface Provincia {
  _id: string;
  nombre_provincia: string;
}

export interface Pais {
  _id: string;
  nombre_pais: string;
}

export interface EstadoUsuario {
  _id: string;
  nombre_estado_usuario: string;
}

// Tipos extendidos para respuestas con relaciones pobladas
export interface UsuarioResponse extends UsuarioBase {
  tipo_usuario?: "paciente" | "medico";
}

export interface PacienteResponse extends UsuarioResponse, PacienteData {}
export interface MedicoResponse extends UsuarioResponse, MedicoData {}

// Tipo para formulario de registro 
export type RegisterFormData = Omit<UsuarioBase, "_id" | "createdAt" | "updatedAt"> & {
  clave_usuario: string;
} & (Partial<PacienteData> | Partial<MedicoData>);

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