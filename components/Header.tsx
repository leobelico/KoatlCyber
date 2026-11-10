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
  { label: "Productos", href: "/#productos" },
  { label: "Servicios", href: "/#servicios" },
  { label: "Seguridad", href: "/#seguridad" },
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
    <header className="z-50 bg-ink/95 backdrop-blur-md lg:sticky lg:top-0">
      <HeaderTop />
      {!isAdmin ? (
        <div className="border-b border-bone/10">
          <div className="mx-auto flex max-w-screen-2xl items-center justify-between gap-x-4 px-6 py-2 lg:px-12 max-lg:flex-col max-lg:gap-y-1">
            <Link href="/" className="shrink-0">
              <Image
                src="/koatlcyber.jpg"
                alt="KoatlCyber logo"
                width={300}
                height={150}
                className="max-h-[56px] w-auto object-contain"
                priority
              />
            </Link>

            <nav className="flex flex-wrap items-center justify-center text-sm font-bold text-bone">
              {navLinks.map((l) => (
                <Link key={l.href} href={l.href} className="inline-flex min-h-[44px] items-center px-3 transition-colors hover:text-mint max-sm:px-2 max-sm:text-xs">
                  {l.label}
                </Link>
              ))}
            </nav>

            <a
              href="https://wa.me/524443479221"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary !min-h-[44px] !px-5 text-sm max-lg:hidden"
            >
              <FaWhatsapp className="text-lg" />
              Hablemos
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
