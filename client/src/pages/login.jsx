import axios from "axios";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { setToken } from "../features/slices/authSlice";
import { useDispatch } from "react-redux";


function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: (values, { resetForm }) => {
      // todo fix authentication
      axios
        .post("http://localhost:5000/api/auth/login", values)
        .then(({ data }) => {
          dispatch(setToken(data.token));
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
        className="p-12 bg-[#191825] mx-2 rounded-2xl text-[#f5c4ff]"
      >
        <h1 className="mb-3 text-3xl font-semibold">Login</h1>
        <div className="input-container mb-4">
          <label className="capitalize mb-1">username</label>
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
          <label className="capitalize mb-1">password</label>
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
          className="w-full text-[#e7cce7] bg-[#865DFF] py-2 px-5 mt-10 rounded-sm"
          type="submit"
        >
          Submit
        </button>
        <p className="text-sm mt-5 text-center">
          Don't have an account?{" "}
          <Link className="text-sky-300" to="/register">
            Signup now
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
