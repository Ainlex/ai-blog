"use client";
import { useEffect, useRef } from 'react'
import { useTheme } from "./theme-provider";

export default function GiscusComments() {
  const ref = useRef<HTMLDivElement>(null)
  const { theme } = useTheme();

  useEffect(() => {
    if (!ref.current) return
    // Eliminar scripts previos y iframes para reinicializar Giscus al cambiar el tema
    ref.current.innerHTML = '';
    const script = document.createElement('script')
    script.src = 'https://giscus.app/client.js'
    script.setAttribute('data-repo', 'Ainlex/comentarios-blog-ia')
    script.setAttribute('data-repo-id', 'R_kgDOPDFGaQ')
    script.setAttribute('data-category', 'comentarios-blog')
    script.setAttribute('data-category-id', 'DIC_kwDOPDFGac4CsIG5')
    script.setAttribute('data-mapping', 'pathname')
    script.setAttribute('data-strict', '0')
    script.setAttribute('data-reactions-enabled', '1')
    script.setAttribute('data-emit-metadata', '0')
    script.setAttribute('data-input-position', 'top')
    script.setAttribute('data-theme', theme === "dark" ? "dark_dimmed" : "light")
    script.setAttribute('data-lang', 'es')
    script.setAttribute('data-loading', 'lazy')
    script.crossOrigin = 'anonymous'
    script.async = true
    ref.current.appendChild(script)
  }, [theme])

  // Estilos para mejorar visibilidad de textos secundarios de Giscus
  useEffect(() => {
    if (!ref.current) return
    const interval = setInterval(() => {
      const secondary = ref.current?.querySelectorAll('.giscus-comment-box, .giscus-reactions, .giscus-header, .giscus-footer, .giscus-comment-content, .giscus-comment')
      secondary?.forEach(el => {
        (el as HTMLElement).style.color = 'var(--giscus-secondary, #b0b0b0)';
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section aria-labelledby="giscus-title">
      <h2 id="giscus-title" className="sr-only">Caja de comentarios</h2>
      <div ref={ref} className="giscus-comments mt-0 md:mt-2" style={{minHeight: 320}} />
    </section>
  )
} 