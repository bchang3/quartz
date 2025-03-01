import Link from "next/link";
import React, { useEffect } from "react";
import { useState } from "react";
import { Drawer } from "@mui/material";
import { gitLogInURL } from "../utils/utils";
import { useCookies } from "react-cookie";

function NavBar() {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [profileIconURL, setProfileIconURL] = useState<string>("");
  const [cookies] = useCookies(["logged_in"]);
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  const getProfileIcon = async () => {
    const res = await fetch("/api/getprofileicon", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    setProfileIconURL(data["profileIconURL"]);
  };

  useEffect(() => {
    setIsLoggedIn(cookies.logged_in || false);
    getProfileIcon();
  }, [cookies]);

  const toggleMenu = (state: boolean) => {
    setMenuOpen(state);
  };

  const menuLinkStyle =
    "text-base w-full text-left py-4 px-6 hover:bg-gray-50 hover:bg-opacity-35 font-semibold";
  const menu = (
    <div
      className="flex flex-col w-[230px] font-inter items-start h-screen py-16"
      onClick={() => toggleMenu(false)}
    >
      <div className="flex flex-row w-full justify-between -mt-12 mb-8">
        <Link href="/">
          <img src="/quartz.png" className="w-10 h-10 ml-4" />
        </Link>
        <div className="cursor-pointer mr-4" onClick={() => toggleMenu(false)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="32px"
            viewBox="0 -960 960 960"
            width="32px"
            fill="#000000"
          >
            <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
          </svg>
        </div>
      </div>
      <div className="text-black text-xl mb-4 px-6 font-bold">Menu</div>
      <Link className={menuLinkStyle} href={"/"}>
        Home
      </Link>
      <Link className={menuLinkStyle} href={"/"}>
        Add Dev Entry
      </Link>
      <Link className={menuLinkStyle} href={"/"}>
        Calendar View
      </Link>
      <Link className={menuLinkStyle} href={"/"}>
        Developer Profile
      </Link>
    </div>
  );
  if (isLoggedIn === null) return <p>Loading...</p>;
  return (
    <div className="flex flex-row gap-2 items-center py-4 px-4 justify-between">
      <div className="flex flex-row gap-2 items-center">
        <div
          className="w-fit p-4 cursor-pointer "
          onClick={() => toggleMenu(true)}
        >
          <svg
            viewBox="0 0 18 13"
            fill="none"
            className="w-8"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 12.5249H18V10.5249H0V12.5249ZM0 7.5249H18V5.5249H0V7.5249ZM0 0.524902V2.5249H18V0.524902H0Z"
              fill="black"
            />
          </svg>
        </div>
        <Link href="/">
          <img src="/quartz.png" className="w-10 h-10" />
        </Link>
      </div>
      <div>
        {!isLoggedIn && <a href={gitLogInURL}>Sign in</a>}
        {isLoggedIn && (
          <img
            className="rounded-full w-14 border-black border-2"
            src={profileIconURL}
          />
        )}
      </div>

      <Drawer anchor="left" open={menuOpen} onClose={() => toggleMenu(false)}>
        {menu}
      </Drawer>
    </div>
  );
}
export default React.memo(NavBar);
