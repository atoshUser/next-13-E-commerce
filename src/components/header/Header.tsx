import { Button } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header className="flex items-center w-full justify-between bg-slate-600 fixed top-0 z-30   px-4 py-3 sm:py-5 sm:px-12">
      <span className="text-white text-3xl font-bold italic hover:opacity-50 transition-all duration-300">
        <Link href={"/"}>Atosh</Link>
      </span>
      <div className="flex">
        <Link href={`/shopping-card`}>
          <Button variant="contained" size="medium" className="bg-sky-600">
            My Bag
          </Button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
