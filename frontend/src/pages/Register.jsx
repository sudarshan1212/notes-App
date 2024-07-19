import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Error from "../components/Error";
import axios from "axios";
import Loading from "../components/Loading ";
import uplaodImageToCloudinary from "../utils/uploadCloudinary";

const Register = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    pic: selectedFile,
  });

  const [error, seterror] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();
  const handleFileInputChange = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    const data = await uplaodImageToCloudinary(file);
    // console.log(data.url);
    setSelectedFile(data.url);

    setFormData({ ...formData, pic: data.url });
  };
  const submitHandler = async (e) => {
    e.preventDefault();

    // console.log(formData.pic);
    if (formData.password != formData.confirmPassword) {
      toast.error("password did't match");
      seterror(true);
      setMessage("password didtnt match");
    } else {
      seterror(false);
      setMessage(null);
      setLoading(true);

      try {
        const config = {
          headers: {
            "Content-type": "application/json",
          },
        };
        const { data } = await axios.post(
          "http://localhost:5000/api/users",
          {
            name: formData.name,
            pic: formData.pic,
            email: formData.email,
            password: formData.password,
          },
          config
        );
        setLoading(false);
        // console.log(data);
        toast.success("sucess");
        localStorage.setItem("userInfo", JSON.stringify(data));
        navigate("/mynotes");
      } catch (err) {
        setLoading(false);
        setMessage(err.response.data.message);
        toast.error(err.response.data.message);
        console.log(err.response.data.message);
      }
    }
  };
  return (
    <div className="mx-auto max-w-screen-lg mt-10 border shadow-lg px-5 py-10">
      {error && <Error errormessage={message} />}
      {loading && <Loading />}

      {!loading && (
        <form action="" onSubmit={submitHandler}>
          {" "}
          <label htmlFor="email" className="block mt-5">
            Name
          </label>
          <input
            onChange={handleInputChange}
            type="text"
            value={formData.name}
            className=" mt-5 w-full px-2 py-3 border-b  border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-base leading-7 text-headingColor placeholder:text-textColor rounded-md cursor-pointer "
            name="name"
            placeholder="Enter Name"
          />
          <label htmlFor="email" className="block text-left mt-2">
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
          <label htmlFor="email" className="block mt-5">
            Confirm Password
          </label>
          <input
            onChange={handleInputChange}
            type="password"
            value={formData.confirmPassword}
            className=" mt-5 w-full px-2 py-3 border-b  border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-base leading-7 text-headingColor placeholder:text-textColor rounded-md cursor-pointer "
            name="confirmPassword"
            placeholder="confirmpassword"
          />
          <label htmlFor="email" className="block mt-5">
            Profile Picture
          </label>
          <input
            type="file"
            className=" mt-5 w-full px-2 py-3 border-b  border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-base leading-7 text-headingColor placeholder:text-textColor rounded-md cursor-pointer "
            name="pic"
            accept=".jpg,.png"
            onChange={handleFileInputChange}
            placeholder="prffile"
          />
          <button className=" flex items-center justify-center mt-5 uppercase  font-sans font-semibold text-white bg-blue-600  px-5 py-2 rounded-lg shadow-sm hover:scale-105 duration-150">
            Submit
          </button>
          <p className="mt-5 text-textColor text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-primaryColor font-medium ml-1">
              Login
            </Link>
          </p>
        </form>
      )}
    </div>
  );
};

export default Register;
