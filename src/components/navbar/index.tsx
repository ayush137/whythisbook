import {
  LoginLink,
  LogoutLink,
  getKindeServerSession,
} from "@kinde-oss/kinde-auth-nextjs/server";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { Input } from "../ui/input";

async function Navbar() {
  const { getUser, isAuthenticated } = getKindeServerSession();
  const user = await getUser();
  const isAuth = await isAuthenticated();

  return (
    <nav className="flex h-[75px] w-[100%] items-center justify-between bg-black px-14 py-3 text-white border-b">
      <div className={`flex h-[100%] items-center text-lg`}>
        <Link href="/">
          <Image
            src="/assets/logo.svg"
            alt="whythisbook"
            width={175}
            height={40}
          />
        </Link>
      </div>
      <div>
        <Input
          placeholder="Search books"
          className="rounded-[8px] h-[40px] border"
        />
      </div>
      <div>
        <ul className="flex gap-x-7">
          {isAuth ? (
            <li>
              <LogoutLink>Logout</LogoutLink>
            </li>
          ) : (
            <li>
              <LoginLink>Login</LoginLink>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
