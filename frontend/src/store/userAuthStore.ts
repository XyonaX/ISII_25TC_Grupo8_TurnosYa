import { create } from 'zustand';

type User = {
    _id: string;
    nombre_usuario: string;
    apellido_usuario: string;
    tipo_usuario: string;
    calle_usuario: string;
    cod_postal: string;
    dni_usuario: string;
    fecha_nac_usuario: string | Date;
    num_usuario: string;
    email_usuario: string;
    celular_usuario: string;
};

type AuthState = {
    user: User | null;
    setUser: (user: User | null) => void;
};


export const useAuthStore = create<AuthState>((set) => ({
    user: JSON.parse(localStorage.getItem('user') || 'null'),
    setUser: (user) => {
        if(user) {
            localStorage.setItem('user', JSON.stringify(user));
        }else{
            localStorage.removeItem('user');
        }

        set({ user });
    },
}));