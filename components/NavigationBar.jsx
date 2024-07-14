import React from "react";
import { MdHomeFilled } from "react-icons/md";
import { IoSearch } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";import { FaThreads } from "react-icons/fa6";
import { GiHamburgerMenu } from "react-icons/gi";
const NavigationBar = () => {
  return (
    <section className="navigationbar text-3xl md:py-3">
        <div className="threadbtn text-white hidden md:inline-block">
            <FaThreads />
        </div>

      <div className="navbuttons">
        <div className="navbutton">
          <MdHomeFilled />
        </div>
        <div className="navbutton">
          <IoSearch />
        </div>
        <div className="navbutton">
          <FaRegHeart />
        </div>
        <div className="navbutton">
          <CgProfile />
        </div>
      </div>
      <div className="hidden md:inline-block">
        <GiHamburgerMenu />
      </div>
    </section>
  );
};

export default NavigationBar;
