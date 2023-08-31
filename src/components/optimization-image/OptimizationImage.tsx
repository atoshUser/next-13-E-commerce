"use client";
import { IProduct } from "@/interfaces";
import Image from "next/image";
import React, { FC, useState } from "react";

interface Props {
  product: IProduct;
  objFit?: string;
}

const OptimizationImage: FC<Props> = ({ product, objFit }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  return (
    <>
      <Image
        src={product?.image}
        alt={product?.title}
        fill
        objectFit={objFit}
        className={`object-contain duration-700 ease-in-out ${
          isLoading
            ? `scale-110 blur-2xl grayscale`
            : `scale-100 blur-0 grayscale-0`
        }`}
        onLoadingComplete={() => setIsLoading(false)}
      />
    </>
  );
};

export default OptimizationImage;
