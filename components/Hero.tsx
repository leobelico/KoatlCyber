'use client';
import React, { useState } from "react";
import { FaArrowLeft, FaArrowRight, FaCheck, FaShieldHalved } from "react-icons/fa6";
import ContactModal from "./ContactModal";
import { saasProducts } from "./saasData";

const HeroCarousel = () => {
  const [active, setActive] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const product = saasProducts[active];
  const Icon = product.icon;

  const goTo = (i: number) => {
    setActive((i + saasProducts.length) % saasProducts.length);
    setShowDetails(false);
  };

  return (
    <section id="inicio" className="relative w-full overflow-hidden bg-ink">
      <div className="pointer-events-none absolute inset-0 bg-cyber-grid [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      <div className="pointer-events-none absolute inset-0 bg-cyber-glow" />

      <div className="relative flex min-h-[calc(100vh-130px)] flex-col">
        {showDetails ? (
          <div key={`d-${product.id}`} className="w-full animate-fadeIn px-4 py-16 sm:px-6 lg:px-8">
            <div className="mb-12 text-center">
              <p className="eyebrow mb-3">{"// qué incluye"}</p>
              <h2 className="font-display text-4xl font-bold text-white sm:text-5xl">
                <span className="text-gradient">{product.name}</span>
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-400">{product.description}</p>
              <p className="mt-3 font-mono text-xs uppercase tracking-widest text-mint">Ideal para: {product.audience}</p>
            </div>

            <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-2">
              {product.features.map((f) => (
                <div key={f} className="glass flex items-start gap-3 rounded-xl p-5 text-gray-200">
                  <FaCheck className="mt-1 shrink-0 text-mint" />
                  <span>{f}</span>
                </div>
              ))}
            </div>

            <div className="mx-auto mt-10 flex max-w-5xl flex-col items-center justify-between gap-6 rounded-2xl border border-mint/40 bg-mint/5 p-8 sm:flex-row">
              <div>
                <p className="font-mono text-xs uppercase tracking-widest text-gray-400">Suscripción mensual</p>
                <p className="font-display text-4xl font-bold text-white">{product.price}</p>
                <p className="text-sm text-gray-400">Te armamos el plan según el tamaño de tu operación.</p>
              </div>
              <button onClick={() => setShowForm(true)} className="btn-primary text-lg">
                Solicitar demo <FaArrowRight />
              </button>
            </div>

            <div className="mt-12 text-center">
              <button
                onClick={() => setShowDetails(false)}
                className="inline-flex items-center gap-2 font-mono text-sm uppercase tracking-wider text-mint hover:text-white"
              >
                <FaArrowLeft /> Volver atrás
              </button>
            </div>
          </div>
        ) : (
          <div className="mx-auto grid w-full max-w-screen-2xl flex-grow grid-cols-1 items-center gap-12 px-6 py-16 lg:grid-cols-12 lg:px-16">
            <div key={product.id} className="animate-fadeIn lg:col-span-7">
              <span className="inline-flex items-center gap-2 rounded-full border border-mint/30 bg-mint/5 px-4 py-1.5 font-mono text-xs uppercase tracking-[0.2em] text-mint">
                <FaShieldHalved /> {product.tag}
              </span>
              <h1 className="mt-6 font-display text-5xl font-bold leading-[1.05] text-white max-md:text-4xl max-sm:text-3xl xl:text-7xl">
                {product.title} <span className="text-gradient">{product.highlight}</span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg text-gray-400 max-sm:text-base">{product.description}</p>

              <div className="mt-10 flex flex-wrap gap-4 max-sm:flex-col">
                <button onClick={() => setShowForm(true)} className="btn-primary text-lg">
                  Solicitar demo <FaArrowRight />
                </button>
                <button onClick={() => setShowDetails(true)} className="btn-ghost text-lg">
                  Ver qué incluye
                </button>
              </div>

              <dl className="mt-14 grid max-w-xl grid-cols-3 gap-6 border-t border-mint/15 pt-8">
                {[
                  ["IA", "En cada producto"],
                  ["Seguro", "Por diseño"],
                  ["SLP", "Soporte local"],
                ].map(([k, v]) => (
                  <div key={k}>
                    <dt className="font-display text-3xl font-bold text-white">{k}</dt>
                    <dd className="font-mono text-xs uppercase tracking-wider text-gray-500">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Panel del producto */}
            <div key={`p-${product.id}`} className="relative w-full animate-fadeIn lg:col-span-5">
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-br from-mint/40 via-transparent to-blue-500/30 blur-xl" />
              <div className="glass relative overflow-hidden rounded-2xl border-mint/40 p-8">
                <div className="pointer-events-none absolute inset-x-0 h-24 animate-scan bg-gradient-to-b from-transparent via-mint/10 to-transparent" />
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-mint text-3xl text-ink">
                    <Icon />
                  </div>
                  <div>
                    <p className="font-display text-3xl font-bold text-white">{product.name}</p>
                    <p className="font-mono text-xs uppercase tracking-wider text-mint">{product.audience}</p>
                  </div>
                </div>
                <ul className="mt-8 space-y-3">
                  {product.features.slice(0, 4).map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-gray-300">
                      <FaCheck className="mt-0.5 shrink-0 text-mint" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Controles */}
        <div className="relative z-20 flex items-center justify-center gap-4 pb-8">
          <button onClick={() => goTo(active - 1)} className="rounded-full border border-mint/30 p-3 text-mint transition hover:bg-mint hover:text-ink" aria-label="Producto anterior">
            <FaArrowLeft />
          </button>
          <div className="flex gap-2">
            {saasProducts.map((p, i) => (
              <button
                key={p.id}
                onClick={() => goTo(i)}
                className={`h-1.5 rounded-full transition-all ${i === active ? "w-10 bg-mint" : "w-4 bg-white/25 hover:bg-white/50"}`}
                aria-label={`Ver ${p.name}`}
              />
            ))}
          </div>
          <button onClick={() => goTo(active + 1)} className="rounded-full border border-mint/30 p-3 text-mint transition hover:bg-mint hover:text-ink" aria-label="Producto siguiente">
            <FaArrowRight />
          </button>
        </div>
      </div>

      <ContactModal
        open={showForm}
        onClose={() => setShowForm(false)}
        title={`Solicitud de demo — ${product.name}`}
        service={product.name}
        messageLabel="Cuéntanos de tu negocio y qué quieres resolver"
      />
    </section>
  );
};

export default HeroCarousel;
