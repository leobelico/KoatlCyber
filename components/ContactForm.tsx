'use client';
import React, { useState } from "react";

export type ContactFormProps = {
  /** Asunto del correo. */
  subject: string;
  /** Texto fijo que se manda como "service" (ej. nombre del SaaS). */
  service?: string;
  /** Si se pasa, se muestra un select para elegir. */
  serviceLabel?: string;
  serviceOptions?: { value: string; label: string }[];
  messageLabel?: string;
  /** Se llama ~2 s después de un envío correcto (para cerrar el modal). */
  onSent?: () => void;
  /** Prefijo para ids (evita duplicados si hay dos formularios en la página). */
  idPrefix?: string;
};

const ContactForm = ({
  subject,
  service,
  serviceLabel,
  serviceOptions,
  messageLabel,
  onSent,
  idPrefix = "cf",
}: ContactFormProps) => {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", service: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

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
          subject,
          to: "ventas@koatlcyber.com",
          from: "leonardo@koatlcyber.com",
        }),
      });
      if (!response.ok) throw new Error("Error al enviar el correo");
      setStatus("success");
      setFormData({ name: "", email: "", phone: "", service: "", message: "" });
      if (onSent) setTimeout(onSent, 2000);
    } catch (error) {
      console.error("Error:", error);
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const id = (n: string) => `${idPrefix}-${n}`;

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label htmlFor={id("name")} className="block text-sm font-bold text-bone">Nombre completo *</label>
        <input id={id("name")} name="name" type="text" autoComplete="name" required value={formData.name} onChange={handleChange} className="field" />
      </div>
      <div>
        <label htmlFor={id("email")} className="block text-sm font-bold text-bone">Correo *</label>
        <input id={id("email")} name="email" type="email" autoComplete="email" required value={formData.email} onChange={handleChange} className="field" />
      </div>
      <div>
        <label htmlFor={id("phone")} className="block text-sm font-bold text-bone">Teléfono / WhatsApp</label>
        <input id={id("phone")} name="phone" type="tel" autoComplete="tel" value={formData.phone} onChange={handleChange} className="field" />
      </div>

      {serviceOptions && (
        <div>
          <label htmlFor={id("service")} className="block text-sm font-bold text-bone">{serviceLabel ?? "Servicio"} *</label>
          <select id={id("service")} name="service" required value={formData.service} onChange={handleChange} className="field">
            <option value="">Selecciona una opción</option>
            {serviceOptions.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
      )}

      <div>
        <label htmlFor={id("message")} className="block text-sm font-bold text-bone">{messageLabel ?? "Cuéntanos qué necesitas"} *</label>
        <textarea id={id("message")} name="message" rows={3} required value={formData.message} onChange={handleChange} className="field" />
      </div>

      <button type="submit" disabled={isSubmitting} className="btn-primary w-full disabled:opacity-50">
        {isSubmitting ? "Enviando..." : "Enviar mensaje"}
      </button>

      <div aria-live="polite">
        {status === "success" && (
          <p className="border-l-4 border-mint bg-mint/10 p-3 text-sm text-mint">
            ¡Gracias! Nos pondremos en contacto contigo pronto.
          </p>
        )}
        {status === "error" && (
          <p className="border-l-4 border-chile bg-chile/10 p-3 text-sm text-chile">
            Hubo un error al enviar tu solicitud. Intenta nuevamente.
          </p>
        )}
      </div>
    </form>
  );
};

export default ContactForm;
