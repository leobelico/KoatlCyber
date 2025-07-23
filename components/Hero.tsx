'use client';

import Image from "next/image";
import React, { useState } from "react";

type SlideButton = {
  text: string;
  action: () => void;
  type?: 'quote' | 'support' | 'maintenance';
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
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const slides: Slide[] = [
    {
      title: "LAS PÁGINAS WEB MÁS RÁPIDAS, SEGURAS Y EFICIENTES",
      description: "¿Estás buscando una página web que sea completa y que tenga todo lo que necesitas? Estás en el lugar correcto. La hacemos en mitad del tiempo y con mejor precio que la competencia.",
      image: "/web.jpg",
      buttons: [
        { text: "COTIZAR AHORA", action: () => setShowForm(true), type: 'quote' },
        { text: "MÁS INFORMACIÓN", action: () => {} }
      ]
    },
    {
      title: "SOPORTE TÉCNICO ESPECIALIZADO 24/7",
      description: "Nuestro equipo de expertos está disponible para resolver cualquier problema técnico que puedas tener, desde configuración de dispositivos hasta solución de errores críticos.",
      image: "/soporte.jpg",
      buttons: [
        { text: "CONTACTAR SOPORTE", action: () => setShowForm(true), type: 'support' },
        { text: "VER SERVICIOS", action: () => {} }
      ]
    },
    {
      title: "MANTENIMIENTO DE SISTEMAS DE SOFTWARE Y HARDWARE",
      description: "Mantenemos tus sistemas operando al máximo rendimiento con actualizaciones, optimizaciones y revisiones periódicas para prevenir fallos y mejorar la productividad.",
      image: "/mantenimiento.jpg",
      buttons: [
        { text: "SOLICITAR MANTENIMIENTO", action: () => setShowForm(true), type: 'maintenance' },
        { text: "CONOCE NUESTROS PLANES", action: () => {} }
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
      case 'quote': return 'Solicitud de Cotización';
      case 'support': return 'Solicitud de Soporte Técnico';
      case 'maintenance': return 'Solicitud de Mantenimiento';
      default: return 'Formulario de Contacto';
    }
  };

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="h-[700px] w-full bg-[#070B15] max-lg:h-auto relative overflow-hidden">
      {/* Controles del carrusel */}
      <button 
        onClick={prevSlide}
        className="absolute left-5 top-1/2 transform -translate-y-1/2 z-10 bg-white/30 text-white p-2 rounded-full hover:bg-white/50 transition-colors max-lg:top-[40%]"
        aria-label="Slide anterior"
      >
        &lt;
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-5 top-1/2 transform -translate-y-1/2 z-10 bg-white/30 text-white p-2 rounded-full hover:bg-white/50 transition-colors max-lg:top-[40%]"
        aria-label="Slide siguiente"
      >
        &gt;
      </button>
      
      {/* Indicadores de slide */}
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${index === activeSlide ? 'bg-[#98EFDC]' : 'bg-white/50'}`}
            aria-label={`Ir al slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Contenido del slide actual */}
      <div className="grid grid-cols-3 items-center justify-items-center px-10 gap-x-10 max-w-screen-2xl mx-auto h-full max-lg:grid-cols-1 max-lg:py-10 max-lg:gap-y-6 max-lg:px-5">
        <div className={`flex flex-col gap-y-5 ${showForm ? 'max-lg:order-first' : 'max-lg:order-last'} col-span-2 max-lg:col-span-1`}>
          <h1 className="text-6xl text-white font-bold mb-3 max-xl:text-5xl max-md:text-4xl max-sm:text-3xl">
            {slides[activeSlide].title}
          </h1>
          <p className="text-white max-sm:text-sm">
            {slides[activeSlide].description}
          </p>
          <div className="flex gap-x-1 max-lg:flex-col max-lg:gap-y-1">
            {slides[activeSlide].buttons.map((button, index) => (
              <button 
                key={index}
                onClick={button.action}
                className={`font-bold px-12 py-3 max-lg:text-xl max-sm:text-lg transition-colors ${
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
        
        {/* Contenedor de imagen (solo en desktop) */}
        <div className="relative w-auto h-auto lg:block hidden">
          {!showForm ? (
            <Image
              src={slides[activeSlide].image}
              width={500}
              height={500}
              alt={slides[activeSlide].title}
              className="w-full h-full object-cover rounded-lg"
              priority={activeSlide === 0}
            />
          ) : (
            <div className="bg-[#F9FCF8] p-6 rounded-lg shadow-xl w-full h-full overflow-y-auto border-2 border-[#98EFDC]">
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
          )}
        </div>

        {/* Formulario móvil (solo se muestra cuando showForm es true) */}
        {showForm && (
          <div className="lg:hidden w-full col-span-1 mt-4">
            <div className="bg-[#F9FCF8] p-6 rounded-lg shadow-xl w-full overflow-y-auto border-2 border-[#98EFDC] relative">
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
                  <label htmlFor="name-mobile" className="block text-sm font-medium text-[#070B15]">Nombre Completo *</label>
                  <input
                    type="text"
                    id="name-mobile"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full border border-[#98EFDC] rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#98EFDC] focus:border-[#98EFDC] bg-white text-[#070B15]"
                  />
                </div>
                
                <div>
                  <label htmlFor="email-mobile" className="block text-sm font-medium text-[#070B15]">Email *</label>
                  <input
                    type="email"
                    id="email-mobile"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full border border-[#98EFDC] rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#98EFDC] focus:border-[#98EFDC] bg-white text-[#070B15]"
                  />
                </div>
                
                <div>
                  <label htmlFor="phone-mobile" className="block text-sm font-medium text-[#070B15]">Teléfono</label>
                  <input
                    type="tel"
                    id="phone-mobile"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-[#98EFDC] rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-[#98EFDC] focus:border-[#98EFDC] bg-white text-[#070B15]"
                  />
                </div>
                
                {activeSlide === 0 && (
                  <div>
                    <label htmlFor="service-mobile" className="block text-sm font-medium text-[#070B15]">Tipo de Proyecto *</label>
                    <select
                      id="service-mobile"
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
                  <label htmlFor="message-mobile" className="block text-sm font-medium text-[#070B15]">
                    {activeSlide === 0 ? 'Describe tu proyecto' : 
                     activeSlide === 1 ? 'Describe tu problema técnico' : 
                     'Describe tus necesidades de mantenimiento'} *
                  </label>
                  <textarea
                    id="message-mobile"
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
          </div>
        )}
      </div>
    </div>
  );
};

export default HeroCarousel;