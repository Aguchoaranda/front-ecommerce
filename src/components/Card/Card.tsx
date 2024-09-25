"use client";
import React from "react";
import { ICardProps } from "./types";

const Card: React.FC<ICardProps> = ({
  name,
  // description,
  price,
  stock,
  image,
}) => {
  return (
    <div className="flex flex-row items-center rounded-lg gap-4 justify-center border p-2 w-[240px] h-[200px]  transform transition duration-300 hover:scale-105 hover:shadow-lg">
      <img  className= "  max-w-[120px] w-full h-auto" src={image} alt="imagen del producto" />
      <div>
        <h2 className="font-semibold text-xs">{name}</h2>
        <p className="text-xs">Stock: {stock}</p>
        <p className="text-xs">Price: ${price}</p>
      </div>
    </div>
  );
};

export default Card;
//11:44 56 12 02
