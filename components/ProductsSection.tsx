'use client';
import React, { useState } from "react";
import Heading from "./Heading";
import Image from "next/image";

interface Review {
  id: number;
  companyName: string;
  reviewText: string;
  rating: number;
  photos: string[];
  date: string;
}

const mockReviews: Review[] = [
  {
    id: 1,
    companyName: "GlobalMedia",
    reviewText: "Excelente trabajo en nuestro sitio web. Increíblemente rápido y profesional.",
    rating: 5,
    photos: ["/global1.jpeg", "/global2.jpeg"],
    date: "2024-10-15"
  },
  {
    id: 2,
    companyName: "Magna",
    reviewText: "Muy satisfechos con el diseño y funcionalidad de nuestra tienda online.",
    rating: 4,
    photos: ["/magna1.jpeg"],
    date: "2024-11-02"
  },
  {
    id: 3,
    companyName: "Carniceria",
    reviewText: "El equipo respondió a todas nuestras necesidades específicas. ¡Altamente recomendados!",
    rating: 5,
    photos: ["/carniceria1.jpeg", "/carniceria2.jpeg", "/carniceria3.jpeg"],
    date: "2024-09-28"
  },
  {
    id: 4,
    companyName: "TechSolutions",
    reviewText: "Buen servicio pero el tiempo de entrega fue un poco largo.",
    rating: 3,
    photos: ["/tech1.jpeg"],
    date: "2024-08-10"
  },
  {
    id: 5,
    companyName: "DesignHub",
    reviewText: "Creatividad excepcional en el diseño de nuestra marca.",
    rating: 5,
    photos: ["/design1.jpeg", "/design2.jpeg"],
    date: "2024-07-22"
  },
  {
    id: 6,
    companyName: "DigitalAgency",
    reviewText: "Resultados promedio, cumplieron con lo básico.",
    rating: 2,
    photos: ["/digital1.jpeg"],
    date: "2024-06-15"
  }
];

const ReviewsSection = () => {
  const [filter, setFilter] = useState<"all" | "top">("all");
  const [visibleReviews, setVisibleReviews] = useState(3);

  const filteredReviews = filter === "top" 
    ? [...mockReviews].sort((a, b) => b.rating - a.rating) 
    : mockReviews;

  const reviewsToShow = filteredReviews.slice(0, visibleReviews);

  const loadMore = () => {
    setVisibleReviews(prev => prev + 3);
  };

  return (
    <div className="bg-[#070B15] relative overflow-hidden">
      {/* Capa de superposición para transición perfecta */}
      <div className="absolute top-0 left-0 w-full h-1 bg-[#070B15] -translate-y-px z-10"></div>
      
      <div className="max-w-screen-2xl mx-auto pt-20 pb-12 px-4 relative z-20">
        <Heading title="RESEÑAS DE CLIENTES" />
        
        {/* Filtros */}
        <div className="flex justify-center gap-4 mb-12">
          <button 
            onClick={() => {
              setFilter("all");
              setVisibleReviews(3);
            }}
            className={`px-6 py-2 rounded-full font-medium transition-colors ${
              filter === "all" 
                ? "bg-[#98EFDC] text-[#070B15] shadow-md" 
                : "bg-[#1E293B] text-[#F9FCF8] hover:bg-[#334155]"
            }`}
          >
            Todas las reseñas
          </button>
          <button 
            onClick={() => {
              setFilter("top");
              setVisibleReviews(3);
            }}
            className={`px-6 py-2 rounded-full font-medium transition-colors ${
              filter === "top" 
                ? "bg-[#98EFDC] text-[#070B15] shadow-md" 
                : "bg-[#1E293B] text-[#F9FCF8] hover:bg-[#334155]"
            }`}
          >
            Más valoradas
          </button>
        </div>
        
        {/* Grid de reseñas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviewsToShow.map((review) => (
            <div 
              key={review.id}
              className="bg-[#F9FCF8] text-[#070B15] rounded-xl overflow-hidden shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl border-2 border-transparent hover:border-[#98EFDC]"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold">{review.companyName}</h3>
                  <span className="bg-[#070B15] text-[#98EFDC] px-3 py-1 rounded-full text-sm font-medium">
                    #{review.id}
                  </span>
                </div>
                
                {/* Rating con estrellas */}
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${i < review.rating ? "text-yellow-400" : "text-gray-300"}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="ml-2 text-sm text-[#4A5568]">
                    {review.rating}/5
                  </span>
                </div>
                
                {/* Texto de la reseña */}
                <p className="text-[#4A5568] mb-6">{review.reviewText}</p>
                
                {/* Galería de fotos */}
                {review.photos.length > 0 && (
                  <div className="mb-6">
                    <h4 className="font-semibold mb-3 text-[#070B15]">Proyecto realizado:</h4>
                    <div className="grid grid-cols-2 gap-3">
                      {review.photos.map((photo, index) => (
                        <div 
                          key={index} 
                          className="relative aspect-video rounded-lg overflow-hidden bg-gray-200"
                        >
                          <Image
                            src={photo}
                            alt={`Proyecto ${index + 1} para ${review.companyName}`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Fecha */}
                <p className="text-sm text-[#64748B]">
                  {new Date(review.date).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>    <div className="h-20 w-full bg-gradient-to-b from-[#070B15] via-[#070B15] to-[#F9FCF8] relative z-10 -mt-px"></div>
    </div>
    
  );
};

export default ReviewsSection;