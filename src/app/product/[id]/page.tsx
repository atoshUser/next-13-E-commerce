import { OptimizationImage } from "@/components";
import { IProduct } from "@/interfaces";
import axios from "axios";
import React, { FC } from "react";

interface Props {
  params: {
    id: number;
  };
}

const ProductDetailPage = async ({ params: { id } }: Props) => {
  const response = await fetch(`https://fakestoreapi.com/products/${id}`);
  const data: IProduct = await response.json();

  return (
    <div className=" max-w-[1200px] mx-auto flex flex-col overflow-hidden md:flex-row px-4 bg-slate-400 items-center gap-8 rounded-md mt-48">
      <div className="  relative h-[500px] w-[450px]">
        <OptimizationImage product={data} />
      </div>
      <div className="flex flex-col flex-1">
        <h3 className="text-3xl font-bold mb-4">{data.title}</h3>
        <span className="font-bold text-[28px] text-black">{data.price}$</span>
        <p className="font-semibold text-black/50">{data.description}</p>
      </div>
    </div>
  );
};

export default ProductDetailPage;
