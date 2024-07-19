import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { removeUsers } from "../../redux/bazarSlice";
import { toast } from "react-toastify";

const Header = () => {
  const navigate = useNavigate();
  const logout = () => {
    // localStorage.removeItem("userInfo");
    dipatch(removeUsers());
    toast.success("logout successflully");
    navigate("/login");
  };
  const dipatch = useDispatch();
  const userInfo = useSelector((state) => state.bazar.userInfo);
  // console.log(userInfo);
  return (
    <div className="   bg-blue-600">
      <div className=" max-w-screen-lg  mx-auto py-5 flex justify-between shadow-lg">
        <div>
          <NavLink to="/">
            <h1 className="text-xl font-bold capitalize">notes zipper</h1>
          </NavLink>
        </div>
        <div className="flex gap-5">
          <NavLink to="/notes">
            <span className=" capitalize text-white font-medium">my notes</span>
          </NavLink>
          <h1>{userInfo?.name||""}</h1>
          <button
            onClick={logout}
            className=" flex items-center justify-center  uppercase  font-sans font-semibold text-blue-600 bg-white  px-5 py-2 rounded-lg shadow-sm hover:scale-105 duration-150"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Header;
