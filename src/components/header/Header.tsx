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
      <div className="flex space-x-8">
        <Button variant="contained" size="medium" className="bg-sky-600">
          Log In
        </Button>
        <Button
          variant="outlined"
          size="medium"
          className="bg-yellow-400 hover:bg-transparent"
          color="success"
        >
          Sign Up
        </Button>
      </div>
    </header>
  );
};

export default Header;
