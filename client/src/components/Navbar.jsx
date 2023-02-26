import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="max-w-5xl py-10 font-poppins mx-auto flex flex-row justify-between items-center px-4 text-slate-700">
      <h4 className="text-3xl">Admiral-Simo</h4>
      <div className="flex flex-col space-y-2 md:space-y-0 md:flex-row ">
        <Link
          to="/login"
          className="py-2 px-4  md:px-5 text-black rounded-full uppercase tracking-wider"
        >
          log in
        </Link>
        <Link
          to="/register"
          className="py-2 px-4 md:px-5 text-black bg-yellow-200 rounded-full uppercase tracking-wider shadow-xl"
        >
          sign up
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
