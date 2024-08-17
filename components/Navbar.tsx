import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <header className="sticky top-0 left-0 backdrop-blur-lg bg-primary/50 px-10 py-2 border-b">
      <div className="">
        <Link href={"/"} className="flex items-center w-[180px] h-[50px] ">
          <Image
            src={"/logo.png"}
            alt="Okv Music"
            width={180}
            height={50}
            priority
            className="w-full h-full object-cover"
          />
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
