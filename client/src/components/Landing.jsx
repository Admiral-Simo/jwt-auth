import React from "react";

const Landing = () => {
  return (
    <div className="max-w-5xl mx-auto mt-10 flex flex-col md:flex-row items-center md:justify-start md:space-x-10 font-poppins text-slate-700">
      <img
        src="/smooth.jpg"
        className="w-60 rounded-xl rotate-6"
        alt="smoothie"
      />
      <div className="flex flex-col justify-center space-y-5 mt-10 md:mt-0">
        <h1 className="capitalize text-4xl md:text-7xl">Delicious Recipes</h1>
        <p className="capitalize text-2xl md:text-3xl">
          by admiral-simo for you
        </p>
        <button className="py-2 px-5 text-black bg-yellow-200 rounded-full uppercase tracking-wider w-fit shadow-xl">
          view recipes
        </button>
      </div>
    </div>
  );
};

export default Landing;
