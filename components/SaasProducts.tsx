'use client';
import React, { useState } from "react";
import { FaArrowRight, FaCheck } from "react-icons/fa6";
import ContactModal from "./ContactModal";
import { saasProducts } from "./saasData";

// Banda superior de cada tarjeta (rotan los colores de la paleta)
const bands = [
  "bg-gold text-ink",
  "bg-chile text-ink",
  "bg-mint text-ink",
  "bg-bone text-ink",
];

const SaasProducts = () => {
  const [demo, setDemo] = useState<string | null>(null);

  return (
    <section id="productos" className="bg-ink-800 py-20">
      <div className="mx-auto max-w-screen-xl px-6 lg:px-8">
        <div className="mb-12 max-w-3xl">
          <p className="eyebrow">Productos SaaS</p>
          <h2 className="mt-3 font-display text-4xl font-extrabold leading-[1.05] text-bone md:text-5xl">
            Software propio para negocios locales.
          </h2>
          <p className="mt-4 text-lg text-bone-300">
            Cada producto incorpora IA y seguridad desde el diseño, con implementación, capacitación y soporte de un equipo local.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {saasProducts.map((p, i) => {
            const Icon = p.icon;
            return (
              <article key={p.id} className="flex flex-col bg-ink-700">
                <p className={`flex items-center gap-2 px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] ${bands[i % bands.length]}`}>
                  <Icon aria-hidden="true" /> {p.audience}
                </p>
                <div className="flex flex-1 flex-col gap-4 p-6">
                  <h3 className="font-display text-3xl font-extrabold text-bone">{p.name}</h3>
                  <p className="text-bone-300">{p.description}</p>

                  <ul className="space-y-2 text-sm text-bone-200">
                    {p.features.slice(0, 3).map((f) => (
                      <li key={f} className="flex items-start gap-2">
                        <FaCheck className="mt-1 shrink-0 text-gold" aria-hidden="true" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <details className="group text-sm">
                    <summary className="flex min-h-[44px] cursor-pointer list-none items-center font-bold text-mint hover:underline">
                      <span className="group-open:hidden">Ver todo lo que incluye</span>
                      <span className="hidden group-open:inline">Ocultar</span>
                    </summary>
                    <ul className="mt-1 space-y-2 text-bone-200">
                      {p.features.slice(3).map((f) => (
                        <li key={f} className="flex items-start gap-2">
                          <FaCheck className="mt-1 shrink-0 text-gold" aria-hidden="true" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </details>

                  <div className="mt-auto border-t border-bone/15 pt-4">
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-bone-400">Suscripción mensual</p>
                    <p className="mb-4 font-display text-2xl font-extrabold text-bone">{p.price}</p>
                    <button onClick={() => setDemo(p.name)} className="btn-primary w-full">
                      Solicitar demo <FaArrowRight />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
      <div className="greca greca-mint mt-20" aria-hidden="true" />

      <ContactModal
        open={demo !== null}
        onClose={() => setDemo(null)}
        title={`Solicitud de demo — ${demo ?? ""}`}
        service={demo ?? undefined}
        messageLabel="Cuéntanos de tu negocio y qué quieres resolver"
      />
    </section>
  );
};

export default SaasProducts;
