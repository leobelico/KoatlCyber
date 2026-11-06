import Image from "next/image";
import React from "react";
import Link from "next/link";
import { FaWhatsapp, FaRegEnvelope, FaLocationDot } from "react-icons/fa6";

const team = [
  { name: "Leonardo Mendoza", role: "CEO & Full Stack Developer", imageUrl: "/equipo/leonardo.webp" },
  { name: "Jorge Ruíz", role: "Vendedor", imageUrl: "/equipo/jorge.webp" },
  { name: "Alejandro Soto", role: "Backend Developer", imageUrl: "/equipo/carlos.webp" },
  { name: "Cesar Hernandez", role: "Tester & QA", imageUrl: "/equipo/cesar.webp" },
  { name: "Angel Lizardo", role: "Soporte Técnico", imageUrl: "/equipo/angel.webp" },
  { name: "Ana Laura Araiza", role: "Frontend Developer", imageUrl: "/equipo/ana.webp" },
];

const links = [
  { label: "Productos SaaS", href: "/#inicio" },
  { label: "Servicios", href: "/#servicios" },
  { label: "Planes", href: "/#planes" },
  { label: "Proyectos", href: "/#proyectos" },
  { label: "Términos y condiciones", href: "/terminos-y-condiciones" },
  { label: "Política de privacidad", href: "/politica-de-privacidad" },
];

const Footer = () => {
  return (
    <footer id="contacto" className="relative overflow-hidden border-t border-mint/15 bg-ink-900 text-gray-400">
      <div className="pointer-events-none absolute inset-0 bg-cyber-glow opacity-60" />

      <div className="relative mx-auto max-w-screen-xl px-6 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-3">
          {/* Marca */}
          <div>
            <Image src="/footer2.png" alt="KoatlCyber" width={220} height={100} />
            <p className="mt-5 max-w-sm text-sm leading-relaxed">
              SaaS con inteligencia artificial y seguridad por diseño, con soporte, mantenimiento y redes de la mano de un equipo local en San Luis Potosí.
            </p>
          </div>

          {/* Enlaces */}
          <div>
            <h3 className="eyebrow mb-5">{"// enlaces"}</h3>
            <ul className="space-y-3 text-sm">
              {links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="transition-colors hover:text-mint">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="eyebrow mb-5">{"// contacto"}</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-3">
                <FaWhatsapp className="text-lg text-mint" />
                <a href="https://wa.me/524443479221" target="_blank" rel="noopener noreferrer" className="hover:text-mint">
                  +52 1 444 347 9221
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FaRegEnvelope className="text-lg text-mint" />
                <a href="mailto:ventas@koatlcyber.com" className="hover:text-mint">ventas@koatlcyber.com</a>
              </li>
              <li className="flex items-center gap-3">
                <FaLocationDot className="text-lg text-mint" />
                <span>San Luis Potosí, México</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Equipo */}
        <div className="mt-16 border-t border-mint/10 pt-12">
          <h3 className="eyebrow mb-8 text-center">{"// nuestro equipo"}</h3>
          <div className="flex flex-wrap justify-center gap-8">
            {team.map((member) => (
              <div key={member.name} className="flex w-32 flex-col items-center text-center">
                <div className="rounded-full bg-gradient-to-br from-mint to-blue-500 p-[2px]">
                  <Image
                    src={member.imageUrl}
                    alt={member.name}
                    width={96}
                    height={96}
                    className="h-24 w-24 rounded-full border-2 border-ink-900 object-cover"
                  />
                </div>
                <p className="mt-3 text-sm font-semibold text-white">{member.name}</p>
                <p className="font-mono text-[11px] uppercase tracking-wide text-gray-500">{member.role}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-2 border-t border-mint/10 pt-6 font-mono text-xs text-gray-500 sm:flex-row">
          <p>© {new Date().getFullYear()} KoatlCyber. Todos los derechos reservados.</p>
          <p className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 animate-pulseDot rounded-full bg-mint" /> Sistemas operando
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
