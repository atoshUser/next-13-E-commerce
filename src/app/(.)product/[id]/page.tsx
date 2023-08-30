"use client";
import { IProduct } from "@/interfaces";
import React, { FC, useEffect, useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { Dialog } from "@headlessui/react";
import { OptimizationImage } from "@/components";
import { StarIcon as StartIconOutline } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";
const ProductDetailPage = () => {
  const { id } = useParams();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [product, setProduct] = useState<IProduct>();
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const router = useRouter();

  async function getProduct() {
    setLoading(true);
    const { data } = await axios.get(`https://fakestoreapi.com/products/${id}`);
    setLoading(false);
    setProduct(data);
  }

  useEffect(() => {
    getProduct();
  }, [id]);

  return (
    <Dialog
      open={isOpen}
      onClose={() => {
        setIsOpen(false), router.back();
      }}
      className={`relative z-20 inset-0 `}
    >
      <div className="fixed inset-0 bg-sky-500/50">
        <div className="flex min-h-full items-center justify-center p-4">
          <Dialog.Panel className={`mx-0 max-w-3xl rounded bg-white p-10`}>
            {isLoading ? (
              <div className="h-8 w-8 rounded-full border-2 border-dotted border-blue-600 animate-spin" />
            ) : (
              <div className="flex gap-x-8 h-96">
                {product?.image && (
                  <div className="relative w-72 h-full hidden md:inline">
                    <OptimizationImage product={product} />
                  </div>
                )}
                <div className="flex flex-1 flex-col overflow-y-auto scrollbar-thin scrollbar-thumb-slate-600  scrollbar-track-orange-400 px-3">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-700/80">
                      {product?.title}
                    </h4>
                    <p className="font-bold text-md text-black">
                      {product?.price}$
                    </p>

                    <p className="text-md text-gray-600">
                      {product?.description}
                    </p>
                  </div>
                  <div className="flex items-center text-md my-4">
                    <p className="text-black">{product?.rating.rate}</p>
                    {product?.rating.rate && (
                      <div className="flex items-center ml-2 mr-6">
                        {Array.from(
                          {
                            length: Math.floor(product?.rating.rate),
                          },
                          (_, idx) => (
                            <StarIcon
                              key={idx}
                              className="w-5 h-5 text-yellow-400"
                            />
                          )
                        )}
                        {Array.from(
                          { length: 5 - Math.floor(product?.rating.rate) },
                          (_, idx) => (
                            <StartIconOutline
                              key={idx}
                              className="w-5 h-5 text-yellow-400"
                            />
                          )
                        )}
                      </div>
                    )}
                    <p className="text-blue-300  underline decoration-pink-500 ">
                      See all {product?.rating.count} reviews
                    </p>
                  </div>
                </div>
              </div>
            )}
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
};

export default ProductDetailPage;
