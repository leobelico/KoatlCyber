import React from "react";

const steps = [
  { title: "Diagnóstico", text: "Entendemos tu operación y qué necesitas proteger o construir." },
  { title: "Implementación", text: "Configuramos, cargamos tus datos y conectamos WhatsApp y lo que haga falta." },
  { title: "Capacitación", text: "Enseñamos a tu equipo a sacarle provecho desde el primer día." },
  { title: "Acompañamiento", text: "Soporte, mejoras y revisiones periódicas con equipo local." },
];

const HowWeWork = () => (
  <section id="servicio" className="bg-ink py-20">
    <div className="mx-auto max-w-screen-xl px-6 lg:px-8">
      <div className="mb-12 max-w-3xl">
        <p className="eyebrow">Cómo trabajamos</p>
        <h2 className="mt-3 font-display text-4xl font-extrabold leading-[1.05] text-bone md:text-5xl">
          No solo software: <span className="text-mint">te acompañamos.</span>
        </h2>
        <p className="mt-4 text-lg text-bone-300">
          Cada proyecto y cada SaaS viene con proceso claro, implementación y soporte humano en San Luis Potosí.
        </p>
      </div>

      <ol className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((s, i) => (
          <li key={s.title} className="border-l-[6px] border-mint bg-ink-800 p-6">
            <h3 className="font-display text-xl font-bold text-bone">
              {i + 1} · {s.title}
            </h3>
            <p className="mt-2 text-bone-300">{s.text}</p>
          </li>
        ))}
      </ol>
    </div>
    <div className="greca mt-20" aria-hidden="true" />
  </section>
);

export default HowWeWork;
