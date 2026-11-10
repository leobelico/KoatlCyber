import React from "react";
import { FaArrowRight } from "react-icons/fa6";

const Hero = () => (
  <section id="inicio" className="bg-ink">
    <div className="mx-auto grid max-w-screen-2xl items-center gap-12 px-6 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:px-16 lg:py-24">
      <div>
        <p className="eyebrow">Hecho en San Luis Potosí</p>
        <h1 className="mt-4 font-display text-[clamp(2.4rem,1.4rem+4.6vw,5rem)] font-extrabold leading-[1.04] tracking-tight text-bone">
          Defendemos tu negocio con <span className="text-mint">ingenio</span> mexicano.
        </h1>
        <p className="mt-6 max-w-xl text-lg text-bone-300 md:text-xl">
          Ciberseguridad, software a la medida y productos SaaS con IA para empresas de aquí.
          Raíz local, estándares de cualquier lado.
        </p>
        <div className="mt-10 flex flex-wrap gap-4 max-sm:flex-col">
          <a href="#contacto" className="btn-primary text-lg">
            Agenda una revisión <FaArrowRight />
          </a>
          <a href="#productos" className="btn-ghost text-lg">
            Ver productos
          </a>
        </div>
      </div>

      <svg
        className="mx-auto w-full max-w-[440px]"
        viewBox="0 0 400 380"
        fill="none"
        role="img"
        aria-label="Ilustración geométrica: una pirámide escalonada con una serpiente de línea que la rodea"
      >
        <g strokeWidth="3" strokeLinejoin="miter">
          <path d="M30 350H370V300H340V260H310V220H280V180H250V140H150V180H120V220H90V260H60V300H30Z" stroke="#f2a93b" />
          <path d="M120 350V300H150V260H180V220H220V260H250V300H280V350" stroke="#ee6a4c" />
          <rect x="176" y="296" width="48" height="54" stroke="#f2a93b" />
          <path d="M150 140V100M250 140V100" stroke="#f2a93b" />
        </g>
        <path
          className="animate-draw"
          pathLength={1}
          style={{ strokeDasharray: 1, strokeDashoffset: 1 }}
          d="M20 120c40-50 70 50 110 0s70-50 110 0 70 50 110 0 20-30 30-30"
          stroke="#98efdc"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <circle cx="200" cy="100" r="6" fill="#98efdc" />
      </svg>
    </div>
    <div className="greca" aria-hidden="true" />
  </section>
);

export default Hero;
