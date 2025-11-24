'use client';
import Image from "next/image";
import React, { useState } from "react";

type SlideButton = {
  text: string;
  action: () => void;
  type?: 'quote' | 'support' | 'maintenance' | 'plans';
};

type Slide = {
  title: string;
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
    price: "$4,999",
    originalPrice: "$6,999",
    features: [
      "✅ Hasta 2 páginas diseñadas",
      "✅ 100% Mobile Friendly",
      "✅ Formulario de contacto",
      "✅ Hosting + Dominio .com.mx 1 año",
      "✅ SSL Security Certificate",
      "✅ Entrega en 5 días hábiles",
      "✅ Garantía 30 días"
    ],
    popular: false,
    bgColor: "bg-[#98EFDC]",
    textColor: "text-[#070B15]",
    borderColor: "border-[#070B15]",
    ctaText: "Perfecto para Emprendedores"
  },
  {
    name: "Web Corporativa PRO",
    price: "$14,999",
    originalPrice: "$19,999",
    features: [
      "🔥 5-8 páginas personalizadas",
      "🔥 CMS (Gestiona tu contenido)",
      "🔥 SEO On-Page básico incluido",
      "🔥 Blog integrado",
      "🔥 Diseño responsive premium",
      "🔥 Integración redes sociales",
      "🔥 Soporte técnico 6 meses",
      "🔥 Capacitación incluida"
    ],
    popular: true,
    bgColor: "bg-[#070B15]",
    textColor: "text-[#98EFDC]",
    borderColor: "border-[#98EFDC]",
    ctaText: "Ideal para PYMES en SLP"
  },
  {
    name: "Tienda Online PREMIUM",
    price: "$29,999",
    originalPrice: "$39,999",
    features: [
      "🚀 Hasta 100 productos",
      "🚀 Pasarelas de pago (Mercado Pago, Stripe)",
      "🚀 Carrito de compras avanzado",
      "🚀 SSL Premium + Seguridad",
      "🚀 Backups automáticos diarios",
      "🚀 Certificado SSL EV",
      "🚀 Integración con WhatsApp Business",
      "🚀 Soporte prioritario 12 meses"
    ],
    popular: false,
    bgColor: "bg-[#98EFDC]",
    textColor: "text-[#070B15]",
    borderColor: "border-[#070B15]",
    ctaText: "Solución E-commerce Completa"
  }
];

const supportPlans = [
  {
    name: "Soporte Esencial",
    price: "$1,499/mes",
    features: [
      "🛠️ 5 horas de soporte remoto",
      "🛠️ Asistencia TeamViewer/AnyDesk",
      "🛠️ Respuesta en 8 horas hábiles",
      "🛠️ Mantenimiento preventivo mensual",
      "🛠️ Diagnóstico gratuito",
      "🛠️ Soporte vía WhatsApp/Email",
      "🛠️ Actualizaciones de seguridad"
    ],
    popular: false,
    bgColor: "bg-[#98EFDC]",
    textColor: "text-[#070B15]",
    borderColor: "border-[#070B15]",
    ctaText: "Para Home Office y Freelancers"
  },
  {
    name: "Soporte VIP Empresarial",
    price: "$3,999/mes",
    features: [
      "🔥 15 horas de soporte mensual",
      "🔥 2 visitas presenciales en SLP*",
      "🔥 Respuesta en 2 horas hábiles",
      "🔥 Monitoreo proactivo 24/7",
      "🔥 Prioridad en atención",
      "🔥 Backup en la nube incluido",
      "🔥 Soporte telefónico inmediato",
      "🔥 Reportes de rendimiento"
    ],
    popular: true,
    bgColor: "bg-[#070B15]",
    textColor: "text-[#98EFDC]",
    borderColor: "border-[#98EFDC]",
    ctaText: "Recomendado para PYMES SLP"
  },
  {
    name: "Soporte CORPORATIVO",
    price: "$8,999/mes",
    features: [
      "🚀 Soporte remoto ilimitado",
      "🚀 Respuesta inmediata (<15 min)",
      "🚀 Técnico dedicado en SLP",
      "🚀 Visitas presenciales ilimitadas*",
      "🚀 Reportes ejecutivos mensuales",
      "🚀 Prevención avanzada de fallos",
      "🚀 Auditoría de seguridad trimestral",
      "🚀 Garantía de continuidad"
    ],
    popular: false,
    bgColor: "bg-[#98EFDC]",
    textColor: "text-[#070B15]",
    borderColor: "border-[#070B15]",
    ctaText: "Para Empresas con Operaciones Críticas"
  }
];

