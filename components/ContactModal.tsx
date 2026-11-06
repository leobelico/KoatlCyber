'use client';
import React, { useEffect, useState } from "react";
import { FaXmark } from "react-icons/fa6";

type Props = {
  open: boolean;
  onClose: () => void;
  title: string;
  /** Texto fijo que se manda como "service" (ej. nombre del SaaS). */
  service?: string;
  /** Si se pasa, se muestra un select para elegir. */
  serviceLabel?: string;
  serviceOptions?: { value: string; label: string }[];
  messageLabel?: string;
};

const ContactModal = ({ open, onClose, title, service, serviceLabel, serviceOptions, messageLabel }: Props) => {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", service: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  useEffect(() => {
    if (!open) return;
    setStatus("idle");
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus("idle");
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          service: service ?? formData.service,
          subject: title,
          to: "ventas@koatlcyber.com",
          from: "leonardo@koatlcyber.com",
        }),
      });
      if (!response.ok) throw new Error("Error al enviar el correo");
      setStatus("success");
      setFormData({ name: "", email: "", phone: "", service: "", message: "" });
      setTimeout(onClose, 2000);
    } catch (error) {
      console.error("Error:", error);
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="glass relative max-h-[92vh] w-full max-w-lg animate-fadeIn overflow-y-auto rounded-2xl p-7 shadow-[0_0_80px_-20px_rgba(152,239,220,0.4)]"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute right-4 top-4 text-gray-400 hover:text-mint" aria-label="Cerrar">
          <FaXmark className="text-xl" />
        </button>

        <h3 className="mb-5 border-b border-mint/20 pb-3 pr-8 font-display text-xl font-bold text-white">{title}</h3>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label htmlFor="cm-name" className="block text-sm text-gray-300">Nombre completo *</label>
            <input id="cm-name" name="name" type="text" required value={formData.name} onChange={handleChange} className="field" />
          </div>
          <div>
            <label htmlFor="cm-email" className="block text-sm text-gray-300">Email *</label>
            <input id="cm-email" name="email" type="email" required value={formData.email} onChange={handleChange} className="field" />
          </div>
          <div>
            <label htmlFor="cm-phone" className="block text-sm text-gray-300">Teléfono / WhatsApp</label>
            <input id="cm-phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} className="field" />
          </div>

          {serviceOptions && (
            <div>
              <label htmlFor="cm-service" className="block text-sm text-gray-300">{serviceLabel ?? "Servicio"} *</label>
              <select id="cm-service" name="service" required value={formData.service} onChange={handleChange} className="field">
                <option value="">Selecciona una opción</option>
                {serviceOptions.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label htmlFor="cm-message" className="block text-sm text-gray-300">{messageLabel ?? "Cuéntanos qué necesitas"} *</label>
            <textarea id="cm-message" name="message" rows={3} required value={formData.message} onChange={handleChange} className="field" />
          </div>

          <button type="submit" disabled={isSubmitting} className="btn-primary w-full disabled:opacity-50">
            {isSubmitting ? "Enviando..." : "Enviar solicitud"}
          </button>

          {status === "success" && (
            <div className="rounded-lg border border-mint/40 bg-mint/10 p-3 text-sm text-mint">
              ¡Gracias! Nos pondremos en contacto contigo pronto.
            </div>
          )}
          {status === "error" && (
            <div className="rounded-lg border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-300">
              Hubo un error al enviar tu solicitud. Intenta nuevamente.
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ContactModal;
