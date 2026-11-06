'use client';
import Image from "next/image";
import React, { useState } from "react";
import { FaCheck, FaArrowLeft, FaArrowRight, FaXmark, FaShieldHalved } from "react-icons/fa6";

type SlideButton = {
  text: string;
  action: () => void;
  type?: 'quote' | 'support' | 'maintenance' | 'plans' | 'installation';
};

type Slide = {
  tag: string;
  title: string;
  highlight: string;
  description: string;
  image: string;
  buttons: SlideButton[];
};

const HeroCarousel = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [showPlans, setShowPlans] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

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

  const slides: Slide[] = [
    {
      tag: "01 / DESARROLLO WEB",
      title: "Páginas web",
      highlight: "rápidas, seguras y eficientes",
      description: "¿Buscas una página web completa, con todo lo que necesitas? La hacemos en la mitad del tiempo y a mejor precio que la competencia.",
      image: "/web.jpg",
      buttons: [
        { text: "Cotizar ahora", action: () => { setShowForm(true); setShowPlans(false); }, type: 'quote' },
        { text: "Ver planes", action: () => { setShowPlans(true); setShowForm(false); }, type: 'plans' }
      ]
    },
    {
      tag: "02 / SOPORTE TÉCNICO",
      title: "Soporte técnico",
      highlight: "especializado 24/7",
      description: "Nuestro equipo resuelve cualquier problema técnico: desde configuración de dispositivos hasta errores críticos, en remoto o en sitio.",
      image: "/soporte.jpg",
      buttons: [
        { text: "Contactar soporte", action: () => { setShowForm(true); setShowPlans(false); }, type: 'support' },
        { text: "Ver planes", action: () => { setShowPlans(true); setShowForm(false); }, type: 'plans' }
      ]
    },
    {
      tag: "03 / MANTENIMIENTO",
      title: "Mantenimiento de",
      highlight: "sistemas y sitios web",
      description: "Mantenemos tus sistemas al máximo rendimiento con actualizaciones, optimización y revisiones periódicas para prevenir fallos.",
      image: "/mantenimiento.jpg",
      buttons: [
        { text: "Solicitar mantenimiento", action: () => { setShowForm(true); setShowPlans(false); }, type: 'maintenance' },
        { text: "Ver planes", action: () => { setShowPlans(true); setShowForm(false); }, type: 'plans' }
      ]
    },
    {
      tag: "04 / REDES Y SEGURIDAD",
      title: "Redes y cámaras de",
      highlight: "seguridad profesionales",
      description: "Instalamos infraestructura de red, cámaras de vigilancia, switches y sistemas LAN completos para hogares y empresas en San Luis Potosí.",
      image: "/instalacion-redes.jpg",
      buttons: [
        { text: "Solicitar instalación", action: () => { setShowForm(true); setShowPlans(false); }, type: 'installation' },
        { text: "Ver planes", action: () => { setShowPlans(true); setShowForm(false); }, type: 'plans' }
      ]
    }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          subject: getFormTitle(),
          to: 'ventas@koatlcyber.com',
          from: 'leonardo@koatlcyber.com'
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: '',
          message: ''
        });
        setTimeout(() => {
          setShowForm(false);
        }, 2000);
      } else {
        throw new Error('Error al enviar el correo');
      }
    } catch (error) {
      console.error('Error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getFormTitle = () => {
    const currentSlide = slides[activeSlide];
    const actionButton = currentSlide.buttons.find(b => b.type);

    if (!actionButton || !actionButton.type) return 'Formulario de Contacto';

    switch(actionButton.type) {
      case 'quote': return 'Cotización de Página Web';
      case 'support': return 'Solicitud de Soporte Técnico';
      case 'maintenance': return 'Solicitud de Mantenimiento';
      case 'installation': return 'Solicitud de Instalación de Redes';
      default: return 'Formulario de Contacto';
    }
  };

  const goTo = (index: number) => {
    setActiveSlide((index + slides.length) % slides.length);
    setShowPlans(false);
    setShowForm(false);
  };

  const planSets = [
    { plans: webPlans, name: "DESARROLLO WEB" },
    { plans: supportPlans, name: "SOPORTE TÉCNICO" },
    { plans: maintenancePlans, name: "MANTENIMIENTO" },
    { plans: installationPlans, name: "REDES Y SEGURIDAD" },
  ];

  const renderPlans = () => {
    const { plans: currentPlans, name: serviceName } = planSets[activeSlide] ?? planSets[0];

    return (
      <div className="w-full animate-fadeIn px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-14 text-center">
          <p className="eyebrow mb-3">// planes y precios</p>
          <h2 className="font-display text-4xl font-bold text-white sm:text-5xl">
            Planes de <span className="text-gradient">{serviceName}</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-gray-400">
            Elige el paquete que se adapte a tus necesidades
          </p>
        </div>

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-3">
          {currentPlans.map((plan, index) => (
            <div
              key={index}
              className={`glass glass-hover relative flex flex-col rounded-2xl p-8 ${
                plan.popular ? "!border-mint shadow-[0_0_60px_-20px_rgba(152,239,220,0.55)] md:-translate-y-3" : ""
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-mint px-4 py-1 font-mono text-xs font-bold uppercase tracking-wider text-ink">
                  Recomendado
                </span>
              )}

              <h3 className="font-display text-2xl font-bold text-white">{plan.name}</h3>
              <p className="mt-1 text-sm text-mint">{plan.ctaText}</p>
              <p className="my-6 font-display text-5xl font-bold text-white">{plan.price}</p>

              <ul className="mb-8 flex-grow space-y-3">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-300">
                    <FaCheck className="mt-1 shrink-0 text-mint" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => {
                  setShowForm(true);
                  setShowPlans(false);
                }}
                className={plan.popular ? "btn-primary w-full" : "btn-ghost w-full"}
              >
                Contratar ahora
              </button>
            </div>
          ))}
        </div>

        <div className="mt-14 text-center">
          <button
            onClick={() => setShowPlans(false)}
            className="inline-flex items-center gap-2 font-mono text-sm uppercase tracking-wider text-mint hover:text-white"
          >
            <FaArrowLeft /> Volver atrás
          </button>
        </div>
      </div>
    );
  };

  const renderForm = () => (
    <div className="relative h-full w-full overflow-y-auto rounded-2xl bg-ink-800 p-6 max-lg:h-auto">
      <button
        onClick={() => setShowForm(false)}
        className="absolute right-4 top-4 text-gray-400 transition-colors hover:text-mint"
        aria-label="Cerrar formulario"
      >
        <FaXmark className="text-xl" />
      </button>

      <h3 className="mb-4 border-b border-mint/20 pb-3 font-display text-xl font-bold text-white">
        {getFormTitle()}
      </h3>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label htmlFor="name" className="block text-sm text-gray-300">Nombre completo *</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required className="field" />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm text-gray-300">Email *</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required className="field" />
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm text-gray-300">Teléfono</label>
          <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} className="field" />
        </div>

        {activeSlide === 0 && (
          <div>
            <label htmlFor="service" className="block text-sm text-gray-300">Tipo de proyecto *</label>
            <select id="service" name="service" value={formData.service} onChange={handleInputChange} required className="field">
              <option value="">Selecciona una opción</option>
              <option value="landing">Landing Page</option>
              <option value="ecommerce">Tienda Online</option>
              <option value="corporate">Web Corporativa</option>
              <option value="custom">Aplicación Web Personalizada</option>
            </select>
          </div>
        )}

        {activeSlide === 3 && (
          <div>
            <label htmlFor="service" className="block text-sm text-gray-300">Tipo de instalación *</label>
            <select id="service" name="service" value={formData.service} onChange={handleInputChange} required className="field">
              <option value="">Selecciona una opción</option>
              <option value="red-lan">Instalación de Red LAN</option>
              <option value="camaras-seguridad">Cámaras de Seguridad</option>
              <option value="switch-red">Configuración de Switch</option>
              <option value="wifi-empresarial">WiFi Empresarial</option>
              <option value="infraestructura-completa">Infraestructura Completa</option>
              <option value="otro">Otro (Especificar en mensaje)</option>
            </select>
          </div>
        )}

        <div>
          <label htmlFor="message" className="block text-sm text-gray-300">
            {activeSlide === 0 ? 'Describe tu proyecto' :
              activeSlide === 1 ? 'Describe tu problema técnico' :
              activeSlide === 2 ? 'Describe tus necesidades de mantenimiento' :
              'Describe tus necesidades (m², cámaras, puntos de red, etc.)'} *
          </label>
          <textarea id="message" name="message" rows={3} value={formData.message} onChange={handleInputChange} required className="field" />
        </div>

        <button type="submit" disabled={isSubmitting} className="btn-primary w-full disabled:opacity-50">
          {isSubmitting ? 'Enviando...' : 'Enviar solicitud'}
        </button>

        {submitStatus === 'success' && (
          <div className="rounded-lg border border-mint/40 bg-mint/10 p-3 text-sm text-mint">
            ¡Gracias por tu solicitud! Nos pondremos en contacto contigo pronto.
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="rounded-lg border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-300">
            Hubo un error al enviar tu solicitud. Por favor intenta nuevamente.
          </div>
        )}
      </form>
    </div>
  );

  const slide = slides[activeSlide];

  return (
    <section id="inicio" className="relative w-full overflow-hidden bg-ink">
      {/* Fondo cyber */}
      <div className="pointer-events-none absolute inset-0 bg-cyber-grid [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      <div className="pointer-events-none absolute inset-0 bg-cyber-glow" />

      <div className="relative flex min-h-[calc(100vh-130px)] flex-col">
        {showPlans ? (
          renderPlans()
        ) : (
          <div className="mx-auto grid w-full max-w-screen-2xl flex-grow grid-cols-1 items-center gap-12 px-6 py-16 lg:grid-cols-12 lg:px-16">
            {/* Texto y botones */}
            <div key={activeSlide} className={`animate-fadeIn lg:col-span-7 ${showForm ? 'max-lg:order-first' : ''}`}>
              <span className="inline-flex items-center gap-2 rounded-full border border-mint/30 bg-mint/5 px-4 py-1.5 font-mono text-xs uppercase tracking-[0.2em] text-mint">
                <FaShieldHalved /> {slide.tag}
              </span>
              <h1 className="mt-6 font-display text-5xl font-bold leading-[1.05] text-white max-md:text-4xl max-sm:text-3xl xl:text-7xl">
                {slide.title}{" "}
                <span className="text-gradient">{slide.highlight}</span>
              </h1>
              <p className="mt-6 max-w-2xl text-lg text-gray-400 max-sm:text-base">
                {slide.description}
              </p>
              <div className="mt-10 flex flex-wrap gap-4 max-sm:flex-col">
                {slide.buttons.map((button, index) => (
                  <button
                    key={index}
                    onClick={button.action}
                    className={index === 0 ? "btn-primary text-lg" : "btn-ghost text-lg"}
                  >
                    {button.text}
                    {index === 0 && <FaArrowRight />}
                  </button>
                ))}
              </div>

              {/* Métricas */}
              <dl className="mt-14 grid max-w-xl grid-cols-3 gap-6 border-t border-mint/15 pt-8">
                {[
                  ["24/7", "Soporte"],
                  ["99.9%", "Uptime"],
                  ["SLP", "Presencia local"],
                ].map(([k, v]) => (
                  <div key={k}>
                    <dt className="font-display text-3xl font-bold text-white">{k}</dt>
                    <dd className="font-mono text-xs uppercase tracking-wider text-gray-500">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Imagen / formulario (desktop) */}
            <div className="relative hidden h-[560px] w-full lg:col-span-5 lg:block">
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-br from-mint/40 via-transparent to-blue-500/30 blur-xl" />
              <div className="relative h-full overflow-hidden rounded-2xl border border-mint/40">
                {!showForm ? (
                  <>
                    <Image
                      key={slide.image}
                      src={slide.image}
                      fill
                      alt={slide.title}
                      className="object-cover"
                      priority={activeSlide === 0}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-ink/30" />
                    <div className="pointer-events-none absolute inset-x-0 h-24 animate-scan bg-gradient-to-b from-transparent via-mint/15 to-transparent" />
                  </>
                ) : (
                  renderForm()
                )}
              </div>
            </div>
          </div>
        )}

        {/* Formulario móvil */}
        {showForm && (
          <div className="w-full px-5 pb-10 lg:hidden">{renderForm()}</div>
        )}

        {/* Controles */}
        <div className="relative z-20 flex items-center justify-center gap-4 pb-8">
          <button onClick={() => goTo(activeSlide - 1)} className="rounded-full border border-mint/30 p-3 text-mint transition hover:bg-mint hover:text-ink" aria-label="Slide anterior">
            <FaArrowLeft />
          </button>
          <div className="flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goTo(index)}
                className={`h-1.5 rounded-full transition-all ${index === activeSlide ? 'w-10 bg-mint' : 'w-4 bg-white/25 hover:bg-white/50'}`}
                aria-label={`Ir al slide ${index + 1}`}
              />
            ))}
          </div>
          <button onClick={() => goTo(activeSlide + 1)} className="rounded-full border border-mint/30 p-3 text-mint transition hover:bg-mint hover:text-ink" aria-label="Slide siguiente">
            <FaArrowRight />
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroCarousel;
