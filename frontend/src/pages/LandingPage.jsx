import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className=" h-dvh mx-auto max-w-screen-sm mt-16 ">
      <div className="flex border-4 border-blue-300 px-2 py-10 justify-center gap-9 shadow-2xl rounded-xl items-center flex-col ">
        <h1 className="text-3xl  font-semibold uppercase px-52  leading-relaxed">
          Welcome to note zipper
        </h1>
        <div className="flex justify-center gap-9  my-auto py-20">
          <Link to="/login">
            <button className=" uppercase  font-sans font-semibold text-white bg-blue-600  px-5 py-2 rounded-lg shadow-sm hover:scale-105 duration-150">
              loign
            </button>
          </Link>
          <Link to="/register">
            <button className=" uppercase  font-sans font-semibold text-white bg-blue-600  px-5 py-2 rounded-lg shadow-sm hover:scale-105 duration-150">
              Signup
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
