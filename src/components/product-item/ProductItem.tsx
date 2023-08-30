"use client";
import { IProduct } from "@/interfaces";
import Image from "next/image";
import React, { FC } from "react";

const ProductItem: FC<{ product: IProduct }> = ({ product }) => {
  console.log(product);

  return (
    <li className="flex flex-col p-2 md:p-4 gap-4 bg-white rounded-md transition-all duration-300 hover:scale-105 cursor-pointer">
      <div className="w-full relative h-[250px]">
        <Image src={product.image} alt={product.title} fill />
      </div>
      <div className="flex flex-col flex-1">
        <span className="text-sky-600 ">{product.category}</span>
        <div className="flex flex-row justify-between">
          <span className="text-black truncate">{product.title}</span>
          <span className="text-black font-semibold">{product.price}$</span>
        </div>
        <p className="line-clamp-2 text-gray-500">{product.description}</p>
      </div>
    </li>
  );
};

export default ProductItem;
