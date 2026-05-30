import { useState, useEffect } from 'react';
import { UtensilsCrossed, Star, Calendar, MapPin } from 'lucide-react';

export default function BottomDock() {
  const [activeSection, setActiveSection] = useState<string>('hero');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['menu', 'reviews', 'booking', 'location'];
      const scrollPosition = window.scrollY + 250;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 70; // offset for the dock/fixed header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: id === 'hero' ? 0 : offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div id="mobile-dock" className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-stone-950/85 backdrop-blur-xl border-t border-stone-850 shadow-[0_-8px_30px_rgb(0,0,0,0.5)] px-4 pb-safe pt-2">
      <div className="flex items-center justify-around max-w-md mx-auto">
        
        {/* Navigation Item: Menu */}
        <button
          onClick={() => handleScrollTo('menu')}
          className={`flex flex-col items-center justify-center w-14 h-12 rounded-xl transition-all active:scale-90 ${
            activeSection === 'menu'
              ? 'text-amber-500'
              : 'text-stone-400 hover:text-stone-200'
          }`}
          aria-label="Ver la Carta"
          style={{ minWidth: '48px', minHeight: '48px' }}
        >
          <UtensilsCrossed className="w-5 h-5" />
          <span className="text-[10px] font-bold mt-1 uppercase tracking-wider font-mono">Carta</span>
        </button>

        {/* Navigation Item: Reviews */}
        <button
          onClick={() => handleScrollTo('reviews')}
          className={`flex flex-col items-center justify-center w-14 h-12 rounded-xl transition-all active:scale-90 ${
            activeSection === 'reviews'
              ? 'text-amber-500'
              : 'text-stone-400 hover:text-stone-200'
          }`}
          aria-label="Ver Opiniones"
          style={{ minWidth: '48px', minHeight: '48px' }}
        >
          <Star className="w-5 h-5" />
          <span className="text-[10px] font-bold mt-1 uppercase tracking-wider font-mono">Opiniones</span>
        </button>

        {/* Primary CTA: Booking with Pulse, shine loops and high-contrast styling */}
        <div className="relative -top-4">
          <div className="absolute -inset-1 bg-amber-500 rounded-full blur-md opacity-30 animate-pulse" />
          <button
            onClick={() => handleScrollTo('booking')}
            className={`relative flex flex-col items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full shadow-lg border border-amber-400/30 text-stone-950 active:scale-95 transition-all shine-effect`}
            aria-label="Reservar Mesa"
            style={{ minWidth: '48px', minHeight: '48px' }}
          >
            <Calendar className="w-6 h-6 text-stone-950 stroke-[2.5]" />
            <span className="text-[9px] font-black uppercase tracking-wider text-stone-950 mt-1 font-mono">Reserva</span>
          </button>
        </div>

        {/* Navigation Item: Location */}
        <button
          onClick={() => handleScrollTo('location')}
          className={`flex flex-col items-center justify-center w-14 h-12 rounded-xl transition-all active:scale-90 ${
            activeSection === 'location'
              ? 'text-amber-500'
              : 'text-stone-400 hover:text-stone-200'
          }`}
          aria-label="Ubicación"
          style={{ minWidth: '48px', minHeight: '48px' }}
        >
          <MapPin className="w-5 h-5" />
          <span className="text-[10px] font-bold mt-1 uppercase tracking-wider font-mono">Contacto</span>
        </button>

      </div>
    </div>
  );
}
