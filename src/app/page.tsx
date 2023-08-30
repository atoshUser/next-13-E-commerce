import { Hero, ProductItem } from "@/components";
import { IProduct } from "@/interfaces";
import React from "react";

const Homepage = async () => {
  const res = await fetch("https://fakestoreapi.com/products");
  const products: IProduct[] = await res.json();

  return (
    <main className="flex flex-col  container  min-h-screen  px-5 lg:px-8  mt-30">
      <Hero />
      <section className="flex flex-col space-y-12">
        <h1 className="uppercase text-3xl mb-4 text-white font-bold text-center">
          Atosh shop Deals
        </h1>
        <ul className={`productList`}>
          {products.map((product) => {
            return <ProductItem key={product.id} product={product} />;
          })}
        </ul>
      </section>
    </main>
  );
};

export default Homepage;
