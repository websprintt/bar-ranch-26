import { useState, useEffect } from 'react';
import { Phone, Calendar, ArrowUp, Star, MapPin, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showMobileSticky, setShowMobileSticky] = useState(false);
  const [revealedWhatsApp, setRevealedWhatsApp] = useState(false);

  const getDecryptedWhatsAppText = () => {
    return revealedWhatsApp ? atob('OTI2IDA0IDI3IDc2') : 'Mostrar WhatsApp';
  };

  const getWhatsAppHref = () => {
    return revealedWhatsApp ? atob('aHR0cHM6Ly93YS5tZS8zNDkyNjA0Mjc3Ng==') : '#';
  };

  const handleWhatsAppInteraction = (e: any) => {
    if (!revealedWhatsApp) {
      e.preventDefault();
      setRevealedWhatsApp(true);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      // Toggle scroll to top button
      setShowScrollTop(window.scrollY > 400);
      
      // Toggle sticky mobile action bar (show only after scrolling down a section)
      setShowMobileSticky(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

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
    <>
      {/* Footer Content */}
      <footer className="bg-stone-950 border-t border-stone-900 pt-16 pb-28 md:py-16 text-stone-400 text-xs sm:text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            
            {/* Branded Identity */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2.5 cursor-pointer" onClick={scrollToTop}>
                <div className="w-9 h-9 bg-amber-600 rounded-lg flex items-center justify-center font-serif font-black text-stone-950 text-lg border border-amber-700/50">
                  26
                </div>
                <div>
                  <span className="font-serif text-base font-extrabold text-stone-100 uppercase tracking-widest block leading-tight">
                    26 BAR RANCH
                  </span>
                  <span className="text-[10px] uppercase tracking-widest text-amber-500 font-mono block">
                    Western Tapas
                  </span>
                </div>
              </div>
              
              <p className="text-xs text-stone-500 leading-relaxed max-w-sm mt-3">
                Uniendo el sabor de la frontera norteamericana con la generosidad de la cocina de tapas en el centro de Ciudad Real.
              </p>

              {/* Verified Trust Badge micro-widget */}
              <div className="flex items-center space-x-1.5 pt-2 text-[10px] text-stone-500 tracking-wider uppercase font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                <span>⭐ 4.5/5 Google Maps • Certificado</span>
              </div>
            </div>

            {/* Quick links map */}
            <div className="space-y-4">
              <h4 className="text-stone-300 font-bold uppercase font-mono tracking-wider text-xs">
                Sitemap Navegación
              </h4>
              <ul className="space-y-2 text-stone-500">
                {['Menú del Rancho', 'Nuestra Experiencia', 'Opiniones de Clientes', 'Fórmula de Reserva', 'Contacto & Mapa'].map((item, i) => {
                  const ids = ['menu', 'experience', 'reviews', 'booking', 'location'];
                  return (
                    <li key={i}>
                      <button
                        onClick={() => scrollToSection(ids[i])}
                        className="hover:text-amber-500 transition-colors cursor-pointer text-left py-0.5 outline-none font-medium"
                      >
                        {item}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Hours summary */}
            <div className="space-y-4 col-span-1 md:col-span-1">
              <h4 className="text-stone-300 font-bold uppercase font-mono tracking-wider text-xs">
                Calle Corazón de María, 1
              </h4>
              <p className="text-xs text-stone-500 leading-relaxed">
                Situados a solo unos metros del corazón comercial, rodeados de aparcamiento cómodo y de fácil llegada andando. Las puertas batientes están abiertas para ti.
              </p>
              <div className="pt-2 text-stone-400 font-mono text-xs flex items-center space-x-1.5">
                <span className="text-stone-500 font-bold uppercase tracking-wider text-[10px]">WhatsApp:</span>
                <a
                  href={getWhatsAppHref()}
                  onClick={handleWhatsAppInteraction}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2 py-1 bg-stone-900 border border-stone-850 hover:border-emerald-500/30 text-emerald-400 font-bold hover:text-emerald-300 rounded cursor-pointer transition-colors inline-flex items-center space-x-1"
                  title={revealedWhatsApp ? "Abrir chat de WhatsApp" : "Haga clic para revelar WhatsApp"}
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-500" />
                  <span>{getDecryptedWhatsAppText()}</span>
                </a>
              </div>
            </div>

            {/* Legals / Rights block */}
            <div className="space-y-4">
              <h4 className="text-stone-300 font-bold uppercase font-mono tracking-wider text-xs">
                Garantía y Seguridad CRO
              </h4>
              <p className="text-xs text-stone-500 leading-relaxed">
                Nuestras reservas online no requieren tarjeta de crédito y son 100% de cancelación gratuita. Recibes el justificante oficial y acceso al calendario al instante.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="px-2 py-1 bg-stone-900 border border-stone-850 rounded text-[9px] uppercase font-mono">No card required</span>
                <span className="px-2 py-1 bg-stone-900 border border-stone-850 rounded text-[9px] uppercase font-mono">Instant SMS confirm</span>
              </div>
            </div>

          </div>

          <div className="border-t border-stone-900 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-stone-500 text-xs">
            <p>
              &copy; {new Date().getFullYear()} 26 BAR RANCH • Tapas Western Saloon. Todos los derechos reservados.
            </p>
            <div className="flex space-x-6">
              <a href="#menu" onClick={(e) => { e.preventDefault(); scrollToSection('menu'); }} className="hover:text-amber-500 transition-colors">Carta oficial</a>
              <a href="#booking" onClick={(e) => { e.preventDefault(); scrollToSection('booking'); }} className="hover:text-amber-500 transition-colors">Reserva gratuita</a>
              <span>Diseñado con pasión Mobile-First</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Scroll Top arrow */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToTop}
            title="Subir al cielo del Rancho"
            className="fixed bottom-28 right-6 z-40 w-11 h-11 bg-stone-900 hover:bg-stone-800 border border-stone-800 hover:border-amber-500/40 text-stone-300 hover:text-amber-400 rounded-full flex items-center justify-center shadow-2xl transition-all cursor-pointer hover:scale-105 active:scale-95"
            style={{ minWidth: '48px', minHeight: '48px' }}
          >
            <ArrowUp className="w-5 h-5 text-current" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
