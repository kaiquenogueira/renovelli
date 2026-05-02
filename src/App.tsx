import { useEffect } from "react";
import { usePreloader } from "./hooks/usePreloader";
import { ChapterArrival } from "./components/ChapterArrival";
import { ChapterServices } from "./components/ChapterServices";
import { ChapterResults } from "./components/ChapterResults";
import { ChapterContact } from "./components/ChapterContact";
import { FAQ } from "./components/FAQ";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";
import { SmoothScroll } from "./components/SmoothScroll";
import { CustomCursor } from "./components/CustomCursor";
import { Preloader } from "./components/Preloader";
import { GlobalVideoBackground } from "./components/GlobalVideoBackground";

export default function App() {
  const isLoading = usePreloader();

  // Mouse tracking for the custom cursor.
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      document.documentElement.style.setProperty("--mouse-x", `${e.clientX}px`);
      document.documentElement.style.setProperty("--mouse-y", `${e.clientY}px`);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <SmoothScroll>
      <CustomCursor />
      <Preloader isLoading={isLoading} />

      <main className="w-full relative">
        {/* ── SEO/GEO: bloco semântico oculto para crawlers e LLMs ── */}
        <section className="sr-only" aria-label="Resumo institucional Renovelli">
          <p data-speakable>
            A Renovelli é um atelier de estética automotiva premium em Santo
            André, São Paulo, Brasil. Há mais de 10 anos, sob direção de
            Renato Renovelli, preserva a originalidade de veículos por meio
            de polimento técnico em três etapas, vitrificação cerâmica
            (ceramic coating), funilaria de precisão com colorimetria
            computadorizada, Martelinho de Ouro (Paintless Dent Repair),
            pintura padrão de fábrica (OEM), reforma de rodas e restauração
            de riscos. Avaliação técnica gratuita pelo WhatsApp
            +55 11 9 4703-1845.
          </p>
          <address>
            Endereço: Rua Caminho do Pilar, 1758 — Pinheirinho, Santo
            André, SP, 09190-000, Brasil. Horário: segunda a sexta das 08:00
            às 18:00; sábado das 08:00 às 13:00. Áreas atendidas: Santo
            André, São Bernardo do Campo, São Caetano do Sul, Mauá, Diadema
            e Grande ABC Paulista.
          </address>
          <h2>Serviços oferecidos</h2>
          <ul>
            <li>
              Polimento técnico e vitrificação cerâmica — correção de
              pintura em três etapas e proteção nano-cerâmica de até 3 anos.
            </li>
            <li>
              Funilaria de precisão com colorimetria computadorizada — peça
              reparada invisível ao espectrofotômetro.
            </li>
            <li>
              Martelinho de Ouro (PDR) — remoção de amassados sem repintura,
              preservando 100% da pintura original.
            </li>
            <li>
              Pintura padrão de fábrica (OEM) em cabine pressurizada com
              secagem controlada.
            </li>
            <li>
              Reforma de rodas — alinhamento, pintura e acabamento
              diamantado.
            </li>
            <li>
              Restauração de riscos — spot repair sem repintura da peça
              inteira.
            </li>
          </ul>
        </section>

        {/* Scroll-bound cinematic background */}
        <GlobalVideoBackground />

        {/* Navigation */}
        <Navbar />

        {/* ── Capítulo I — A Chegada ── */}
        <section id="hero" className="relative">
          <ChapterArrival />
        </section>

        {/* ── Capítulo II — O Ofício ── */}
        <ChapterServices />

        {/* ── Capítulo III — O Resultado ── */}
        <ChapterResults />

        {/* ── Dúvidas Frequentes ── */}
        <FAQ />

        {/* ── Capítulo IV — Sua Vez ── */}
        <ChapterContact />

        <Footer />
      </main>
    </SmoothScroll>
  );
}
