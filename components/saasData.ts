import type { IconType } from "react-icons";
import { FaBuilding, FaCalendarCheck, FaFutbol, FaNewspaper } from "react-icons/fa6";

export type SaasProduct = {
  id: string;
  name: string;
  tag: string;
  title: string;
  highlight: string;
  description: string;
  audience: string;
  icon: IconType;
  features: string[];
  price: string;
};

// Edita aquí nombres, textos y precios. "Cotizar" = sin precio público.
export const saasProducts: SaasProduct[] = [
  {
    id: "portico",
    name: "Pórtico",
    tag: "01 / CRM INMOBILIARIO",
    title: "Sabe qué campaña trajo",
    highlight: "a cada lead",
    description:
      "CRM con WhatsApp e IA para inmobiliarias y desarrolladoras: descubre qué campaña (radio, espectaculares, redes, portales, referidos…) generó cada lead y no dejes que ninguno se enfríe.",
    audience: "Inmobiliarias y desarrolladoras",
    icon: FaBuilding,
    price: "Cotizar",
    features: [
      "IA integrada: resumen del lead, temperatura y borrador de WhatsApp",
      "Leads desde formulario, CSV y webhook con campaña de origen",
      "Pipeline kanban con motivo de pérdida",
      "WhatsApp (Cloud API de Meta) y alertas de lead frío",
      "Desarrollos, inventario y cotizador con PDF",
      "Plan Élite: asistente de IA con resumen, temperatura y siguiente paso",
      "Roles, invitaciones y consentimiento LFPDPPP",
      "Seguridad por diseño: datos aislados por cliente, roles y permisos",
    ],
  },
  {
    id: "citalia",
    name: "Citalia",
    tag: "02 / AGENDA Y WHATSAPP",
    title: "Agenda llena, menos",
    highlight: "inasistencias",
    description:
      "Agenda, recordatorios por WhatsApp y fidelización para consultorios, dentistas, spas, estéticas, depilación láser y barberías.",
    audience: "Consultorios, spas, estéticas y barberías",
    icon: FaCalendarCheck,
    price: "Cotizar",
    features: [
      "IA integrada: recordatorios y seguimiento inteligentes que reducen inasistencias",
      "Reservación en línea con enlace propio por negocio",
      "Recordatorios 24 h y 2 h por WhatsApp con botones",
      "Anti no-show: lista de espera y anticipo opcional",
      "Paquetes de sesiones y aviso a clientes que no regresan",
      "Notas clínicas cifradas con bitácora",
      "Reportes de ingresos, inasistencia y clientes recurrentes",
      "Seguridad por diseño: datos aislados por cliente, roles y permisos",
    ],
  },
  {
    id: "marcagol",
    name: "MarcaGol",
    tag: "03 / LIGAS DE FÚTBOL",
    title: "Tu liga amateur,",
    highlight: "organizada sola",
    description:
      "Sistema con página web y app para administrar ligas de fútbol amateur: calendario automático, resultados en vivo, tabla, goleo y finanzas.",
    audience: "Organizadores, capitanes y aficionados",
    icon: FaFutbol,
    price: "Cotizar",
    features: [
      "IA integrada: armado de rol y calendario sin choques, automático",
      "Calendario automático ida o ida y vuelta, y liguilla",
      "Rol semanal sin choques de canchas ni horarios",
      "Resultados en vivo: goles, asistencias y tarjetas",
      "Tabla, goleo y suspensiones que se actualizan solos",
      "Árbitros y finanzas: inscripciones, pagos y gastos",
      "App para jugadores con notificaciones de goles",
      "Seguridad por diseño: datos aislados por cliente, roles y permisos",
    ],
  },
  {
    id: "globalmedia",
    name: "Global Media",
    tag: "04 / PORTAL DE NOTICIAS CON IA",
    title: "Un portal de noticias",
    highlight: "con redacción asistida",
    description:
      "Portal en React + Node.js: para cada estado configurado busca noticias recientes, descarta lo irrelevante o repetido y redacta notas propias citando la fuente.",
    audience: "Medios y portales regionales",
    icon: FaNewspaper,
    price: "Cotizar",
    features: [
      "IA integrada: busca, filtra y redacta notas citando la fuente",
      "Cobertura configurable por estado",
      "Filtrado de noticias irrelevantes o repetidas",
      "Identidad visual a la medida del medio",
      "Seguridad por diseño: datos aislados por cliente, roles y permisos",
    ],
  },
];
