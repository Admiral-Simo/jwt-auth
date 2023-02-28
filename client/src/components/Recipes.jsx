import React from "react";
import Card from "./Card";

const Recipes = ({ data }) => {
  return (
    <div className="max-w-5xl mx-auto mt-10 font-poppins text-slate-700 grid grid-cols-1 md:grid-cols-3 pb-10 gap-5">
      {data.map((item) => (
        <Card key={item.id} {...item} />
      ))}
    </div>
  );
};

export default Recipes;
