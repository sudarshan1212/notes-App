import axios from "axios";
import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Loading from "../components/Loading ";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addUsers } from "../redux/bazarSlice";
// import Error from "../components/Error";
const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  //   const submitHandler = async (e) => {
  //     e.preventDefault();
  //     setLoading(true);

  //     try {
  //       const config = {
  //         headers: {
  //           "Content-type": "application/json",
  //         },
  //       };
  //       const { data } = await axios.post(
  //         "http://localhost:5000/api/users/login",
  //         {
  //           email: formData.email,
  //           password: formData.password,
  //         },
  //         config
  //       );
  //       setLoading(false);
  //       console.log(data);
  //       localStorage.setItem("userInfo", JSON.stringify(data));
  //     } catch (error) {
  //       console.log(error);
  //       setLoading(false);
  //       setError(error.response.data.message);
  //     }
  //   };
  const submitHandler = async (e) => {
    let email = formData.email;
    let password = formData.password;
    e.preventDefault();
    setLoading(true);
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "http://localhost:5000/api/users/login",
        {
          email,
          password,
        },
        config
      );
      setLoading(false);
      toast.success("sucess");

      console.log();
      // const da = await data;
      dispatch(
        addUsers({
          name: data.data.name,
          email: data.data.email,
          token: data.data.token,
        })
      );

      navigate("/notes");
    } catch (err) {
      setLoading(false);
      toast.error(err.response.data.message);
      // console.log(err.response.data.message);
    }
  };
  const add = async (data) => {
    const da = await data;
    console.log(da);
  };

  return (
    <div className="mx-auto max-w-screen-lg mt-10 border px-5 py-10 shadow-lg  bg-gray-200">
      {loading && <Loading />}
      {/* {error && <Error errormessage={error} />} */}

      <h1 className="text-blue-500 text-[22px] leading-9 font-bold mb-10">
        Login
      </h1>
      <div>
        {!loading && (
          <form action="" onSubmit={submitHandler}>
            {" "}
            <label htmlFor="email" className="block text-left">
              Email
            </label>
            <input
              onChange={handleInputChange}
              type="text"
              value={formData.email}
              className="w-full px-2 py-3 border-b  border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-base leading-7 text-headingColor placeholder:text-textColor rounded-md cursor-pointer "
              name="email"
              placeholder="email"
            />
            <label htmlFor="email" className="block mt-5">
              Password
            </label>
            <input
              onChange={handleInputChange}
              type="password"
              value={formData.password}
              className=" mt-5 w-full px-2 py-3 border-b  border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-base leading-7 text-headingColor placeholder:text-textColor rounded-md cursor-pointer "
              name="password"
              placeholder="password"
            />
            <button className=" flex items-center justify-center mt-5 uppercase  font-sans font-semibold text-white bg-blue-600  px-5 py-2 rounded-lg shadow-sm hover:scale-105 duration-150">
              Submit
            </button>
            <p className="mt-5 text-textColor text-center">
              Don&apos;t have an account?{" "}
              <Link
                to="/register"
                className="text-primaryColor font-medium ml-1"
              >
                Register
              </Link>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
