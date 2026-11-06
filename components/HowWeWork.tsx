import React from "react";
import { FaClipboardCheck, FaGears, FaChalkboardUser, FaHeadset } from "react-icons/fa6";

const steps = [
  { icon: FaClipboardCheck, title: "Diagnóstico", text: "Entendemos tu operación y definimos qué producto y plan te conviene." },
  { icon: FaGears, title: "Implementación", text: "Configuramos tu cuenta, cargamos tus datos y conectamos WhatsApp y lo que necesites." },
  { icon: FaChalkboardUser, title: "Capacitación", text: "Enseñamos a tu equipo a sacarle provecho desde el primer día." },
  { icon: FaHeadset, title: "Soporte continuo", text: "Te acompañamos con soporte y mejoras: tu SaaS siempre operando." },
];

const HowWeWork = () => (
  <section id="servicio" className="relative overflow-hidden bg-ink px-4 py-24">
    <div className="relative mx-auto max-w-screen-xl">
      <div className="mb-14 text-center">
        <p className="eyebrow mb-3">{"// cómo trabajamos"}</p>
        <h2 className="font-display text-4xl font-bold text-white md:text-5xl">
          No solo software: <span className="text-gradient">te acompañamos</span>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-400">
          Cada SaaS viene con implementación y soporte humano, con equipo local en San Luis Potosí.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={s.title} className="glass glass-hover relative rounded-2xl p-7">
              <span className="absolute right-5 top-4 font-mono text-5xl font-bold text-mint/10">0{i + 1}</span>
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl border border-mint/30 bg-mint/10 text-2xl text-mint">
                <Icon />
              </div>
              <h3 className="mb-2 font-display text-xl font-bold text-white">{s.title}</h3>
              <p className="text-gray-400">{s.text}</p>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

export default HowWeWork;
