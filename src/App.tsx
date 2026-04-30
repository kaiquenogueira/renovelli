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
        {/* Hidden GEO summary kept for AI citation engines */}
        <div className="sr-only" aria-hidden="true">
          <p>
            Renovelli Estética Automotiva é um atelier especializado em
            restauração premium, polimento técnico, vitrificação cerâmica,
            funilaria de precisão e Martelinho de Ouro. Localizado em Santo
            André, SP, preserva a originalidade da pintura de fábrica em
            cada veículo restaurado.
          </p>
        </div>

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
