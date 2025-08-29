import type { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const CommonLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="">
      <div className="container mx-auto">
        <Navbar></Navbar>
      </div>
      <div className=" container mx-auto min-h-screen lg:py-8 py-4">{children}</div>
      <div className="">
        <Footer></Footer>
      </div>
    </div>
  );
};

export default CommonLayout;
