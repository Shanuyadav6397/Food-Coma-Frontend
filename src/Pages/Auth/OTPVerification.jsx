import { Link } from "react-router-dom";

function OTPVerification({ otp, handleOTPChange, handleOTPSubmit }) {
  return (
    <section className="text-gray-600 body-font">
      <div className="flex flex-col items-center h-screen px-10 py-6 mx-auto">
        <h2 className="mb-5 font-medium text-2xl text-gray-900 title-font">
          Verify Your OTP
        </h2>
        <form
          onSubmit={handleOTPSubmit}
          className="flex flex-col w-full p-8 mt-10 bg-gray-100 rounded-lg lg:w-2/6 md:w-1/2"
        >
          {/* Hidden input to store the email */}
          <input
            type="hidden"
            name="email"
            id="email"
            value={otp.email}
          />
          <div className="relative mb-4">
            <label htmlFor="otp" className="text-sm leading-7 text-gray-600">
              OTP
            </label>
            <input
              type="text"
              name="otp"
              id="otp"
              // value={otp}
              onChange={handleOTPChange}
              placeholder="Enter OTP"
              className="w-full px-3 py-1 mt-2 text-base leading-8 text-gray-700 transition-colors duration-200 ease-in-out border border-gray-300 rounded outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200"
            />
          </div>
          <button
            type="submit"
            className="w-full px-8 py-2 mt-4 text-lg text-white bg-yellow-500 border-0 rounded focus:outline-none hover:bg-yellow-600"
          >
            Verify OTP
          </button>
        </form>
        <p className="mt-3 text-xs text-gray-500">
          Didn't receive OTP?{" "}
          <Link to="#" className="text-yellow-500">
            Resend OTP
          </Link>
        </p>
      </div>
    </section>
  );
}

export default OTPVerification;