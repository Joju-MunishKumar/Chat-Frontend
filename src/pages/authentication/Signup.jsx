import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { IoKeySharp } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUserThunk } from "../../store/slice/user/user.thunk";
import toast from "react-hot-toast";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.userReducer);
  const [signupData, setSignupData] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "male",
  });

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated]);

  const handleInputChange = (e) => {
    setSignupData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSignup = async () => {
    if (signupData.password !== signupData.confirmPassword) {
      return toast.error("Password and confirm password do not match");
    }
    const response = await dispatch(registerUserThunk(signupData));
    if (response?.payload?.success) {
      navigate("/");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-slate-50 py-12 px-4 sm:px-6">
      <div className="absolute inset-0 h-full w-full bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

      <div className="relative w-full max-w-[40rem] bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-8 sm:p-10">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight">
            Create an Account
          </h2>
          <p className="text-slate-500 text-sm mt-2">
            Join us today! Enter your details below.
          </p>
        </div>

        <div className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaUser className="text-slate-400 text-sm" />
              </div>
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all duration-200 text-slate-700 placeholder-slate-400"
                onChange={handleInputChange}
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaUser className="text-slate-400 text-sm" />
              </div>
              <input
                type="text"
                name="username"
                placeholder="Username"
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all duration-200 text-slate-700 placeholder-slate-400"
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <IoKeySharp className="text-slate-400 text-lg" />
              </div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all duration-200 text-slate-700 placeholder-slate-400"
                onChange={handleInputChange}
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <IoKeySharp className="text-slate-400 text-lg" />
              </div>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all duration-200 text-slate-700 placeholder-slate-400"
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="flex items-center justify-center p-4 bg-slate-50 rounded-lg border border-slate-200">
            <span className="text-sm text-slate-500 mr-6 font-medium">Gender:</span>
            <div className="flex gap-6">
              <label htmlFor="male" className="flex items-center gap-2 cursor-pointer group">
                <div className="relative flex items-center">
                  <input
                    id="male"
                    type="radio"
                    name="gender"
                    value="male"
                    className="peer h-4 w-4 cursor-pointer appearance-none rounded-full border border-slate-300 checked:border-slate-900 checked:bg-slate-900 transition-all"
                    defaultChecked
                    onChange={handleInputChange}
                  />
                  <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 peer-checked:opacity-100">
                    <div className="h-1.5 w-1.5 rounded-full bg-white"></div>
                  </div>
                </div>
                <span className="text-sm text-slate-600 group-hover:text-slate-900 transition-colors">Male</span>
              </label>

              <label htmlFor="female" className="flex items-center gap-2 cursor-pointer group">
                <div className="relative flex items-center">
                  <input
                    id="female"
                    type="radio"
                    name="gender"
                    value="female"
                    className="peer h-4 w-4 cursor-pointer appearance-none rounded-full border border-slate-300 checked:border-slate-900 checked:bg-slate-900 transition-all"
                    onChange={handleInputChange}
                  />
                  <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 peer-checked:opacity-100">
                    <div className="h-1.5 w-1.5 rounded-full bg-white"></div>
                  </div>
                </div>
                <span className="text-sm text-slate-600 group-hover:text-slate-900 transition-colors">Female</span>
              </label>
            </div>
          </div>
        </div>

        <button
          onClick={handleSignup}
          className="w-full mt-8 bg-slate-900 text-white font-medium py-3 rounded-lg hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-900/20 active:scale-[0.98] transition-all duration-200 shadow-lg shadow-slate-900/20"
        >
          Sign Up
        </button>

        <div className="mt-6 text-center">
          <p className="text-sm text-slate-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;