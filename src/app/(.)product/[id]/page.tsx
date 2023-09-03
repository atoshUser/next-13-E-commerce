"use client";
import { IProduct } from "@/interfaces";
import React, { FC, useEffect, useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { Dialog } from "@headlessui/react";
import { OptimizationImage } from "@/components";
import { StarIcon as StartIconOutline } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";
import { toast } from "react-toastify";
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

  const handleClick = () => {
    const getDataProducts: IProduct[] =
      JSON.parse(localStorage.getItem("products") as string) || [];

    const isExistProduct = getDataProducts.some(
      (obj) => obj?.id == product?.id
    );
    if (isExistProduct) {
      const newUpdatedProducts = getDataProducts.map((obj) => {
        if (obj.id == product?.id) {
          return { ...product, quantity: obj.quantity + 1 };
        } else {
          return obj;
        }
      });
      localStorage.setItem(`products`, JSON.stringify(newUpdatedProducts));
    } else {
      const newProduct = [...getDataProducts, { ...product, quantity: 1 }];
      localStorage.setItem(`products`, JSON.stringify(newProduct));
    }
    toast.success("Successfully added!", { autoClose: 2000 });
  };

  return (
    <Dialog
      open={isOpen}
      onClose={() => {
        setIsOpen(false), router.back();
      }}
      className={`relative z-20 inset-0 `}
    >
      <div className="fixed inset-0 bg-black">
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
                <div className="flex flex-1 flex-col ">
                  <div className="flex flex-col flex-1">
                    <div className="flex flex-col flex-1">
                      <h4 className="font-semibold text-gray-700/80">
                        {product?.title}
                      </h4>
                      <p className="font-bold text-md text-black">
                        {product?.price}$
                      </p>

                      <p className="text-md text-gray-600 line-clamp-4 ">
                        {product?.description}
                      </p>
                    </div>
                    <div className="flex flex-1 flex-col  justify-end">
                      <div className="flex gap-4 items-center">
                        <button
                          className="font-semibold transition-all active:scale-110 duration-500  bg-sky-600 rounded-md p-3"
                          onClick={handleClick}
                        >
                          Add to Bag
                        </button>
                        <button
                          onClick={() => window.location.reload()}
                          className="rounded-md p-3 font-semibold transition-all  hover:bg-sky-400 duration-300 hover:text-white border border-sky-400 text-black/50"
                        >
                          View details
                        </button>
                      </div>
                    </div>
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
