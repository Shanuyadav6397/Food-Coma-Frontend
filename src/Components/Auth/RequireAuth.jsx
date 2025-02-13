import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function RequireAuth() {
    const { isLoggedIn } = useSelector(state => state.auth);
    if (!isLoggedIn) {
        toast.error('You need to login to view this page');
        return <Navigate to="/auth/login" />;
    }
    return isLoggedIn ? <Outlet /> : <Navigate to="/auth/login" />;
}


export default RequireAuth;