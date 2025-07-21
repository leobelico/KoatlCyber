import Image from "next/image";
import React from "react";

const team = [
  {
    name: "Leonardo Mendoza",
    role: "CEO & Full Stack Developer",
    imageUrl: "/equipo/leonardo.webp",
  },
  {
    name: "Jorge Ruíz",
    role: "Vendedor",
    imageUrl: "/equipo/jorge.webp",
  },
  {
    name: "Alejandro Soto",
    role: "Backend Developer",
    imageUrl: "/equipo/carlos.webp",
  },
    {
    name: "Cesar Hernandez",
    role: "Tester & QA",
    imageUrl: "/equipo/cesar.webp",
  },
      {
    name: "Angel Lizardo",
    role: "Soporte Técnico",
    imageUrl: "/equipo/angel.webp",
  },
      {
    name: "Ana Laura Araiza",
    role: "Frontend Developer",
    imageUrl: "/equipo/ana.webp",
  },
];

const Footer = () => {
  return (
    <footer className="bg-[#F9FCF8] border-t border-gray-200">
      <div className="mx-auto max-w-screen-xl px-6 py-12 lg:px-8">
        
        {/* Logo y descripción */}
        <div className="flex flex-col items-center text-center">
          <Image
            src="/footer2.png"
            alt="Logo de la empresa"
            width={260}
            height={120}
          />
          <p className="mt-4 text-sm text-gray-600 max-w-md">
            Creamos soluciones digitales que impulsan tu negocio.
          </p>
        </div>

        {/* Nuestro equipo */}
        <div className="mt-12">
          <h3 className="text-center text-lg font-bold text-gray-900 mb-6">Nuestro Equipo</h3>
          <div className="flex flex-wrap justify-center gap-8">
            {team.map((member, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <Image
                  src={member.imageUrl}
                  alt={member.name}
                  width={100}
                  height={100}
                  className="rounded-full object-cover"
                />
                <p className="mt-2 text-sm font-semibold text-gray-800">{member.name}</p>
                <p className="text-sm text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contacto y derechos */}
        <div className="mt-12 border-t border-gray-200 pt-6 text-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Todos los derechos reservados.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            WhatsApp: +52 1 4443479221 | Email: leonardo@koatlcyber.com
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
