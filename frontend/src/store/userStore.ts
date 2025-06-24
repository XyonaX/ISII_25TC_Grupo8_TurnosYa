import { create } from "zustand";
import { persist } from "zustand/middleware";
import { LoginData, RegisterFormData } from "../types/userTypes";
import { authService } from "../services/userServices";

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

type UserState = {
    user: User | null;
    error: string | null;
    loading: boolean;
    login: (data: LoginData) => Promise<void>;
    register: (data: RegisterFormData) => Promise<void>;
    logout: () => void;
    setUser: (user: User | null) => void;
};

export const useUserStore = create<UserState>()(
    persist(
        (set) => ({
            user: null,
            error: null,
            loading: false,
            setUser: (user) => set({ user }),
            register: async (data) => {
                try {
                    set({ loading: true, error: null });
                    const response = await authService.register(data);
                    set({ user: response.user, loading: false }); // Ajustá según tu backend
                } catch (err: any) {
                    set({
                        error:
                            err?.response?.data?.message || "Error en registro",
                        loading: false,
                    });
                }
            },
            login: async (data) => {
                try {
                    set({ loading: true, error: null });
                    const response = await authService.login(data);
                    set({ user: response.data.user, loading: false });
                    return response.data; // <- devolver user y token si querés
                } catch (err: any) {
                    set({
                        error:
                            err?.response?.data?.message ||
                            "Error al iniciar sesión",
                        loading: false,
                    });
                    throw err;
                }
            },
            logout: () => {
                set({ user: null, error: null, loading: false });
                localStorage.removeItem("user-storage");
            },
        }),
        {
            name: "user-storage",
            partialize: (state) => ({ user: state.user }),
        }
    )
);
