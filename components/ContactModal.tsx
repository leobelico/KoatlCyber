'use client';
import React, { useEffect } from "react";
import { FaXmark } from "react-icons/fa6";
import ContactForm from "./ContactForm";

type Props = {
  open: boolean;
  onClose: () => void;
  title: string;
  service?: string;
  serviceLabel?: string;
  serviceOptions?: { value: string; label: string }[];
  messageLabel?: string;
};

const ContactModal = ({ open, onClose, title, service, serviceLabel, serviceOptions, messageLabel }: Props) => {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/75 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div
        className="step relative max-h-[92vh] w-full max-w-lg animate-fadeIn overflow-y-auto bg-ink p-7"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="greca absolute inset-x-0 top-0" aria-hidden="true" />
        <button
          onClick={onClose}
          className="absolute right-3 top-6 flex h-11 w-11 items-center justify-center text-bone-300 hover:text-mint"
          aria-label="Cerrar"
        >
          <FaXmark className="text-xl" />
        </button>
        <h3 className="mb-5 mt-4 border-b border-bone/15 pb-3 pr-10 font-display text-2xl font-extrabold text-bone">{title}</h3>
        <ContactForm
          idPrefix="modal"
          subject={title}
          service={service}
          serviceLabel={serviceLabel}
          serviceOptions={serviceOptions}
          messageLabel={messageLabel}
          onSent={onClose}
        />
      </div>
    </div>
  );
};

export default ContactModal;
