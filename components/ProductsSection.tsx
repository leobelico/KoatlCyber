'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Heading from './Heading'

type Review = {
  id: number
  clientName: string
  reviewText: string
  rating: number
  photos: string[]
  date: string
  type: 'web' | 'instalacion'
  projectUrl?: string
  features?: string[]
  isActive?: boolean
}

const UnifiedReviewsSection = () => {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'todos' | 'web' | 'instalacion'>('todos')
  const [visibleItems, setVisibleItems] = useState(4)
  const [showForm, setShowForm] = useState(false)
  const [reviews, setReviews] = useState<Review[]>([])
  const [newReview, setNewReview] = useState<Omit<Review, 'id' | 'date'>>({
    clientName: '',
    reviewText: '',
    rating: 0,
    photos: [],
    type: 'web',
    projectUrl: '',
    features: []
  })
  const [tempFeature, setTempFeature] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [previewUrls, setPreviewUrls] = useState<string[]>([])

  useEffect(() => {
    const loadReviews = async () => {
      try {
        const response = await fetch('/api/reviews', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (Array.isArray(data)) {
          setReviews(data);
        } else {
          console.error('La respuesta no es un array:', data);
        }
      } catch (error) {
        console.error('Error loading reviews:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadReviews();
  }, []);
  const filteredReviews = activeTab === 'todos'
    ? reviews
    : reviews.filter(review => review.type === activeTab)

  const reviewsToShow = filteredReviews.slice(0, visibleItems)

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setNewReview(prev => ({ ...prev, [name]: value }))
  }

  const handleRatingChange = (rating: number) => {
    setNewReview(prev => ({ ...prev, rating }))
  }

  const addFeature = () => {
    if (tempFeature.trim()) {
      setNewReview(prev => ({
        ...prev,
        features: [...(prev.features || []), tempFeature]
      }))
      setTempFeature('')
    }
  }

  const removeFeature = (index: number) => {
    setNewReview(prev => ({
      ...prev,
      features: prev.features?.filter((_, i) => i !== index)
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files).slice(0, 4) // Limitar a 4 archivos
      setSelectedFiles(files)
      
      // Crear URLs de previsualización
      const urls = files.map(file => URL.createObjectURL(file))
      setPreviewUrls(urls)
    }
  }

  const removeImage = (index: number) => {
    const newFiles = [...selectedFiles]
    newFiles.splice(index, 1)
    setSelectedFiles(newFiles)
    
    const newUrls = [...previewUrls]
    URL.revokeObjectURL(newUrls[index]) // Liberar memoria
    newUrls.splice(index, 1)
    setPreviewUrls(newUrls)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (selectedFiles.length > 4) {
      alert('Solo puedes subir un máximo de 4 imágenes')
      return
    }

    try {
      const formData = new FormData()
      
      // Agregar campos del formulario
      formData.append('clientName', newReview.clientName)
      formData.append('reviewText', newReview.reviewText)
      formData.append('rating', String(newReview.rating))
      formData.append('type', newReview.type)
      formData.append('projectUrl', newReview.projectUrl || '')
      formData.append('features', JSON.stringify(newReview.features || []))
      
      // Agregar archivos seleccionados
      selectedFiles.forEach(file => {
        formData.append('photos', file)
      })

      const response = await fetch('/api/reviews', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        const savedReview = await response.json()
        setReviews([savedReview, ...reviews])
        setShowForm(false)
        setNewReview({
          clientName: '',
          reviewText: '',
          rating: 0,
          photos: [],
          type: 'web',
          projectUrl: '',
          features: []
        })
        setSelectedFiles([])
        setPreviewUrls([])
      }
    } catch (error) {
      console.error('Error saving review:', error)
    }
  }

  if (isLoading) return (
    <div className="text-center py-12">
      <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#98EFDC]"></div>
      <p className="mt-2 text-[#F9FCF8]">Cargando reseñas...</p>
    </div>
  )

  return (
    <div className="bg-[#070B15] relative overflow-hidden">
      <div className="h-20 w-full bg-gradient-to-b from-[#F9FCF8] to-[#070B15]"></div>

      <div className="max-w-screen-2xl mx-auto pt-12 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <Heading title="NUESTRO TRABAJO EN ACCIÓN" />
          <button
            onClick={() => setShowForm(true)}
            className="bg-[#98EFDC] hover:bg-[#7ad4c0] text-[#070B15] font-bold px-6 py-2 rounded-lg transition-colors shadow-md hover:shadow-lg transform hover:scale-105 transition-transform"
          >
            + Añadir Reseña
          </button>
        </div>

        {/* Filtros */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {['todos', 'web', 'instalacion'].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab as any)
                setVisibleItems(4)
              }}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                activeTab === tab
                  ? 'bg-[#98EFDC] text-[#070B15] shadow-md transform scale-105'
                  : 'bg-[#1E293B] text-[#F9FCF8] hover:bg-[#334155]'
              }`}
            >
              {tab === 'todos' ? 'Todos' :
               tab === 'web' ? 'Proyectos Web' : 'Instalaciones'}
            </button>
          ))}
        </div>

        {/* Formulario Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
            <div className="bg-[#F9FCF8] rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border-2 border-[#98EFDC]">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold text-[#070B15]">Nueva Reseña</h2>
                  <button 
                    onClick={() => setShowForm(false)}
                    className="text-[#070B15] hover:text-red-500 transition-colors text-2xl"
                  >
                    ✕
                  </button>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-[#070B15] mb-1">Nombre del cliente *</label>
                      <input
                        type="text"
                        name="clientName"
                        value={newReview.clientName}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#98EFDC] focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#070B15] mb-1">Reseña *</label>
                      <textarea
                        name="reviewText"
                        value={newReview.reviewText}
                        onChange={handleInputChange}
                        rows={4}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#98EFDC] focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#070B15] mb-1">Calificación (0-5) *</label>
                      <input
                        type="number"
                        name="rating"
                        value={newReview.rating}
                        onChange={(e) => handleRatingChange(Number(e.target.value))}
                        min={0}
                        max={5}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#98EFDC] focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#070B15] mb-1">Tipo de proyecto *</label>
                      <select
                        name="type"
                        value={newReview.type}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#98EFDC] focus:border-transparent"
                      >
                        <option value="web">Web</option>
                        <option value="instalacion">Instalación</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#070B15] mb-1">URL del proyecto (opcional)</label>
                      <input
                        type="text"
                        name="projectUrl"
                        value={newReview.projectUrl}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#98EFDC] focus:border-transparent"
                      />
                    </div>

                    {/* Features dinámicas */}
                    <div>
                      <label className="block text-sm font-medium text-[#070B15] mb-1">Características</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={tempFeature}
                          onChange={(e) => setTempFeature(e.target.value)}
                          placeholder="Ej: Diseño responsive, Optimizado para SEO"
                          className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#98EFDC] focus:border-transparent"
                        />
                        <button 
                          type="button" 
                          onClick={addFeature}
                          className="px-4 bg-[#070B15] text-white rounded-lg hover:bg-[#1A202C] transition-colors"
                        >
                          +
                        </button>
                      </div>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {newReview.features?.map((feature, index) => (
                          <span key={index} className="bg-gray-200 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                            {feature}
                            <button 
                              type="button"
                              onClick={() => removeFeature(index)}
                              className="text-red-500 hover:text-red-700"
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Subida de imágenes */}
                    <div>
                      <label className="block text-sm font-medium text-[#070B15] mb-1">
                        Fotos del proyecto (máx. 4)
                      </label>
                      <div className="relative">
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={handleFileChange}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          id="file-upload"
                        />
                        <label 
                          htmlFor="file-upload"
                          className="block w-full p-4 border-2 border-dashed border-gray-300 rounded-lg text-center cursor-pointer hover:border-[#98EFDC] transition-colors"
                        >
                          <div className="flex flex-col items-center justify-center">
                            <svg className="w-8 h-8 text-[#070B15] mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                            </svg>
                            <p className="text-sm text-[#070B15]">
                              <span className="font-semibold">Haz clic para subir</span> o arrastra y suelta
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              PNG, JPG, JPEG (Máx. 4 archivos)
                            </p>
                          </div>
                        </label>
                      </div>
                      
                      {/* Previsualización de imágenes */}
                      {previewUrls.length > 0 && (
                        <div className="mt-4">
                          <h3 className="text-sm font-medium text-[#070B15] mb-2">
                            Previsualización ({previewUrls.length}/4)
                          </h3>
                          <div className="grid grid-cols-2 gap-3">
                            {previewUrls.map((url, index) => (
                              <div key={index} className="relative group">
                                <img 
                                  src={url} 
                                  alt={`Preview ${index}`}
                                  className="w-full h-32 object-cover rounded-lg border border-gray-200"
                                />
                                <button
                                  type="button"
                                  onClick={() => removeImage(index)}
                                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
                                >
                                  ×
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="mt-8 flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="px-6 py-2 text-[#070B15] font-medium rounded-lg border border-[#070B15] hover:bg-gray-100 transition-colors"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="bg-[#070B15] hover:bg-[#1A202C] text-[#F9FCF8] px-6 py-2 rounded-lg font-medium transition-colors shadow-md hover:shadow-lg"
                    >
                      Publicar Reseña
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Grid de Reseñas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviewsToShow.map((item) => (
            <div key={item.id} className="bg-[#F9FCF8] text-[#070B15] rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-bold text-xl">{item.clientName}</h3>
                <span className="bg-[#98EFDC] text-[#070B15] text-xs font-bold px-2 py-1 rounded-full">
                  {item.type === 'web' ? 'Web' : 'Instalación'}
                </span>
              </div>
              
              <div className="flex items-center mb-3">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${i < item.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="text-xs text-gray-500 ml-2">
                  {new Date(item.date).toLocaleDateString()}
                </span>
              </div>
              
              <p className="text-gray-700 mb-4">{item.reviewText}</p>
              
              {item.features?.length ? (
                <div className="mb-4">
                  <h4 className="text-sm font-semibold mb-1">Características:</h4>
                  <ul className="flex flex-wrap gap-2">
                    {item.features.map((f, idx) => (
                      <li 
                        key={idx} 
                        className="bg-[#98EFDC]/20 text-[#070B15] text-xs px-2 py-1 rounded-full"
                      >
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
              
              {item.projectUrl && (
                <a 
                  href={item.projectUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-[#070B15] hover:underline inline-block mb-4"
                >
                  Ver proyecto →
                </a>
              )}
              
              {item.photos?.length > 0 && (
                <div className="mt-4 grid grid-cols-2 gap-2">
                  {item.photos.map((photo, idx) => (
                    <div key={idx} className="relative group">
                      <img 
                        src={photo} 
                        alt={`Foto del proyecto ${idx + 1}`}
                        className="w-full h-32 object-cover rounded-lg border border-gray-200"
                      />
                      <a 
                        href={photo} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-colors"
                      >
                        <svg 
                          className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                        </svg>
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {visibleItems < filteredReviews.length && (
          <div className="text-center mt-12">
            <button
              onClick={() => setVisibleItems(prev => prev + 4)}
              className="bg-[#98EFDC] hover:bg-[#7ad4c0] text-[#070B15] font-bold px-8 py-3 rounded-lg transition-colors shadow-md hover:shadow-lg transform hover:scale-105 transition-transform"
            >
              Ver más proyectos
            </button>
          </div>
        )}
      </div>

      <div className="h-20 w-full bg-gradient-to-b from-[#070B15] to-[#F9FCF8]"></div>
    </div>
  )
}

export default UnifiedReviewsSection