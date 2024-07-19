import React from "react";
import { useSelector } from "react-redux";

// eslint-disable-next-line react/prop-types
const MainScreen = ({ title, children }) => {
  const userInfo = useSelector((state) => state.bazar.userInfo);
  console.log(userInfo);
  return (
    <div className=" mx-auto  max-w-screen-lg mt-5 ">
      {userInfo && (
        <div className=" pb-3 mb-3 rounded-lg text-4xl capitalize font-semibold text-gray-600 border-blue-500 border-b-2 px-2 py-2">
          hello welcome {userInfo.name}
        </div>
      )}
      {children}
    </div>
  );
};

export default MainScreen;
