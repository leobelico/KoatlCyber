"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import toast from "react-hot-toast";
import { FaHeadphones, FaRegEnvelope, FaRegUser } from "react-icons/fa6";

const HeaderTop = () => {
  const { data: session }: any = useSession();

  const handleLogout = () => {
    setTimeout(() => signOut(), 1000);
    toast.success("Sesión cerrada");
  };

  return (
    <div className="border-b border-mint/10 bg-ink-900 text-xs text-gray-300 max-lg:py-2">
      <div className="mx-auto flex max-w-screen-2xl items-center justify-between px-6 py-2 max-lg:flex-col max-lg:gap-y-1 lg:px-12">
        <ul className="flex items-center gap-x-6 font-mono">
          <li className="flex items-center gap-x-2">
            <span className="h-1.5 w-1.5 animate-pulseDot rounded-full bg-mint" />
            <FaHeadphones className="text-mint" />
            <a href="tel:+524443479221" className="hover:text-mint">+52 444 347 9221</a>
          </li>
          <li className="flex items-center gap-x-2">
            <FaRegEnvelope className="text-mint" />
            <a href="mailto:ventas@koatlcyber.com" className="hover:text-mint">ventas@koatlcyber.com</a>
          </li>
        </ul>
        <ul className="flex items-center gap-x-5 font-semibold">
          {!session ? (
            <>
              <li>
                <Link href="/login" className="flex items-center gap-x-2 hover:text-mint">
                  <FaRegUser className="text-mint" />
                  <span>Login</span>
                </Link>
              </li>
              <li>
                <Link href="/register" className="flex items-center gap-x-2 hover:text-mint">
                  <FaRegUser className="text-mint" />
                  <span>Registrarse</span>
                </Link>
              </li>
            </>
          ) : (
            <>
              <span className="font-mono">{session.user?.email}</span>
              <li>
                <button onClick={handleLogout} className="flex items-center gap-x-2 hover:text-mint">
                  <FaRegUser className="text-mint" />
                  <span>Cerrar sesión</span>
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default HeaderTop;
