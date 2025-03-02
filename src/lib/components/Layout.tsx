import React, { PropsWithChildren } from "react";
import { useRouter } from "next/router";
import NavBar from "./NavBar";

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();

  return (
    <>
      <div className="flex flex-col w-screen min-h-screen">
        {<NavBar />}
        <main className={`flex flex-col mx-auto flex-1 "w-5/6 lg:w-11/12"}`}>
          {children}
        </main>
        {/* {!isLoginPage && <Footer />} */}
      </div>
    </>
  );
};

export { Layout };
