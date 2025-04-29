import { create } from "zustand";
import {
    LoginData,
    RegisterFormData,
    UsuarioResponse,
} from "../types/userTypes";
import { authService } from "../services/userServices";

interface UserState {
    user: UsuarioResponse | null;
    error: string | null;
    loading: boolean;
    register: (data: RegisterFormData) => Promise<void>;
    login: (data: LoginData) => Promise<void>;
    logout: () => void;
}

export const useUserStore = create<UserState>((set) => ({
    user: null,
    error: null,
    loading: false,
    register: async (data) => {
        try {
            set({ loading: true, error: null });
            const response = await authService.register(data);
            set({ user: response, loading: false });
        } catch (err: any) {
            set({
                error: err?.response?.data?.message || "Error en registro",
                loading: false,
            });
        }
    },
    login: async (data) => {
        try {
            set({ loading: true, error: null });
            const response = await authService.login(data);
            set({ user: response, loading: false });
        } catch (err: any) {
            set({
                error:
                    err?.response?.data?.message || "Error al iniciar sesión",
                loading: false,
            });
        }
    },

    logout: () => {
        set({ user: null, error: null, loading: false});
    }
}));
