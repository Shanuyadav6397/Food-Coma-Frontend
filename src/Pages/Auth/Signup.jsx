import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import SignupPresentation from "./SignupPresentation.jsx";
import OTPVerification from "./OTPVerification.jsx";
import { useDispatch } from "react-redux";
import { createAccount, otpHandel } from "../../Redux/Slices/AuthSlice.js";
import { useNavigate } from "react-router-dom";

function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // State for signup form data
  const [signupState, setSignupState] = useState({
    firstName: "",
    email: "",
    mobileNumber: "",
    password: ""
  });

  // State to toggle OTP verification UI
  const [showOTP, setShowOTP] = useState(false);

  // State for OTP input value
  const [otp, setOtp] = useState({
    otp: "",
    email: ""
  });

  // Fetch email from localStorage on mount
  useEffect(() => {
    const storedEmail = localStorage.getItem("userEmail");
    if (storedEmail) {
      setOtp((prev) => ({ ...prev, email: storedEmail }));
    }
  }, []);

  // Update signup form fields
  function handelUserInput(event) {
    const { name, value } = event.target;
    setSignupState((prev) => ({ ...prev, [name]: value }));
  }

  // Handle signup form submission
  async function handleSubmit(event) {
    event.preventDefault();
    console.log("Signup data:", signupState);

    // Save email in localStorage for OTP verification
    localStorage.setItem("userEmail", signupState.email);
    setOtp((prev) => ({ ...prev, email: signupState.email }));

    // Validate form data
    if (
      !signupState.firstName ||
      !signupState.email ||
      !signupState.mobileNumber ||
      !signupState.password
    ) {
      toast.error("Missing values from the form");
      return;
    }
    if (signupState.firstName.length < 5 || signupState.firstName.length > 20) {
      toast.error("First name should be between 5-20 characters");
      return;
    }
    if (!signupState.email.includes("@")) {
      toast.error("Invalid email address");
      return;
    }
    if (
      signupState.mobileNumber.length < 10 ||
      signupState.mobileNumber.length > 12 ||
      signupState.mobileNumber[0] === "0" ||
      isNaN(signupState.mobileNumber)
    ) {
      toast.error("Invalid mobile number");
      return;
    }

    // Dispatch createAccount action (API call)
    const apiResponse = await dispatch(createAccount(signupState));
    console.log("API Response:", apiResponse);

    if (apiResponse.payload.success) {
      setShowOTP(true); // Show OTP verification UI
    } else {
      toast.error("Account creation failed");
    }
  }

  // Update OTP input field value
  function handleOTPChange(event) {
    const { name, value } = event.target;
    setOtp((prev) => ({ ...prev, [name]: value }));
  }

  // Handle OTP submission for verification
  async function handleOTPSubmit(event) {
    event.preventDefault();
    console.log("OTP value:", otp);

    // Validate OTP input
    if (otp.otp.length !== 6 || isNaN(otp.otp)) {
      toast.error("Invalid OTP");
      return;
    }

    // Dispatch OTP verification request
    const apiResponse = await dispatch(otpHandel(otp));
    console.log("OTP Response:", apiResponse);

    if (apiResponse.payload.success) {
      localStorage.removeItem("userEmail"); // Clear stored email after successful verification
      navigate('/auth/login'); // Redirect to login
    } else {
      toast.error("OTP verification failed");
    }
  }

  return (
    <>
      {showOTP ? (
        <OTPVerification
          otp={otp}
          handleOTPChange={handleOTPChange}
          handleOTPSubmit={handleOTPSubmit}
        />
      ) : (
        <SignupPresentation
          handelUserInput={handelUserInput}
          handleSubmit={handleSubmit}
        />
      )}
    </>
  );
}

export default Signup;


// import { useState } from "react";
// import toast from "react-hot-toast";
// import SignupPresentation from "./SignupPresentation.jsx";
// import OTPVerification from "./OTPVerification.jsx"; // New OTP component you'll create
// import { useDispatch } from "react-redux";
// import { createAccount, otpHandel } from "../../Redux/Slices/AuthSlice.js";
// import { useNavigate } from "react-router-dom";

// function Signup() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   // State for signup form data
//   const [signupState, setSignupState] = useState({
//     firstName: "",
//     email: "",
//     mobileNumber: "",
//     password: ""
//   });

  


//   // Update signup form fields
//   function handelUserInput(event) {
//     const { name, value } = event.target;
//     setSignupState({
//       ...signupState,
//       [name]: value
//     });
//   }

//   // Handle the signup form submission
//   async function handleSubmit(event) {
//     event.preventDefault(); // Prevent form from reloading the page
//     console.log("Signup data:", signupState);
//     // Save the email in localStorage to use it in OTP verification
//     localStorage.setItem("userEmail", signupState.email);

//     // Validate form data
//     if (
//       signupState.firstName === "" ||
//       signupState.email === "" ||
//       signupState.mobileNumber === "" ||
//       signupState.password === ""
//     ) {
//       toast.error("Missing values from the form");
//       return;
//     }
//     if (signupState.firstName.length < 5) {
//       toast.error("First name should be at least 5 characters");
//       return;
//     } else if (signupState.firstName.length > 20) {
//       toast.error("First name should be less than 20 characters");
//       return;
//     }
//     if (signupState.email.indexOf("@") === -1) {
//       toast.error("Invalid email address");
//       return;
//     }
//     if (
//       signupState.mobileNumber.length < 10 ||
//       signupState.mobileNumber.length > 12 ||
//       signupState.mobileNumber[0] === "0" ||
//       isNaN(signupState.mobileNumber)
//     ) {
//       toast.error("Invalid mobile number");
//       return;
//     }

//     // Dispatch createAccount action (API call)
//     const apiResponse = await dispatch(createAccount(signupState));
//     console.log("API Response:", apiResponse);

//     if (apiResponse.payload.success) {
//       // If account creation is successful, display OTP UI
//       setShowOTP(true);
//       // Optionally, you can send the OTP on the backend and handle that logic here
//     } else {
//       toast.error("Account creation failed");
//     }
//   }


//   // Update OTP input field value
//   function handleOTPChange(event) {
//     const { name, value } = event.target;
//     setOtp({
//       ...otp,
//       [name]: value
//     });
//   }

//   // Handle OTP submission for verification
//   async function handleOTPSubmit(event) {
//     event.preventDefault();
//     console.log("OTP value:", otp);
//     // Validate OTP
//     if (otp.length !== 6 || isNaN(otp)) {
//       toast.error("Invalid OTP");
//     }
//     const apiResponse = await dispatch(otpHandel({ otp }));
//     console.log("Thunk called");
//     console.log("OTP Response:", apiResponse);
//     console.log("Verifying OTP:", otp);

//     if (apiResponse.payload.success) {
//       navigate('/auth/login');
//     } else {
//       toast.error("OTP verification failed");
//     }

//   }

//   return (
//     <>
//       {showOTP ? (
//         // Render the OTP verification component when showOTP is true
//         <OTPVerification
//           otp={otp}
//           handleOTPChange={handleOTPChange}
//           handleOTPSubmit={handleOTPSubmit}
//         />
//       ) : (
//         // Otherwise, render the signup form
//         <SignupPresentation
//           handelUserInput={handelUserInput}
//           handleSubmit={handleSubmit}
//         />
//       )}
//     </>
//   );
// }

// export default Signup;