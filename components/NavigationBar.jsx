import React from "react";
import { MdHomeFilled } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";import { FaThreads } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";
import Link from "next/link";
const NavigationBar = () => {
  return (
    <section className="navigationbar text-3xl md:py-3">
      <Link href="/">
        <div className="threadbtn text-white hidden md:inline-block">
            <FaThreads />
        </div>
      </Link>

      <div className="navbuttons">
        <Link href="/">
        <div className="navbutton">
          <MdHomeFilled />
        </div>
        </Link>
        <Link href="/search">
        <div className="navbutton">
          <IoSearch />
        </div>
        </Link>
        <div className="navbutton">
          <FaRegHeart />
        </div>
        <Link href="/profile">
        <div className="navbutton">
          <CgProfile />
        </div>
        </Link>
      </div>
      <div className="hidden md:inline-block">
        <GiHamburgerMenu />
      </div>
    </section>
  );
};

export default NavigationBar;
