import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

function RequireAdmin({ adminRole }) {
    const { isLoggedIn } = useSelector(state => state.auth);
    const { role } = useSelector(state => state.auth);
    console.log(role);
    console.log(adminRole);
    if (isLoggedIn && role !== adminRole) {
        toast.error('You are not authorized to view this page');
        return <Navigate to="/denied" />;
    }
    return isLoggedIn && role === adminRole ? <Outlet /> :  <Navigate to="/denied" />;
}


export default RequireAdmin;