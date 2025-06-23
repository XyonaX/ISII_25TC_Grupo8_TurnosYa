import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/userAuthStore";


const PublicRoutes = ({ children }: {children: JSX.Element}) => {
    const user = useAuthStore((state) => state.user);

    if(user){
        return <Navigate to="/" replace />;
    }

    return children;
}

export default PublicRoutes;