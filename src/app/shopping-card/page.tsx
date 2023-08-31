"use client";
import { IProduct } from "@/interfaces";
import React, { useCallback, useEffect, useState } from "react";
import { StarIcon as StartIconOutline } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";
import { OptimizationImage } from "@/components";

const ShoppingCardPage = () => {
  const [products, setProducts] = useState<IProduct[]>(
    JSON.parse(localStorage.getItem("products") as string) || []
  );
  const [total, setTotal] = useState<number>();
  // delete  product from list Product
  const handleDeleteProductItem = (id: number) => {
    const newUpdateProducts: IProduct[] = products.filter(
      (obj) => obj?.id !== id
    );
    localStorage.setItem("products", JSON.stringify(newUpdateProducts));
    setProducts(newUpdateProducts);
  };

  // increment total of product
  const incrementProduct = (id: number) => {
    const updatedProducts = products.map((obj) => {
      if (obj.id == id) {
        return { ...obj, quantity: obj.quantity + 1 };
      } else {
        return obj;
      }
    });

    localStorage.setItem(`products`, JSON.stringify(updatedProducts));
    setProducts(updatedProducts);
  };

  // decrement total of product
  const decrementProduct = (id: number) => {
    const isExistProduct = products.find((obj) => obj.id == id);

    if (isExistProduct?.quantity <= 1) {
      handleDeleteProductItem(isExistProduct.id);
    } else {
      const updatedProducts = products.map((obj) => {
        if (obj.id == id) {
          return {
            ...obj,
            quantity: obj.quantity - 1,
          };
        } else {
          return obj;
        }
      });
      setProducts(updatedProducts);
      localStorage.setItem("products", JSON.stringify(updatedProducts));
    }
  };
  // calculate total price

  const calcTotalPrice = () => {
    const totalPrice: number = products.reduce((initial, item) => {
      return initial + item.price * item.quantity;
    }, 0);
    setTotal(totalPrice);
  };

  useEffect(() => {
    calcTotalPrice();
  }, [products]);
  return (
    <div className="h-screen bg-gray-100 pt-20 text-black">
      <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
      <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
        <div className="rounded-lg flex flex-col md:w-2/3 overflow-y-auto max-h-[550px] scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
          {products.map((obj) => {
            return (
              <div className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
                <div className="relative w-52">
                  <OptimizationImage product={obj} />
                </div>
                <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                  <div className="mt-5 sm:mt-0">
                    <h2 className="text-lg font-bold text-gray-900">
                      {obj?.title}
                    </h2>
                    <p className="mt-1 text-xs text-gray-700 line-clamp-2">
                      {obj?.description}
                    </p>
                    <div className="flex gap-3 items-center">
                      <span>{obj?.rating.rate}</span>
                      <div className="flex flex-row">
                        {Array.from({ length: obj?.rating.rate }, (_, id) => (
                          <StarIcon
                            key={id}
                            className="w-5 h-5 text-yellow-400"
                          />
                        ))}
                        {Array.from(
                          { length: 5 - obj?.rating.rate },
                          (_, idx) => (
                            <StartIconOutline
                              key={idx}
                              className="w-5 h-5 text-yellow-400"
                            />
                          )
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-between im sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                    <div className="flex items-center border-gray-100">
                      <span
                        onClick={() => decrementProduct(obj.id)}
                        className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"
                      >
                        -{" "}
                      </span>
                      <input
                        className="h-8 w-8 border bg-white text-center text-xs outline-none"
                        type="number"
                        value={obj?.quantity}
                        min="1"
                      />
                      <span
                        onClick={() => incrementProduct(obj.id)}
                        className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"
                      >
                        +{" "}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <p className="text-sm font-semibold">
                        {(obj?.price * obj.quantity).toLocaleString("en-US", {
                          style: "currency",
                          currency: "usd",
                        })}
                      </p>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
                        onClick={() => handleDeleteProductItem(obj?.id)}
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
          <div className="mb-2 flex justify-between">
            <p className="text-gray-700">Subtotal</p>
            <p className="text-gray-700">
              {total?.toLocaleString("en-US", {
                style: "currency",
                currency: "usd",
              })}
            </p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-700">Shipping</p>
            <p className="text-gray-700">
              {(10).toLocaleString("en-US", {
                style: "currency",
                currency: "usd",
              })}
            </p>
          </div>
          <hr className="my-4" />
          <div className="flex justify-between">
            <p className="text-lg font-bold">Total</p>
            <div className="">
              <p className="mb-1 text-lg font-bold">
                {(total + 10).toLocaleString("en-US", {
                  style: "currency",
                  currency: "usd",
                })}
              </p>
              <p className="text-sm text-gray-700">including VAT</p>
            </div>
          </div>
          <button className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">
            Check out
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCardPage;
