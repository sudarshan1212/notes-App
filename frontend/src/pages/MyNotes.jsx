import React, { useEffect, useState } from "react";
import MainScreen from "./../components/MainScreen";

import { Link } from "react-router-dom";
import axios from "axios";
import useFetchdata from "../hooks/useFetchdata";
import { BASE_URL } from "../../config";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loading from "../components/Loading ";
const MyNotes = () => {
  const { data, loading, error } = useFetchdata(`${BASE_URL}/api/notes`);
  const [accordianOpen, setAccordianOpen] = useState(null);
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.bazar.userInfo);
  // console.log(userInfo.token);
  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure")) {
      // console.log(id);
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        };
        const { data } = await axios.delete(
          `${BASE_URL}/api/notes/${id}`,
          config
        );
        toast.success(data.message);
      } catch (err) {
        console.log(err);
        toast.error(err);
      }
    }
  };
  const accordian = (i) => {
    // console.log(i);
    if (accordianOpen == i) {
      return setAccordianOpen(null);
    }
    setAccordianOpen(i);
  };
  return (
    <div className=" ">
      {loading && <Loading />}
      {!loading && (
        <MainScreen title="Welcome Shyam">
          <div>
            <Link to="/creatnote">
              <button className=" px-3 mt-5 bg-violet-400 shadow-lg rounded-lg text-xl font-medium text-white duration-150 hover:scale-105 py-3">
                Create Note
              </button>
            </Link>
            <div className="mt-8">
              {data.map((item, index) => (
                <div
                  key={item._id}
                  className=" my-3 border-2  rounded-md shadow-lg border-gray-400"
                >
                  <div
                    onClick={() => accordian(item._id)}
                    className="   flex justify-between rounded-lg border-blue-300 border-b px-2 py-3 items-center bg-slate-200"
                  >
                    <div className="px-2 text-lg font-normal item-center justify-center ">
                      {item.title}
                    </div>
                    <div className="flex justify-center items-center mb-1  gap-8 mr-4">
                      <Link to={`${item._id}`}>
                        <button className="px-3 mt-5 bg-green-400  shadow-lg rounded-lg text-xl font-medium text-white duration-150 hover:scale-105 py-[5px]">
                          {" "}
                          Edit
                        </button>
                      </Link>
                      <button
                        onClick={() => deleteHandler(item._id)}
                        className="px-3 mt-5 bg-red-400 shadow-lg rounded-lg text-xl font-medium text-white duration-150 hover:scale-105 py-[5px] text-center"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <div
                    className={`grid overflow-hidden transition-all duration-200 ease-in-out text-slate-600 ${
                      accordianOpen == item._id
                        ? " grid-rows-[1fr] opacity-100 mt-5"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="  overflow-hidden flex flex-col   justify-start ">
                      <button className=" px-2 mx-5 w-52  bg-green-400 shadow-lg rounded-lg font-medium text-white   py-3 items-center text-center">
                        Category: {item.category}
                      </button>
                      <div className=" mt-5 px-5">
                        {" "}
                        <p className=" font-normal text-lg text-gray-800 ">
                          {item.content}
                        </p>
                        <p className="font-thin px-7 mt-2 mb-5">
                          {" "}
                          - Created on date
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </MainScreen>
      )}
    </div>
  );
};

export default MyNotes;
