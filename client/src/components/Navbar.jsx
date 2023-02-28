import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ setShowRecipes }) => {
  return (
    <div className="max-w-5xl py-10 font-poppins mx-auto flex flex-row justify-between items-center px-4 text-slate-700">
      <button
        className="text-3xl cursor-pointer"
        onClick={() => setShowRecipes(false)}
      >
        Admiral-Simo
      </button>
      <div className="flex flex-col space-y-2 md:space-y-0 md:flex-row ">
        <Link
          to="/register"
          className="py-2 px-4 md:px-5 hover:scale-90 transition duration-300 text-black bg-yellow-200 rounded-full uppercase tracking-wider shadow-xl"
        >
          log out
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
