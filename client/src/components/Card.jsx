import React from "react";

const Card = ({id, title, description, img}) => {
  return (
    <div className="p-3 shadow-md rounded-lg">
      <img src={img} className='h-[200px] w-full object-cover' alt="smoothie" />
      <div className="mt-5">
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-gray-500">{description}</p>
      </div>
    </div>
  );
};

export default Card;
