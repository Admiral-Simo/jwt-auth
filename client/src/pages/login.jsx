import axios from "axios";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: (values, { resetForm }) => {
      // todo fix authentication
      axios
        .post("http://localhost:5000/api/auth/login", values)
        .then(() => {
          navigate("/");
        })
        .catch((err) => {
          alert(err);
          resetForm();
        });
    },
  });

  return (
    <div className="flex flex-col h-full items-center justify-center gradient font-poppins">
      <form
        onSubmit={formik.handleSubmit}
        className="p-6 bg-gray-600 mx-2 rounded-sm"
      >
        <h1 className="mb-3 text-2xl font-black text-white">Login</h1>
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
        <p className="text-sm mt-5 text-center text-white">
          Don't have an account?{" "}
          <Link className="text-sky-500" to="/register">
            Signup now
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
