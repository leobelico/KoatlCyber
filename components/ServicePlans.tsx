'use client';
import React, { useState } from "react";
import { FaCheck } from "react-icons/fa6";
import ContactModal from "./ContactModal";

type Plan = {
  name: string;
  price: string;
  features: string[];
  popular: boolean;
  ctaText: string;
};

// ================= PLANES =================
const webPlans = [
  {
    name: "Landing Page Express",
    price: "$6,999",
    originalPrice: "$6,999",
    features: [
      "Hasta 2 páginas diseñadas",
      "100% Mobile Friendly",
      "Formulario de contacto",
      "Hosting + Dominio .com.mx 1 año",
      "SSL Security Certificate",
      "Entrega en 5 días hábiles",
      "Garantía 30 días"
    ],
    popular: false,
    ctaText: "Perfecto para Emprendedores"
  },
  {
    name: "Web Corporativa PRO",
    price: "$19,999",
    originalPrice: "$19,999",
    features: [
      "5-8 páginas personalizadas",
      "CMS (Gestiona tu contenido)",
      "SEO On-Page básico incluido",
      "Blog integrado",
      "Diseño responsive premium",
      "Integración redes sociales",
      "Soporte técnico 6 meses",
      "Capacitación incluida"
    ],
    popular: true,
    ctaText: "Ideal para PYMES en SLP"
  },
  {
    name: "Tienda Online PREMIUM",
    price: "$39,999",
    originalPrice: "$39,999",
    features: [
      "Hasta 100 productos",
      "Pasarelas de pago (Mercado Pago, Stripe)",
      "Carrito de compras avanzado",
      "SSL Premium + Seguridad",
      "Backups automáticos diarios",
      "Certificado SSL EV",
      "Integración con WhatsApp Business",
      "Soporte prioritario 12 meses"
    ],
    popular: false,
    ctaText: "Solución E-commerce Completa"
  }
];

const supportPlans = [
  {
    name: "Soporte Esencial",
    price: "$2,499/mes",
    features: [
      "5 horas de soporte remoto",
      "Asistencia TeamViewer/AnyDesk",
      "Respuesta en 8 horas hábiles",
      "Mantenimiento preventivo mensual",
      "Diagnóstico gratuito",
      "Soporte vía WhatsApp/Email",
      "Actualizaciones de seguridad"
    ],
    popular: false,
    ctaText: "Para Home Office y Freelancers"
  },
  {
    name: "Soporte VIP Empresarial",
    price: "$4,999/mes",
    features: [
      "15 horas de soporte mensual",
      "2 visitas presenciales en SLP*",
      "Respuesta en 2 horas hábiles",
      "Monitoreo proactivo 24/7",
      "Prioridad en atención",
      "Backup en la nube incluido",
      "Soporte telefónico inmediato",
      "Reportes de rendimiento"
    ],
    popular: true,
    ctaText: "Recomendado para PYMES SLP"
  },
  {
    name: "Soporte CORPORATIVO",
    price: "$11,999/mes",
    features: [
      "Soporte remoto ilimitado",
      "Respuesta inmediata (<15 min)",
      "Técnico dedicado en SLP",
      "Visitas presenciales ilimitadas*",
      "Reportes ejecutivos mensuales",
      "Prevención avanzada de fallos",
      "Auditoría de seguridad trimestral",
      "Garantía de continuidad"
    ],
    popular: false,
    ctaText: "Para Empresas con Operaciones Críticas"
  }
];

const maintenancePlans = [
  {
    name: "Mantenimiento Básico Web",
    price: "$1,499/mes",
    features: [
      "Actualizaciones de seguridad",
      "Backups semanales",
      "Monitoreo de disponibilidad",
      "Soporte por email (24h)",
      "Optimización básica mensual",
      "SSL siempre activo",
      "Hosting administrado"
    ],
    popular: false,
    ctaText: "Para Sitios Web Personales"
  },
  {
    name: "Mantenimiento PRO",
    price: "$3,999/mes",
    features: [
      "Actualizaciones automáticas",
      "SEO y rendimiento incluido",
      "Respuesta en 4 horas hábiles",
      "Seguridad web premium",
      "Optimización continua",
      "Backups diarios + nube",
      "Certificado SSL premium",
      "Análisis de tráfico mensual"
    ],
    popular: true,
    ctaText: "Ideal para Negocios en SLP"
  },
  {
    name: "Mantenimiento GOLD",
    price: "$7,999/mes",
    features: [
      "Monitoreo 24/7 avanzado",
      "Actualizaciones de contenido**",
      "Backups en tiempo real",
      "Soporte telefónico prioritario",
      "Seguridad enterprise",
      "CDN incluido",
      "Reportes personalizados",
      "Garantía 99.9% uptime"
    ],
    popular: false,
    ctaText: "Máxima Seguridad y Rendimiento"
  }
];

