import React from "react";
import ContactForm from "./ContactForm";

const ContactSection = () => (
  <section id="contacto" className="bg-gold py-20 text-ink">
    <div className="mx-auto grid max-w-screen-xl gap-12 px-6 lg:grid-cols-[1fr_1.1fr] lg:gap-20 lg:px-8">
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.16em] opacity-80">Contacto</p>
        <h2 className="mt-4 font-display text-4xl font-extrabold leading-[1.05] md:text-5xl">
          Platiquemos de lo que quieres proteger o construir.
        </h2>
        <p className="mt-5 max-w-md text-lg">
          La primera conversación no tiene costo. Te respondemos en horario laboral.
        </p>
        <div className="mt-6 flex flex-col">
          <a className="flex min-h-[44px] items-center break-all font-bold underline underline-offset-4" href="mailto:ventas@koatlcyber.com">ventas@koatlcyber.com</a>
          <a className="flex min-h-[44px] items-center font-bold underline underline-offset-4" href="tel:+524443479221">+52 444 347 9221</a>
          <a className="flex min-h-[44px] items-center font-bold underline underline-offset-4" href="https://wa.me/524443479221" target="_blank" rel="noopener noreferrer">Escríbenos por WhatsApp</a>
        </div>
      </div>

      <div className="step bg-ink p-6 text-bone md:p-8">
        <ContactForm
          idPrefix="contact"
          subject="Contacto desde el sitio"
          serviceLabel="Me interesa"
          serviceOptions={[
            { value: "ciberseguridad", label: "Ciberseguridad" },
            { value: "software-a-la-medida", label: "Software a la medida" },
            { value: "marcagol", label: "MarcaGol" },
            { value: "portico", label: "Pórtico" },
            { value: "citalia", label: "Citalia" },
            { value: "pluma", label: "Pluma" },
            { value: "soporte-redes", label: "Soporte, mantenimiento o redes" },
          ]}
          messageLabel="Cuéntanos de tu negocio"
        />
      </div>
    </div>
  </section>
);

export default ContactSection;