const maintenancePlans = [
  {
    name: "Mantenimiento Básico Web",
    price: "$899/mes",
    features: [
      "🔧 Actualizaciones de seguridad",
      "🔧 Backups semanales",
      "🔧 Monitoreo de disponibilidad",
      "🔧 Soporte por email (24h)",
      "🔧 Optimización básica mensual",
      "🔧 SSL siempre activo",
      "🔧 Hosting administrado"
    ],
    popular: false,
    bgColor: "bg-[#98EFDC]",
    textColor: "text-[#070B15]",
    borderColor: "border-[#070B15]",
    ctaText: "Para Sitios Web Personales"
  },
  {
    name: "Mantenimiento PRO",
    price: "$2,999/mes",
    features: [
      "🔥 Actualizaciones automáticas",
      "🔥 SEO y rendimiento incluido",
      "🔥 Respuesta en 4 horas hábiles",
      "🔥 Seguridad web premium",
      "🔥 Optimización continua",
      "🔥 Backups diarios + nube",
      "🔥 Certificado SSL premium",
      "🔥 Análisis de tráfico mensual"
    ],
    popular: true,
    bgColor: "bg-[#070B15]",
    textColor: "text-[#98EFDC]",
    borderColor: "border-[#98EFDC]",
    ctaText: "Ideal para Negocios en SLP"
  },
  {
    name: "Mantenimiento GOLD",
    price: "$5,999/mes",
    features: [
      "🚀 Monitoreo 24/7 avanzado",
      "🚀 Actualizaciones de contenido**",
      "🚀 Backups en tiempo real",
      "🚀 Soporte telefónico prioritario",
      "🚀 Seguridad enterprise",
      "🚀 CDN incluido",
      "🚀 Reportes personalizados",
      "🚀 Garantía 99.9% uptime"
    ],
    popular: false,
    bgColor: "bg-[#98EFDC]",
    textColor: "text-[#070B15]",
    borderColor: "border-[#070B15]",
    ctaText: "Máxima Seguridad y Rendimiento"
  }
];

  const slides: Slide[] = [
    {
      title: "LAS PÁGINAS WEB MÁS RÁPIDAS, SEGURAS Y EFICIENTES",
      description: "¿Estás buscando una página web que sea completa y que tenga todo lo que necesitas? Estás en el lugar correcto. La hacemos en mitad del tiempo y con mejor precio que la competencia.",
      image: "/web.jpg",
      buttons: [
        { text: "COTIZAR AHORA", action: () => { setShowForm(true); setShowPlans(false); }, type: 'quote' },
        { text: "VER PLANES", action: () => { setShowPlans(true); setShowForm(false); }, type: 'plans' }
      ]
    },
    {
      title: "SOPORTE TÉCNICO ESPECIALIZADO 24/7",
      description: "Nuestro equipo de expertos está disponible para resolver cualquier problema técnico que puedas tener, desde configuración de dispositivos hasta solución de errores críticos.",
      image: "/soporte.jpg",
      buttons: [
        { text: "CONTACTAR SOPORTE", action: () => { setShowForm(true); setShowPlans(false); }, type: 'support' },
        { text: "VER PLANES", action: () => { setShowPlans(true); setShowForm(false); }, type: 'plans' }
      ]
    },
    {
      title: "MANTENIMIENTO DE SISTEMAS",
      description: "Mantenemos tus sistemas operando al máximo rendimiento con actualizaciones, optimizaciones y revisiones periódicas para prevenir fallos y mejorar la productividad.",
      image: "/mantenimiento.jpg",
      buttons: [
        { text: "SOLICITAR MANTENIMIENTO", action: () => { setShowForm(true); setShowPlans(false); }, type: 'maintenance' },
        { text: "VER PLANES", action: () => { setShowPlans(true); setShowForm(false); }, type: 'plans' }
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
      default: return 'Formulario de Contacto';
    }
  };

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % slides.length);
    setShowPlans(false);
    setShowForm(false);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setShowPlans(false);
    setShowForm(false);
  };

  const renderPlans = () => {
    let currentPlans = [];
    let serviceName = "";
    
    switch(activeSlide) {
      case 0: 
        currentPlans = webPlans;
        serviceName = "DESARROLLO WEB";
        break;
      case 1: 
        currentPlans = supportPlans;
        serviceName = "SOPORTE TÉCNICO";
        break;
      case 2: 
        currentPlans = maintenancePlans;
        serviceName = "MANTENIMIENTO";
        break;
      default: 
        currentPlans = webPlans;
        serviceName = "SERVICIOS";
    }

    return (
      <div className="w-full py-12 px-4 sm:px-6 lg:px-8 animate-fadeIn">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-[#98EFDC] sm:text-5xl sm:tracking-tight lg:text-6xl">
            PLANES DE {serviceName}
          </h2>
          <p className="max-w-xl mx-auto mt-5 text-xl text-gray-300">
            Elige el paquete que se adapte a tus necesidades
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 max-w-6xl mx-auto">
          {currentPlans.map((plan, index) => (
            <div 
              key={index}
              className={`rounded-2xl overflow-hidden border-4 ${plan.borderColor} shadow-2xl transform transition-all hover:scale-[1.02] hover:shadow-[#98EFDC]/30 ${
                plan.popular ? "scale-105 z-10" : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-[#98EFDC] text-[#070B15] px-6 py-1 text-sm font-bold rounded-bl-xl">
                  ¡RECOMENDADO!
                </div>
              )}
              
              <div className={`${plan.bgColor} ${plan.textColor} p-8 h-full flex flex-col`}>
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-4xl font-black mb-6">{plan.price}</p>
                
                <ul className="space-y-3 mb-8 flex-grow">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => {
                    setShowForm(true);
                    setShowPlans(false);
                  }}
                  className={`w-full py-3 px-6 rounded-lg font-bold transition-all hover:shadow-lg ${
                    plan.popular 
                      ? 'bg-[#98EFDC] text-[#070B15] hover:bg-[#83d8c4]' 
                      : 'bg-[#070B15] text-[#98EFDC] hover:bg-opacity-90'
                  }`}
                >
                  CONTRATAR AHORA
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <button 
            onClick={() => setShowPlans(false)}
            className="inline-flex items-center text-[#98EFDC] hover:text-[#83d8c4] font-bold text-lg"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            VOLVER ATRÁS
          </button>
        </div>
      </div>
    );
  };

  const renderForm = () => (
    <div className={`${showForm ? 'block' : 'hidden'} bg-[#F9FCF8] p-6 rounded-lg shadow-xl border-2 border-[#98EFDC] relative`}>
      <button 
        onClick={() => setShowForm(false)}
        className="absolute top-3 right-3 text-gray-600 hover:text-[#070B15] transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      
      <h3 className="text-2xl font-bold text-[#070B15] mb-4 border-b-2 border-[#98EFDC] pb-2">
        {getFormTitle()}
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-[#070B15]">Nombre Completo *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full border border-[#98EFDC] rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#98EFDC] focus:border-[#98EFDC] bg-white text-[#070B15]"
          />
        </div>
        
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-[#070B15]">Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full border border-[#98EFDC] rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#98EFDC] focus:border-[#98EFDC] bg-white text-[#070B15]"
          />
        </div>
        
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-[#070B15]">Teléfono</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="mt-1 block w-full border border-[#98EFDC] rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#98EFDC] focus:border-[#98EFDC] bg-white text-[#070B15]"
          />
        </div>
        
        {activeSlide === 0 && (
          <div>
            <label htmlFor="service" className="block text-sm font-medium text-[#070B15]">Tipo de Proyecto *</label>
            <select
              id="service"
              name="service"
              value={formData.service}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full border border-[#98EFDC] rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#98EFDC] focus:border-[#98EFDC] bg-white text-[#070B15]"
            >
              <option value="">Selecciona una opción</option>
              <option value="landing">Landing Page</option>
              <option value="ecommerce">Tienda Online</option>
              <option value="corporate">Web Corporativa</option>
              <option value="custom">Aplicación Web Personalizada</option>
            </select>
          </div>
        )}
        
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-[#070B15]">
            {activeSlide === 0 ? 'Describe tu proyecto' : 
              activeSlide === 1 ? 'Describe tu problema técnico' : 
              'Describe tus necesidades de mantenimiento'} *
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            value={formData.message}
            onChange={handleInputChange}
            required
            className="mt-1 block w-full border border-[#98EFDC] rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#98EFDC] focus:border-[#98EFDC] bg-white text-[#070B15]"
          />
        </div>
        
        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#98EFDC] text-[#070B15] font-bold py-2 px-4 rounded-md hover:bg-[#83d8c4] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#98EFDC] transition-colors disabled:opacity-50"
          >
            {isSubmitting ? 'Enviando...' : 'Enviar Solicitud'}
          </button>
        </div>

        {submitStatus === 'success' && (
          <div className="p-3 bg-green-100 text-green-700 rounded-md">
            ¡Gracias por tu solicitud! Nos pondremos en contacto contigo pronto.
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="p-3 bg-red-100 text-red-700 rounded-md">
            Hubo un error al enviar tu solicitud. Por favor intenta nuevamente.
          </div>
        )}
      </form>
    </div>
  );

  return (
    <div className="w-full bg-[#070B15] relative overflow-hidden">
      {/* Controles del carrusel */}
      <button 
        onClick={prevSlide}
        className="absolute left-5 top-1/2 transform -translate-y-1/2 z-20 bg-white/30 text-white p-3 rounded-full hover:bg-white/50 transition-all shadow-lg"
        aria-label="Slide anterior"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-5 top-1/2 transform -translate-y-1/2 z-20 bg-white/30 text-white p-3 rounded-full hover:bg-white/50 transition-all shadow-lg"
        aria-label="Slide siguiente"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
      
      {/* Indicadores de slide */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setActiveSlide(index);
              setShowPlans(false);
              setShowForm(false);
            }}
            className={`w-4 h-4 rounded-full transition-all ${index === activeSlide ? 'bg-[#98EFDC] scale-125' : 'bg-white/50'}`}
            aria-label={`Ir al slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Contenido principal */}
      <div className="min-h-screen flex flex-col">
        {showPlans ? (
          renderPlans()
        ) : (
          <div className="grid grid-cols-3 items-center justify-items-center px-10 gap-x-10 max-w-screen-2xl mx-auto h-[800px] max-lg:grid-cols-1 max-lg:py-10 max-lg:gap-y-6 max-lg:px-5 flex-grow">
            {/* Texto y botones */}
            <div className={`flex flex-col gap-y-5 ${showForm ? 'max-lg:order-first' : 'max-lg:order-last'} col-span-2 max-lg:col-span-1`}>
              <h1 className="text-6xl text-white font-bold mb-3 max-xl:text-5xl max-md:text-4xl max-sm:text-3xl">
                {slides[activeSlide].title}
              </h1>
              <p className="text-white text-xl max-sm:text-base">
                {slides[activeSlide].description}
              </p>
              <div className="flex gap-x-4 max-lg:flex-col max-lg:gap-y-4 mt-6">
                {slides[activeSlide].buttons.map((button, index) => (
                  <button 
                    key={index}
                    onClick={button.action}
                    className={`font-bold px-12 py-4 text-lg rounded-lg transition-all hover:shadow-lg ${
                      index === 0 
                        ? 'bg-[#98EFDC] text-[#070B15] hover:bg-[#83d8c4]' 
                        : 'bg-transparent text-white border-2 border-white hover:bg-white/10'
                    }`}
                  >
                    {button.text}
                  </button>
                ))}
              </div>
            </div>

            {/* Contenedor de imagen/formulario (solo desktop) */}
            <div className="relative w-full h-[500px] lg:block hidden rounded-2xl overflow-hidden border-4 border-[#98EFDC]/50">
              {!showForm ? (
                <Image
                  src={slides[activeSlide].image}
                  fill
                  alt={slides[activeSlide].title}
                  className="object-cover"
                  priority={activeSlide === 0}
                />
              ) : (
                renderForm()
              )}
            </div>
          </div>
        )}

        {/* Formulario móvil */}
        {showForm && (
          <div className="lg:hidden w-full px-5 py-10">
            {renderForm()}
          </div>
        )}
      </div>
    </div>
  );
};

export default HeroCarousel;