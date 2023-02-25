import React, { useEffect, useState } from "react";
import axios from "axios";
import { useFormik } from "formik";

function App() {
  const [data, setData] = useState([]);
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: async (values, { resetForm }) => {
      const { data } = await axios.post("http://localhost:5000/login", values);
      resetForm();
      alert(data);
      fetchUsers();
    },
  });

  const fetchUsers = () => {
    axios.get("http://localhost:5000/users").then(({ data }) => {
      setData(data);
    });
  };

  return (
    <div className="flex flex-col h-full items-center justify-center bg-gray-900 font-poppins">
      <form
        onSubmit={formik.handleSubmit}
        className="p-6 bg-gray-600 mx-2 rounded-sm"
      >
        <div className="input-container mb-4">
          <label className="capitalize mb-1 text-white">username</label>
          <input
            id="username"
            name="username"
            onChange={formik.handleChange}
            value={formik.values.username}
            className="w-full py-2 px-5 focus:outline-none rounded-sm"
            type="text"
          />
        </div>
        <div className="input-container">
          <label className="capitalize mb-1 text-white">password</label>
          <input
            id="password"
            name="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            className="w-full py-2 px-5 focus:outline-none rounded-sm"
            type="password"
          />
        </div>
        <button
          className="w-full text-black bg-green-400 py-2 px-5 mt-10 rounded-sm"
          type="submit"
        >
          Submit
        </button>
      </form>
      <button
        onClick={fetchUsers}
        className="w-full text-black bg-green-400 py-2 px-5 mt-10 rounded-sm"
        type="submit"
      >
        Submit
      </button>
      {data.map(({ username, password }) => {
        return (
          <p className="text-white text-left" key={username}>
            {username} | {password}
          </p>
        );
      })}
    </div>
  );
}

export default App;
