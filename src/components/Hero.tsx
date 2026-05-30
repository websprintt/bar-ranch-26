import { motion } from 'motion/react';
import { Star, MapPin, Clock, Calendar, ChevronRight } from 'lucide-react';
import heroImg from '../assets/images/ranch_hero_1780162810389.png';

export default function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-stone-950 pt-20">
      {/* Background Image with Dark Vignette Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImg}
          alt="26 Bar Ranch Interior y Tapas"
          className="w-full h-full object-cover scale-105 filter brightness-45 contrast-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/50 to-stone-950/80" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(12,10,9,0.8)_80%)]" />
      </div>

      {/* Decorative Brand Lines */}
      <div className="absolute top-24 left-1/2 -translate-x-1/2 w-full max-w-7xl px-4 sm:px-6 lg:px-8 hidden lg:flex justify-between text-stone-600/30 font-mono text-[10px] tracking-widest pointer-events-none uppercase">
        <span>Est. Ciudad Real</span>
        <span>Auténtico Tapas Bar</span>
        <span>Western Experience</span>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-8 pb-16">
        {/* Google Maps Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          onClick={() => scrollToSection('reviews')}
          className="inline-flex items-center space-x-2 bg-stone-900/90 border border-amber-500/20 px-3.5 py-1.5 rounded-full cursor-pointer hover:bg-stone-850 transition-all duration-300 hover:border-amber-500/40 mb-6 group"
        >
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            ))}
          </div>
          <span className="text-xs font-semibold text-stone-300">
            <strong className="text-amber-400 font-bold">4.5 / 5</strong> (202 opiniones en Google Maps)
          </span>
          <ChevronRight className="w-3 h-3 text-stone-500 group-hover:translate-x-1 transition-transform" />
        </motion.div>

        {/* Main Headings */}
        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl font-serif font-black tracking-tight text-stone-100 uppercase"
        >
          El Sabor del <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600">Western</span>
          <span className="block mt-1 sm:mt-2">en Ciudad Real</span>
        </motion.h1>

        {/* Subtitle / Pitch */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-6 text-base sm:text-xl text-stone-300 max-w-2xl mx-auto font-medium leading-relaxed"
        >
          La rebelde fusión de generosas tapas americanas, hamburguesas de autor y cocina tradicional española. Descubre el bar saloon de temática western más aclamado y acogedor del centro.
        </motion.p>

        {/* Key USPs / Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-8 flex flex-wrap justify-center gap-3 sm:gap-4 text-stone-300 text-xs sm:text-sm font-medium"
        >
          <span className="flex items-center space-x-1.5 bg-stone-900/60 border border-stone-800 px-3.5 py-1.5 rounded-md">
            <MapPin className="w-4 h-4 text-amber-500" />
            <span>Centro Ciudad Real (C. Corazón de María, 1)</span>
          </span>
          <span className="flex items-center space-x-1.5 bg-stone-900/60 border border-stone-800 px-3.5 py-1.5 rounded-md">
            <Clock className="w-4 h-4 text-amber-500" />
            <span>Abierto todos los días hasta 2:00 AM</span>
          </span>
        </motion.div>

        {/* Primary Action Buttons (CRO Trigger) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4 px-4 sm:px-0"
        >
          <button
            onClick={() => scrollToSection('booking')}
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-black text-sm uppercase tracking-widest rounded-md shadow-lg shadow-amber-900/20 hover:shadow-[0_0_30px_rgba(217,119,6,0.5)] transition-all duration-300 flex items-center justify-center space-x-2 active:scale-95 group"
          >
            <Calendar className="w-4 h-4 text-stone-950 group-hover:scale-110 transition-transform" />
            <span>Reserva de Mesa Gratis</span>
          </button>

          <button
            onClick={() => scrollToSection('menu')}
            className="w-full sm:w-auto px-8 py-4 bg-stone-900/80 hover:bg-stone-800 border border-stone-700/60 hover:border-amber-500/35 text-stone-100 font-bold text-sm uppercase tracking-widest rounded-md hover:text-amber-400 transition-all duration-300 flex items-center justify-center space-x-2 active:scale-95"
          >
            <span>Explorar Carta</span>
          </button>
        </motion.div>

        {/* Dynamic Trust Strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-16 pt-8 border-t border-stone-800/40 grid grid-cols-3 gap-4 max-w-3xl mx-auto"
        >
          <div>
            <span className="block text-2xl sm:text-3xl font-serif font-black text-amber-400">4.5★</span>
            <span className="block text-[10px] sm:text-xs text-stone-400 uppercase tracking-wider font-semibold mt-1">Calificación Maps</span>
          </div>
          <div>
            <span className="block text-2xl sm:text-3xl font-serif font-black text-amber-400">200+</span>
            <span className="block text-[10px] sm:text-xs text-stone-400 uppercase tracking-wider font-semibold mt-1">Opiniones Reales</span>
          </div>
          <div>
            <span className="block text-2xl sm:text-3xl font-serif font-black text-amber-400">100%</span>
            <span className="block text-[10px] sm:text-xs text-stone-400 uppercase tracking-wider font-semibold mt-1">Ambiente Acogedor</span>
          </div>
        </motion.div>
      </div>

      {/* Decorative bottom wave/fade arrow */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 animate-bounce cursor-pointer group" onClick={() => scrollToSection('menu')}>
        <span className="font-mono text-[10px] text-stone-500 uppercase tracking-widest group-hover:text-amber-500 transition-colors block text-center mb-1">
          Scrollear abajo
        </span>
        <div className="w-1.5 h-1.5 border-r border-b border-stone-500 group-hover:border-amber-500 transition-colors rotate-45 mx-auto" />
      </div>
    </section>
  );
}
