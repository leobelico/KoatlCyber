import React from "react";
import type { IconType } from "react-icons";
import { FaShieldHalved, FaCode, FaLayerGroup, FaArrowRight } from "react-icons/fa6";

const services: { title: string; icon: IconType; color: string; text: string; items: string[] }[] = [
  {
    title: "Ciberseguridad",
    icon: FaShieldHalved,
    color: "text-gold",
    text: "Encontramos y cerramos las brechas de tu negocio antes de que alguien las aproveche.",
    items: [
      "Pruebas de seguridad",
      "Hardening de servidores y equipos",
      "Redes seguras, WiFi y cámaras",
      "Soporte, mantenimiento y monitoreo",
    ],
  },
  {
    title: "Desarrollo a la medida",
    icon: FaCode,
    color: "text-mint",
    text: "Sistemas hechos para tu forma de trabajar, con seguridad desde el diseño.",
    items: [
      "Sistemas web y aplicaciones",
      "Integraciones y automatización",
      "Páginas web y tiendas en línea",
      "Mantenimiento continuo",
    ],
  },
  {
    title: "Productos SaaS",
    icon: FaLayerGroup,
    color: "text-chile",
    text: "Software propio, listo para usar, con soporte de un equipo local.",
    items: ["Software listo para usar", "IA integrada donde ayuda", "Implementación y capacitación", "Suscripción mensual"],
  },
];

const ServicesSection = () => (
  <section id="servicios" className="bg-ink py-20">
    <div className="mx-auto max-w-screen-xl px-6 lg:px-8">
      <div className="mb-12 max-w-3xl">
        <p className="eyebrow">Servicios</p>
        <h2 className="mt-3 font-display text-4xl font-extrabold leading-[1.05] text-bone md:text-5xl">
          Tres formas de cuidar y hacer crecer tu operación.
        </h2>
        <p className="mt-4 text-lg text-bone-300">
          Hablamos claro: sin tecnicismos innecesarios y con reportes que se entienden.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {services.map((s) => {
          const Icon = s.icon;
          return (
            <article key={s.title} className="step grid content-start gap-4 bg-ink-800 p-7">
              <Icon className={`text-4xl ${s.color}`} aria-hidden="true" />
              <h3 className="font-display text-2xl font-extrabold text-bone">{s.title}</h3>
              <p className="text-bone-300">{s.text}</p>
              <ul className="grid gap-2 text-bone-200">
                {s.items.map((it) => (
                  <li key={it} className="relative pl-5 before:absolute before:left-0 before:top-[0.6em] before:h-2 before:w-2 before:bg-gold">
                    {it}
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>

      <div className="mt-12">
        <a href="#planes" className="btn-ghost">
          Ver planes de servicio <FaArrowRight />
        </a>
      </div>
    </div>
  </section>
);

export default ServicesSection;
