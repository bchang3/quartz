import Link from "next/link";
import React, { useEffect } from "react";
import { useState } from "react";
import { ClickAwayListener, Drawer, Popper } from "@mui/material";
import { gitLogInURL } from "../utils/utils";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";

function NavBar() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [username, setUsername] = useState<string>();
  const [popperOpen, setPopperOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setPopperOpen(true);
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const [profileIconURL, setProfileIconURL] = useState<string>("");
  const [cookies] = useCookies(["logged_in"]);
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  const getProfileIcon = async () => {
    const res = await fetch("/api/getprofileicon", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    setProfileIconURL(data["profileIconURL"]);
    setUsername(data["username"]);
  };

  const handleClose = () => {
    setPopperOpen(false);
    setAnchorEl(null);
  };
  useEffect(() => {
    setIsLoggedIn(cookies.logged_in || false);
    getProfileIcon();
  }, [cookies]);

  const toggleMenu = (state: boolean) => {
    setMenuOpen(state);
  };
  const logout = async () => {
    const res = await fetch("/api/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    setPopperOpen(false);
    router.push("/");
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
        Add an Issue
      </Link>
      <Link className={menuLinkStyle} href={"/user/tracker"}>
        View Issues
      </Link>
      <Link className={menuLinkStyle} href={"/"}>
        Profile
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
        {!isLoggedIn && (
          <button className="group font-medium relative overflow-hidden mt-2">
            <a className="mr-8 font-bold cursor-pointer" href={gitLogInURL}>
              Sign in
            </a>
            <span className="text-md absolute top-[19px] left-0 bottom-0 w-0 h-[2px] bg-black transition-all duration-300 group-hover:w-2/3"></span>
          </button>
        )}
        {isLoggedIn && profileIconURL && (
          <img
            className="rounded-full w-14 border-black border-2 cursor-pointer"
            src={profileIconURL}
            onClick={handleClick}
          />
        )}
      </div>

      <Drawer anchor="left" open={menuOpen} onClose={() => toggleMenu(false)}>
        {menu}
      </Drawer>
      <Popper
        id="id"
        open={popperOpen}
        anchorEl={anchorEl}
        placement="bottom-end"
      >
        <ClickAwayListener onClickAway={handleClose}>
          <div className="flex flex-col gap-3 h-36 w-48 border-gray-200 border-[1px] bg-black text-white rounded-md mt-2 py-2 px-2">
            <div className="font-bold p-2 px-1">{username}</div>
            <div className="flex flex-col gap-1">
              <Link
                href="/"
                className="text-gray-200 font-light hover:font-normal hover:text-white hover:bg-gray-800 rounded-sm py-[3px] px-1"
              >
                Profile
              </Link>
              <button
                onClick={logout}
                className="flex flex-row cursor-pointer justify-between text-gray-200 font-light hover:font-normal hover:text-white hover:bg-gray-800 rounded-sm py-[3px] px-1"
              >
                Log Out
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#e8eaed"
                >
                  <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" />
                </svg>
              </button>
            </div>
          </div>
        </ClickAwayListener>
      </Popper>
    </div>
  );
}
export default React.memo(NavBar);
