import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { login } from "../../Redux/Slices/AuthSlice.js";
import LoginPresentation from "./LoginPresentation.jsx";
import { useNavigate } from "react-router-dom";

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loginState, setLoginState] = useState({
        email: "",
        password: ""
    });

    function handelUserInput(event) {
        const {name, value} = event.target;
        console.log(event.target);
        setLoginState({
            ...loginState,
            [name]: value
        });
    }

    async function handleSubmit(event) {
        event.preventDefault(); // Prevents the form from submitting via GET request
        // Add validation here
        if (loginState.email === "" || loginState.password === "") {
            toast.error("Missing vslues from the form");
            return;
        }

        // Check if the email is valid
        if (loginState.email.indexOf("@") === -1) {
            toast.error("Invalid email address");
            return;
        }
        const apiResponse = await dispatch(login(loginState));
        //console.log("API Response", apiResponse);
        if (apiResponse.payload?.success) {
            navigate("/");
        }
    }

    return (
        <LoginPresentation
            handelUserInput={handelUserInput}
            handleSubmit={handleSubmit}
        />
    )
}


export default Login;