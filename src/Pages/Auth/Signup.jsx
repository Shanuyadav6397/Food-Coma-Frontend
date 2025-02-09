import { useState } from "react";
import toast from "react-hot-toast";
import SignupPresentation from "./SignupPresentation";
import { useDispatch } from "react-redux";
import { createAccount } from "../../Redux/Slices/AuthSlice";
import { useNavigate } from "react-router-dom";


// Container Component
function Signup() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [signupState, setSignupState] = useState({
        firstName: "",
        email: "",
        mobileNumber: "",
        password: ""
    });

    function handelUserInput(event) {
        const { name, value } = event.target;
        setSignupState({
            ...signupState,
            [name]: value
        })
    }

    async function handleSubmit(event) {
        event.preventDefault(); // Prevents the form from reloading the page
        console.log(signupState);
        // Add validation here
        if (signupState.firstName === "" || signupState.email === "" || signupState.mobileNumber === "" || signupState.password === "") {
            toast.error("Missing vslues from the form");
            return;
        }
        // Check if the first name is between 5 and 20 characters
        if (signupState.firstName.length < 5) {
            toast.error("First name should be atleast 5 characters");
            return;
        } else if (signupState.firstName.length > 20) {
            toast.error("First name should be less than 20 characters");
            return;
        }

        // Check if the email is valid
        if (signupState.email.indexOf("@") === -1) {
            toast.error("Invalid email address");
            return;
        }

        // Check if the mobile number is valid
        if (signupState.mobileNumber.length < 10 || signupState.mobileNumber.length > 12) {
            toast.error("Mobile number should be between 10 and 12 characters");
            return;
        } else if (signupState.mobileNumber[0] === "0") {
            toast.error("Mobile number should not start with 0");
            return;
        } else if (isNaN(signupState.mobileNumber)) {
            toast.error("Mobile number should be a number");
            return;
        }

        const apiResponse = await dispatch(createAccount(signupState));
        console.log("API Response", apiResponse);
        if (apiResponse.payload.success) {
            navigate('/auth/login');
        }
    }

    return (
        <SignupPresentation
            handelUserInput={handelUserInput}
            handleSubmit={handleSubmit}
        />
    )
}


export default Signup;