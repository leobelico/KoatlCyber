'use client';

import React, { useState } from "react";

const ServicesSection = () => {
  const [activeTab, setActiveTab] = useState(0);

  const serviceCategories = [
    {
      name: "Desarrollo Web",
      services: [
        {
          title: "Desarrollo Web a Medida",
          description: "Páginas ultrarrápidas y optimizadas para conversiones",
          icon: "💻"
        },
        {
          title: "Diseño Impactante",
          description: "Interfaces que capturan la esencia de tu marca",
          icon: "🎨"
        },
        {
          title: "E-commerce",
          description: "Tiendas online con pasarelas de pago integradas",
          icon: "🛒"
        },
        {
          title: "SEO Avanzado",
          description: "Posicionamos tu web en los primeros lugares",
          icon: "🔍"
        }
      ]
    },
    {
      name: "Soporte Técnico",
      services: [
        {
          title: "Soporte 24/7",
          description: "Asistencia técnica permanente para emergencias",
          icon: "🛠️"
        },
        {
          title: "Resolución de Errores",
          description: "Diagnóstico y solución de problemas técnicos",
          icon: "🔧"
        },
        {
          title: "Configuraciones",
          description: "Optimización de sistemas y aplicaciones",
          icon: "⚙️"
        },
        {
          title: "Asesoría Remota",
          description: "Guía experta paso a paso cuando lo necesites",
          icon: "📞"
        }
      ]
    },
    {
      name: "Mantenimiento",
      services: [
        {
          title: "Actualizaciones",
          description: "Mantenemos tus sistemas al día y seguros",
          icon: "🔄"
        },
        {
          title: "Copias de Seguridad",
          description: "Protección de datos con backups periódicos",
          icon: "💾"
        },
        {
          title: "Monitoreo",
          description: "Vigilancia constante de tus sistemas",
          icon: "👁️"
        },
        {
          title: "Optimización",
          description: "Mejora continua del rendimiento",
          icon: "🚀"
        }
      ]
    }
  ];

  return (
    <>
      {/* Transición superior - ajuste perfecto */}
      <div className="h-20 w-full bg-gradient-to-b from-[#070B15] via-[#070B15] to-[#F9FCF8] relative z-10"></div>
      
      {/* Sección de Servicios */}
      <section className="bg-[#F9FCF8] py-16 px-4 relative z-20 -mt-px">
        <div className="max-w-screen-2xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-[#070B15] mb-4">
            SOLUCIONES DIGITALES COMPLETAS
          </h2>
          <p className="text-xl text-center text-[#4A5568] mb-12 max-w-3xl mx-auto">
            Desde el diseño inicial hasta el mantenimiento continuo, cubrimos todas las necesidades de tu presencia online
          </p>
          
          {/* Pestañas de categorías */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex bg-white rounded-lg shadow-md p-1 border border-[#E2E8F0]">
              {serviceCategories.map((category, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`px-6 py-2 rounded-md font-medium transition-colors ${
                    activeTab === index 
                      ? 'bg-[#98EFDC] text-[#070B15] shadow-sm' 
                      : 'text-[#4A5568] hover:bg-[#EDF2F7]'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
          
          {/* Tarjetas de servicios */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
            {serviceCategories[activeTab].services.map((service, index) => (
              <div 
                key={index}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all hover:-translate-y-2 border border-[#E2E8F0] group"
              >
                <div className="text-4xl mb-4 text-[#98EFDC] group-hover:text-[#070B15] transition-colors">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 text-[#070B15]">{service.title}</h3>
                <p className="text-[#4A5568]">{service.description}</p>
              </div>
            ))}
          </div>

          {/* Botón opcional (puedes activarlo si necesitas) */}
          <div className="text-center mt-12">
            <button className="bg-[#070B15] text-[#F9FCF8] font-bold px-8 py-3 rounded-lg hover:bg-[#1A202C] transition-colors inline-flex items-center border-2 border-transparent hover:border-[#98EFDC]">
              <span>Ver todos los servicios</span>
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"></path>
              </svg>
            </button>
          </div>
        </div>
      </section>
      
      {/* Transición inferior - ajuste perfecto */}
      <div className="h-20 w-full bg-gradient-to-b from-[#F9FCF8] via-[#F9FCF8] to-[#070B15] relative z-10 -mt-px"></div>
    </>
  );
};

export default ServicesSection;