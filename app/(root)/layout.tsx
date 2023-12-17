import LeftSidebar from "@/components/shared/LeftSidebar";
import RightSidebar from "@/components/shared/RightSidebar";
import Navbar from "@/components/shared/navbar/Navbar";
import React from "react";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="relative bg-light-850 dark:bg-dark-100">
      <Navbar />
      <div className="flex">
        <LeftSidebar />
        {/* flex min-h-screen flex-1 flex-col px-6 pb-6 pt-36 max-md:pb-14 sm:px-14 */}
        <section className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-36 max-md:pb-14 sm:px-14">
          {/*  <div className="mx-auto w-full">{children}</div> */}
          <div className="mx-auto w-full">{children}</div>
        </section>
        <RightSidebar />
      </div>
      {/* Toaster */}
    </main>
  );
};

export default HomeLayout;
