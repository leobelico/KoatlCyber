"use client";
import { usePathname } from "next/navigation";
import React from "react";
import HeaderTop from "./HeaderTop";
import Image from "next/image";
import Link from "next/link";
import { FaBell, FaWhatsapp } from "react-icons/fa6";
import { signOut } from "next-auth/react";
import toast from "react-hot-toast";

const navLinks = [
  { label: "Productos", href: "/#inicio" },
  { label: "Servicio", href: "/#servicio" },
  { label: "Planes", href: "/#planes" },
  { label: "Proyectos", href: "/#proyectos" },
  { label: "Contacto", href: "/#contacto" },
];

const Header = () => {
  const pathname = usePathname();

  const handleLogout = () => {
    setTimeout(() => signOut(), 1000);
    toast.success("Sesión cerrada");
  };

  const isAdmin = pathname.startsWith("/admin");

  return (
    <header className="sticky top-0 z-50 bg-ink-900/85 backdrop-blur-md">
      <HeaderTop />
      {!isAdmin ? (
        <div className="border-b border-mint/10">
          <div className="mx-auto flex max-w-screen-2xl items-center justify-between px-6 py-3 lg:px-12 max-md:flex-col max-md:gap-y-3">
            <Link href="/" className="shrink-0">
              <Image
                src="/koatlcyber.jpg"
                alt="KoatlCyber logo"
                width={300}
                height={150}
                className="max-h-[64px] w-auto object-contain"
                priority
              />
            </Link>

            <nav className="flex items-center gap-x-8 font-mono text-sm uppercase tracking-wider text-gray-300 max-sm:gap-x-4 max-sm:text-xs">
              {navLinks.map((l) => (
                <Link key={l.href} href={l.href} className="transition-colors hover:text-mint">
                  {l.label}
                </Link>
              ))}
            </nav>

            <a
              href="https://wa.me/524443479221"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary !px-5 !py-2 text-sm max-md:hidden"
            >
              <FaWhatsapp className="text-lg" />
              WhatsApp
            </a>
          </div>
        </div>
      ) : (
        <div className="mx-auto flex h-24 max-w-screen-2xl items-center justify-between bg-white px-16 max-[1320px]:px-10 max-[400px]:px-5">
          <Link href="/">
            <Image src="/koatlcyber.jpg" width={130} height={130} alt="KoatlCyber logo" className="h-auto w-44" />
          </Link>
          <div className="flex items-center gap-x-5">
            <FaBell className="text-xl text-ink" />
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="w-10">
                <Image
                  src="/randomuser.jpg"
                  alt="perfil"
                  width={30}
                  height={30}
                  className="h-full w-full rounded-full"
                />
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu z-[1] w-52 rounded-box bg-base-100 p-2 text-ink shadow"
              >
                <li>
                  <Link href="/admin">Dashboard</Link>
                </li>
                <li>
                  <a>Perfil</a>
                </li>
                <li onClick={handleLogout}>
                  <a href="#">Cerrar sesión</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
