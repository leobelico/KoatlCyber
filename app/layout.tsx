import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Footer, Header } from "@/components";
import SessionProvider from "@/utils/SessionProvider";
import Providers from "@/Providers";
import { getServerSession } from "next-auth";
import 'svgmap/dist/svgMap.min.css';




const sans = Inter({ subsets: ["latin"], variable: "--font-sans" });
const display = Space_Grotesk({ subsets: ["latin"], variable: "--font-display" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "KoatlCyber | SaaS con IA y seguridad, con soporte local en San Luis Potosí",
  description:
    "KoatlCyber desarrolla y opera SaaS con inteligencia artificial y seguridad por diseño: Pórtico (CRM inmobiliario), Citalia (agenda y WhatsApp), MarcaGol (ligas de fútbol) y Global Media (noticias con IA). Además soporte, mantenimiento y redes en San Luis Potosí.",
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
      <body className={`${sans.variable} ${display.variable} ${mono.variable} font-sans antialiased`}>
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
