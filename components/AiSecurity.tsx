import React from "react";

const principles = [
  { title: "IA en cada producto", text: "Asistentes que resumen, priorizan y sugieren el siguiente paso, y automatizan lo repetitivo." },
  { title: "Datos aislados", text: "Cada negocio ve únicamente su información." },
  { title: "Roles y permisos", text: "Cada persona accede solo a lo necesario." },
  { title: "Cifrado y bitácoras", text: "Para lo sensible, con registro de accesos." },
  { title: "Privacidad LFPDPPP", text: "Consentimiento y aviso de privacidad claros." },
  { title: "Análisis con datos", text: "Métricas para decidir con información, no con corazonadas." },
];

const AiSecurity = () => (
  <section id="seguridad" className="bg-ink-800 py-20">
    <div className="mx-auto max-w-screen-xl px-6 lg:px-8">
      <div className="mb-12 max-w-3xl">
        <p className="eyebrow">Inteligencia artificial y seguridad</p>
        <h2 className="mt-3 font-display text-4xl font-extrabold leading-[1.05] text-bone md:text-5xl">
          Principios que aplicamos en todo lo que construimos.
        </h2>
        <p className="mt-4 text-lg text-bone-300">
          Dos ideas guían cada proyecto: que tu software trabaje de forma inteligente y que tus datos estén protegidos.
        </p>
      </div>

      <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {principles.map((p, i) => (
          <div key={p.title} className="border-t-[3px] border-gold pt-4">
            <span className="mb-1 block font-display text-4xl font-extrabold text-gold" aria-hidden="true">
              0{i + 1}
            </span>
            <h3 className="font-display text-xl font-bold text-bone">{p.title}</h3>
            <p className="mt-1 text-bone-300">{p.text}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default AiSecurity;
