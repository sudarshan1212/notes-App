import React, { useEffect, useState } from "react";
import useFetchdata from "../hooks/useFetchdata";
import { BASE_URL } from "../../config";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const CreateNotes = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
  });
  const { data, loading } = useFetchdata(`${BASE_URL}/api/notes/${id}`);

  const userData = data.note;
  useEffect(() => {
    setFormData({
      title: userData?.title,
      content: userData?.content,
      category: userData?.category,
    });
  }, [userData]);
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.bazar.userInfo);
  // console.log(userInfo);
  // console.log(data.note);
  const submitHandler = async (e) => {
    e.preventDefault();
    const title = formData.title;
    const content = formData.content;
    const category = formData.category;

    try {
      // console.log(userInfo.token);

      const config = {
        "content-type": "application/json",

        headers: { Authorization: `Bearer ${userInfo.token}` },
      };
      const { data } = await axios.put(
        `${BASE_URL}/api/notes/${id}`,
        { title, content, category },
        config
      );
      toast.success(data.Status);
    } catch (err) {
      toast.error(err);
      console.log(err.response.data);
    }
  };
  return (
    <div>
      <div className="">
        <form
          action=""
          className="flex flex-col"
          onSubmit={(e) => submitHandler(e)}
        >
          <label htmlFor="">title</label>
          <input
            name="title"
            onChange={(e) => handleInputChange(e)}
            className="border border-gray-500 mt-2 "
            value={formData.title}
            type="text"
          />
          <label htmlFor="">content</label>
          <input
            name="content"
            onChange={(e) => handleInputChange(e)}
            className="border border-gray-500 mt-2"
            value={formData.content}
            type="text"
          />

          <label htmlFor="">category</label>
          <input
            name="category"
            onChange={(e) => handleInputChange(e)}
            className="border border-gray-500 mt-2"
            value={formData.category}
            type="text"
          />
          <button className="px-3 mt-5 bg-green-400  shadow-lg rounded-lg text-xl font-medium text-white duration-150 hover:scale-105 py-[5px]">
            {" "}
            submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateNotes;
