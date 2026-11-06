'use client';

import React, { useState } from "react";
import type { IconType } from "react-icons";
import {
  FaArrowRight, FaCode, FaPalette, FaCartShopping, FaMagnifyingGlassChart,
  FaHeadset, FaScrewdriverWrench, FaGears, FaPhoneVolume,
  FaNetworkWired, FaVideo, FaWifi, FaPhone,
  FaArrowsRotate, FaDatabase, FaEye, FaRocket,
} from "react-icons/fa6";

type Service = { title: string; description: string; icon: IconType };

const serviceCategories: { name: string; services: Service[] }[] = [
  {
    name: "Soporte Técnico",
    services: [
      { title: "Soporte 24/7", description: "Asistencia técnica permanente para emergencias", icon: FaHeadset },
      { title: "Resolución de Errores", description: "Diagnóstico y solución de problemas técnicos", icon: FaScrewdriverWrench },
      { title: "Configuraciones", description: "Optimización de sistemas y aplicaciones", icon: FaGears },
      { title: "Asesoría Remota", description: "Guía experta paso a paso cuando lo necesites", icon: FaPhoneVolume },
    ],
  },
  {
    name: "Redes y Seguridad",
    services: [
      { title: "Cableado Estructurado", description: "Instalación profesional de redes cableadas para oficinas y hogares", icon: FaNetworkWired },
      { title: "Cámaras de Seguridad", description: "Sistemas de videovigilancia con monitoreo remoto", icon: FaVideo },
      { title: "Redes WiFi", description: "Optimización de cobertura inalámbrica en todos tus espacios", icon: FaWifi },
      { title: "Centrales Telefónicas", description: "Instalación de sistemas de comunicación empresarial", icon: FaPhone },
    ],
  },
  {
    name: "Mantenimiento",
    services: [
      { title: "Actualizaciones", description: "Mantenemos tus sistemas al día y seguros", icon: FaArrowsRotate },
      { title: "Copias de Seguridad", description: "Protección de datos con backups periódicos", icon: FaDatabase },
      { title: "Monitoreo", description: "Vigilancia constante de tus sistemas", icon: FaEye },
      { title: "Optimización", description: "Mejora continua del rendimiento", icon: FaRocket },
    ],
  },
  {
    name: "Desarrollo Web",
    services: [
      { title: "Desarrollo Web a Medida", description: "Páginas ultrarrápidas y optimizadas para conversiones", icon: FaCode },
      { title: "Diseño Impactante", description: "Interfaces que capturan la esencia de tu marca", icon: FaPalette },
      { title: "E-commerce", description: "Tiendas online con pasarelas de pago integradas", icon: FaCartShopping },
      { title: "SEO Avanzado", description: "Posicionamos tu web en los primeros lugares", icon: FaMagnifyingGlassChart },
    ],
  },
];

const ServicesSection = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="servicios" className="relative overflow-hidden bg-ink-900 px-4 py-24">
      <div className="pointer-events-none absolute inset-0 bg-cyber-grid opacity-60 [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]" />

      <div className="relative mx-auto max-w-screen-2xl">
        <div className="mb-14 text-center">
          <p className="eyebrow mb-3">{"// qué hacemos"}</p>
          <h2 className="font-display text-4xl font-bold text-white md:text-5xl">
            Servicios que <span className="text-gradient">respaldan tu operación</span>
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-gray-400">
            Soporte, mantenimiento, redes y seguridad, y desarrollo web: la base tecnológica para que tu negocio y tus SaaS no se detengan.
          </p>
        </div>

        {/* Pestañas */}
        <div className="mb-12 flex justify-center">
          <div className="glass inline-flex max-w-full overflow-x-auto rounded-xl p-1.5">
            {serviceCategories.map((category, index) => (
              <button
                key={category.name}
                onClick={() => setActiveTab(index)}
                className={`whitespace-nowrap rounded-lg px-5 py-2.5 font-mono text-sm uppercase tracking-wider transition-all ${
                  activeTab === index
                    ? "bg-mint text-ink shadow-[0_0_24px_-4px_rgba(152,239,220,0.7)]"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Tarjetas */}
        <div key={activeTab} className="grid animate-fadeIn grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {serviceCategories[activeTab].services.map((service) => {
            const Icon = service.icon;
            return (
              <div key={service.title} className="glass glass-hover group rounded-2xl p-7">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl border border-mint/30 bg-mint/10 text-2xl text-mint transition-all group-hover:bg-mint group-hover:text-ink">
                  <Icon />
                </div>
                <h3 className="mb-2 font-display text-xl font-bold text-white">{service.title}</h3>
                <p className="text-gray-400">{service.description}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-14 text-center">
          <a href="#planes" className="btn-primary">
            Ver planes de servicio <FaArrowRight />
          </a>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
