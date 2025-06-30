"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const consent = localStorage.getItem("cookieConsent");
      setVisible(!consent);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookieConsent", "true");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full z-50 bg-gray-900 text-white px-4 py-4 flex flex-col md:flex-row items-center justify-between shadow-lg gap-2 md:gap-0">
      <span className="text-sm md:text-base">
        Este sitio utiliza cookies propias y de terceros para mejorar tu experiencia. Al continuar navegando, aceptás nuestra{' '}
        <Link href="/politica-de-cookies" className="underline text-blue-300 hover:text-blue-400">política de cookies</Link>.
      </span>
      <button
        onClick={acceptCookies}
        className="mt-2 md:mt-0 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition-all"
        aria-label="Aceptar cookies"
      >
        Aceptar
      </button>
    </div>
  );
} 