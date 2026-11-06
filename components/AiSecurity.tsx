import React from "react";
import { FaBrain, FaShieldHalved, FaCheck } from "react-icons/fa6";

const pillars = [
  {
    icon: FaBrain,
    eyebrow: "// inteligencia artificial",
    title: "IA en cada producto",
    text: "Todos nuestros SaaS incorporan IA para que trabajen mejor y tu equipo dedique su tiempo a lo importante.",
    points: [
      "Asistentes que resumen, priorizan y sugieren el siguiente paso",
      "Automatización de tareas repetitivas y seguimientos",
      "Análisis de métricas para decidir con datos",
      "Redacción asistida de mensajes y contenido",
    ],
  },
  {
    icon: FaShieldHalved,
    eyebrow: "// seguridad",
    title: "Seguridad por diseño",
    text: "Manejamos datos de clientes, pacientes y operaciones reales. La seguridad no es un extra: es parte de cómo construimos.",
    points: [
      "Datos aislados por cliente (multi-tenant)",
      "Roles y permisos para cada integrante del equipo",
      "Cifrado de información sensible y bitácoras de acceso",
      "Consentimiento y privacidad conforme a la LFPDPPP",
    ],
  },
];

const AiSecurity = () => (
  <section id="ia-seguridad" className="relative overflow-hidden bg-ink-900 px-4 py-24">
    <div className="pointer-events-none absolute inset-0 bg-cyber-grid opacity-50 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)]" />
    <div className="relative mx-auto max-w-screen-xl">
      <div className="mb-14 text-center">
        <p className="eyebrow mb-3">{"// nuestro enfoque"}</p>
        <h2 className="font-display text-4xl font-bold text-white md:text-5xl">
          Inteligencia artificial y <span className="text-gradient">seguridad</span>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-400">
          Dos principios en todo lo que construimos: que tu software trabaje de forma inteligente y que tus datos estén protegidos.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {pillars.map((p) => {
          const Icon = p.icon;
          return (
            <div key={p.title} className="glass glass-hover rounded-2xl p-8">
              <div className="mb-6 flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-mint text-2xl text-ink">
                  <Icon />
                </div>
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-mint">{p.eyebrow}</p>
                  <h3 className="font-display text-2xl font-bold text-white">{p.title}</h3>
                </div>
              </div>
              <p className="mb-6 text-gray-400">{p.text}</p>
              <ul className="space-y-3">
                {p.points.map((pt) => (
                  <li key={pt} className="flex items-start gap-3 text-gray-200">
                    <FaCheck className="mt-1 shrink-0 text-mint" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

export default AiSecurity;