// ================= PLANES DE INSTALACIÓN =================
const installationPlans = [
  {
    name: "Instalación Básica",
    price: "$8,999",
    features: [
      "Instalación de red LAN básica",
      "Configuración de router/switch",
      "Hasta 5 puntos de red",
      "Cableado estructurado básico",
      "Pruebas de conectividad",
      "Garantía 3 meses",
      "Asesoría técnica inicial"
    ],
    popular: false,
    ctaText: "Para Hogares y Oficinas Pequeñas"
  },
  {
    name: "Instalación PROFESIONAL",
    price: "$24,999",
    features: [
      "Red LAN empresarial completa",
      "Instalación de cámaras de seguridad",
      "Hasta 20 puntos de red",
      "Switch administrable",
      "Cableado categoría 6/6A",
      "Sistema de vigilancia 4 cámaras",
      "Configuración VLAN",
      "Garantía 12 meses"
    ],
    popular: true,
    ctaText: "Ideal para Negocios y Empresas"
  },
  {
    name: "Solución INTEGRAL",
    price: "$49,999",
    features: [
      "Infraestructura completa de red",
      "Sistema de cámaras IP 8+ canales",
      "Puntos de red ilimitados",
      "Switch enterprise + WiFi 6",
      "Cableado estructurado profesional",
      "Servidor local + NAS",
      "Monitoreo remoto 24/7",
      "Garantía 24 meses"
    ],
    popular: false,
    ctaText: "Solución Empresarial Completa"
  }
];


const groups: {
  key: string;
  label: string;
  plans: Plan[];
  formTitle: string;
  messageLabel: string;
  options?: { value: string; label: string }[];
}[] = [
  { key: "soporte", label: "Soporte técnico", plans: supportPlans, formTitle: "Solicitud de Soporte Técnico", messageLabel: "Describe tu problema técnico" },
  { key: "mantenimiento", label: "Mantenimiento", plans: maintenancePlans, formTitle: "Solicitud de Mantenimiento", messageLabel: "Describe tus necesidades de mantenimiento" },
  {
    key: "redes",
    label: "Redes y seguridad",
    plans: installationPlans,
    formTitle: "Solicitud de Instalación de Redes",
    messageLabel: "Describe tus necesidades (m², cámaras, puntos de red, etc.)",
    options: [
      { value: "red-lan", label: "Instalación de Red LAN" },
      { value: "camaras-seguridad", label: "Cámaras de Seguridad" },
      { value: "switch-red", label: "Configuración de Switch" },
      { value: "wifi-empresarial", label: "WiFi Empresarial" },
      { value: "infraestructura-completa", label: "Infraestructura Completa" },
      { value: "otro", label: "Otro (especificar en mensaje)" },
    ],
  },
  {
    key: "web",
    label: "Páginas web",
    plans: webPlans,
    formTitle: "Cotización de Página Web",
    messageLabel: "Describe tu proyecto",
    options: [
      { value: "landing", label: "Landing Page" },
      { value: "ecommerce", label: "Tienda Online" },
      { value: "corporate", label: "Web Corporativa" },
      { value: "custom", label: "Aplicación Web Personalizada" },
    ],
  },
];

const ServicePlans = () => {
  const [tab, setTab] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const group = groups[tab];

  return (
    <section id="planes" className="relative overflow-hidden bg-ink-800 px-4 py-20">
      <div className="relative mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <p className="eyebrow mb-3">Servicios profesionales</p>
          <h2 className="font-display text-4xl font-extrabold text-bone md:text-5xl">
            Planes de <span className="text-mint">servicio</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-bone-300">
            Además de nuestros SaaS, te acompañamos con soporte, mantenimiento, infraestructura y desarrollo web.
          </p>
        </div>

        <div className="mb-12 flex justify-center">
          <div className="inline-flex max-w-full overflow-x-auto bg-ink-700 p-1.5">
            {groups.map((g, i) => (
              <button
                key={g.key}
                onClick={() => setTab(i)}
                className={`min-h-[44px] whitespace-nowrap px-5 text-sm font-bold uppercase tracking-wider transition-colors ${
                  tab === i ? "bg-gold text-ink" : "text-bone-300 hover:text-bone"
                }`}
              >
                {g.label}
              </button>
            ))}
          </div>
        </div>

        <div key={group.key} className="grid animate-fadeIn grid-cols-1 gap-8 md:grid-cols-3">
          {group.plans.map((plan) => (
            <div
              key={plan.name}
              className={`glass glass-hover relative flex flex-col p-8 ${
                plan.popular ? "!border-gold md:-translate-y-3" : ""
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap bg-gold px-4 py-1 text-xs font-bold uppercase tracking-wider text-ink">
                  Recomendado
                </span>
              )}
              <h3 className="font-display text-2xl font-extrabold text-bone">{plan.name}</h3>
              <p className="mt-1 text-sm text-mint">{plan.ctaText}</p>
              <p className="my-6 font-display text-5xl font-extrabold text-bone">{plan.price}</p>
              <ul className="mb-8 flex-grow space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-bone-200">
                    <FaCheck className="mt-1 shrink-0 text-gold" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <button onClick={() => setShowForm(true)} className={plan.popular ? "btn-primary w-full" : "btn-ghost w-full"}>
                Contratar ahora
              </button>
            </div>
          ))}
        </div>
      </div>

      <ContactModal
        open={showForm}
        onClose={() => setShowForm(false)}
        title={group.formTitle}
        service={group.options ? undefined : group.label}
        serviceLabel={group.options ? "Tipo de servicio" : undefined}
        serviceOptions={group.options}
        messageLabel={group.messageLabel}
      />
    </section>
  );
};

export default ServicePlans;
