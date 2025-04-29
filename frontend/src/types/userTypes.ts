// Tipos base
export interface UsuarioBase {
  _id?: string;
  dni_usuario: string;
  nombre_usuario: string;
  apellido_usuario: string;
  fecha_nac_usuario: Date | string;
  celular_usuario: string;
  email_usuario: string;
  calle_usuario: string;
  num_usuario: string;
  dpto_usuario?: string;
  cod_postal: string;
  id_ciudad: string; // ObjectId como string
  id_estado_usuario: string; // ObjectId como string
  createdAt?: Date;
  updatedAt?: Date;
}

export interface PacienteData {
  id_obra_social: string; // ObjectId como string
}

export interface MedicoData {
  matricula_medico: string;
  obras_sociales: string[]; // Array de ObjectIds como strings
  especialidades: string[]; // Array de ObjectIds como strings
}

// Tipos para respuestas
export interface UsuarioResponse extends UsuarioBase {
  tipo_usuario?: "paciente" | "medico";
}

export interface PacienteResponse extends UsuarioResponse, PacienteData {}
export interface MedicoResponse extends UsuarioResponse, MedicoData {}

// Tipo para formulario de registro
export interface RegisterErrors extends Partial<RegisterFormData> {
  general?: string;
}
export type RegisterFormData = Omit<
  UsuarioBase,
  "_id" | "createdAt" | "updatedAt"
> & {
  clave_usuario: string;
  tipo_usuario: "paciente" | "medico";
} & Partial<PacienteData> &
  Partial<MedicoData>;

// Tipo para login
export interface LoginData {
  email_usuario: string;
  clave_usuario: string;
}

// Tipo para estado de usuario
export interface EstadoUsuario {
  _id: string;
  nombre_estado_usuario: string;
}
