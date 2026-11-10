import type { Metadata } from "next";
import { Public_Sans, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { Footer, Header } from "@/components";
import SessionProvider from "@/utils/SessionProvider";
import Providers from "@/Providers";
import { getServerSession } from "next-auth";
import 'svgmap/dist/svgMap.min.css';




const sans = Public_Sans({ subsets: ["latin"], variable: "--font-sans" });
const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-display", adjustFontFallback: false });

export const metadata: Metadata = {
  title: "KoatlCyber | Ciberseguridad, software a la medida y SaaS en San Luis Potosí",
  description:
    "Ciberseguridad, desarrollo de software a la medida y SaaS con IA y seguridad por diseño, hechos en San Luis Potosí: Pórtico (CRM inmobiliario), Citalia (agenda y WhatsApp), MarcaGol (ligas de fútbol) y Pluma (noticias con IA). Además soporte, mantenimiento y redes en San Luis Potosí.",
  icons: {
  icon: "/koatlcyber.ico", // 👈 aquí enlazas tu favicon
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const session = await getServerSession();
  return (
    <html lang="es" data-theme="light">
      <body className={`${sans.variable} ${display.variable} font-sans antialiased`}>
      <SessionProvider session={session}>
        <Header />
        <Providers>
        {children}
        </Providers>
        <Footer />
      </SessionProvider>
        </body>
    </html>
  );
}
