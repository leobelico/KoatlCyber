import { navigation } from "@/lib/utils";
import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#F9FCF8] border-t border-gray-200">
      <div className="mx-auto max-w-screen-2xl px-6 lg:px-8 pt-16 pb-12">
        <div className="xl:grid xl:grid-cols-4 xl:gap-8">
          {/* Logo y redes sociales */}
          <div className="space-y-8">
            <div className="flex items-center">
              <Image
                src="/FUTER2.webp"
                alt="Singitronic logo"
                width={180}
                height={80}
                className="h-auto w-auto"
              />
            </div>
            <p className="text-sm text-gray-600">
              Soluciones digitales que transforman tu negocio.
            </p>
            <div className="flex space-x-6">
              {['Facebook', 'Twitter', 'Instagram', 'LinkedIn'].map((social) => (
                <a 
                  key={social} 
                  href="#" 
                  className="text-gray-500 hover:text-gray-700"
                  aria-label={social}
                >
                  <span className="sr-only">{social}</span>
                  <div className="h-6 w-6 bg-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-xs font-medium">{social.charAt(0)}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Secciones de navegación */}
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-3 xl:mt-0">
            <div className="md:grid md:grid-cols-3 md:gap-8">
              <div>
                <h3 className="text-lg font-bold text-gray-900">Venta</h3>
                <ul className="mt-6 space-y-4">
                  {navigation.sale.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-10 md:mt-0">
                <h3 className="text-lg font-bold text-gray-900">Sobre Nosotros</h3>
                <ul className="mt-6 space-y-4">
                  {navigation.about.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-10 md:mt-0">
                <h3 className="text-lg font-bold text-gray-900">Soporte</h3>
                <ul className="mt-6 space-y-4">
                  {navigation.help.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-16 border-t border-gray-200 pt-10">
          <h3 className="text-lg font-bold text-gray-900">Suscríbete a nuestro newsletter</h3>
          <p className="mt-2 text-sm text-gray-600">
            Las últimas noticias, artículos y recursos enviados a tu inbox.
          </p>
          <form className="mt-4 sm:flex sm:max-w-md">
            <label htmlFor="email-address" className="sr-only">
              Email
            </label>
            <input
              type="email"
              id="email-address"
              required
              className="w-full min-w-0 appearance-none rounded-md border border-gray-300 px-4 py-2 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Tu correo electrónico"
            />
            <div className="mt-3 rounded-md sm:mt-0 sm:ml-3 sm:flex-shrink-0">
              <button
                type="submit"
                className="flex w-full items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Suscribirse
              </button>
            </div>
          </form>
        </div>

        {/* Derechos de autor */}
        <div className="mt-16 border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Singitronic. Todos los derechos reservados.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <a href="#" className="text-sm text-gray-500 hover:text-gray-700">
              Política de privacidad
            </a>
            <a href="#" className="text-sm text-gray-500 hover:text-gray-700">
              Términos de servicio
            </a>
            <a href="#" className="text-sm text-gray-500 hover:text-gray-700">
              Configuración de cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;