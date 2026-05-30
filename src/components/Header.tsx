import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Phone, Calendar, Flame } from 'lucide-react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [revealedPhone, setRevealedPhone] = useState(false);

  const getPhoneText = () => {
    return revealedPhone ? atob('OTI2IDA0IDI3IDc2') : 'Ver Teléfono';
  };

  const decodeTel = () => {
    return revealedPhone ? atob('dGVsOjkyNjA0Mjc3Ng==') : '#';
  };

  const handlePhoneInteraction = (e: any) => {
    if (!revealedPhone) {
      e.preventDefault();
      setRevealedPhone(true);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // height of the header
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
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-stone-950/95 backdrop-blur-md shadow-lg border-b border-stone-800/60 py-3'
          : 'bg-gradient-to-b from-stone-950/80 via-stone-950/30 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <div
            onClick={() => scrollToSection('hero')}
            className="flex items-center space-x-2 cursor-pointer group"
          >
            <div className="relative w-10 h-10 flex items-center justify-center bg-amber-600 rounded-lg group-hover:bg-amber-500 transition-colors duration-300 border border-amber-700/50 shadow-[0_0_15px_rgba(217,119,6,0.3)]">
              <span className="font-serif font-black text-white text-xl tracking-tight">26</span>
              <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-stone-900 border border-amber-500 rounded-full flex items-center justify-center">
                <span className="text-[7px] text-amber-500 font-bold font-mono">R</span>
              </div>
            </div>
            <div>
              <span className="font-serif text-lg font-extrabold tracking-wider text-stone-100 block leading-tight group-hover:text-amber-400 transition-colors">
                26 BAR RANCH
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-amber-500/80 font-semibold font-mono block">
                Western Tapas Saloon
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8">
            {['menú', 'experiencia', 'reseñas', 'reserva', 'ubicación'].map((key) => {
              const ids: Record<string, string> = {
                'menú': 'menu',
                'experiencia': 'experience',
                'reseñas': 'reviews',
                'reserva': 'booking',
                'ubicación': 'location'
              };
              return (
                <button
                  key={key}
                  onClick={() => scrollToSection(ids[key])}
                  className="text-stone-300 font-medium text-sm hover:text-amber-500 transition-colors uppercase tracking-wider relative group"
                >
                  {key}
                  <span className="absolute -bottom-1.5 left-0 w-0 h-0.5 bg-amber-500 transition-all duration-300 group-hover:w-full" />
                </button>
              );
            })}
          </nav>

          {/* Action Callouts */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href={decodeTel()}
              onClick={handlePhoneInteraction}
              title={revealedPhone ? "Llamar al bar" : "Haga clic para revelar teléfono del bar"}
              className="flex items-center space-x-2 text-stone-300 hover:text-amber-400 font-medium text-sm transition-colors mr-2 cursor-pointer"
            >
              <Phone className="w-4 h-4 text-amber-500" />
              <span>{getPhoneText()}</span>
            </a>

            <button
              onClick={() => scrollToSection('booking')}
              className="px-5 py-2.5 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-stone-950 font-bold text-xs uppercase tracking-widest rounded-md hover:shadow-[0_0_20px_rgba(217,119,6,0.4)] transition-all duration-300 border border-amber-500/30 flex items-center space-x-2 active:scale-95"
            >
              <Calendar className="w-4 h-4 text-stone-950" />
              <span>Reservar Mesa</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-3">
            {/* Status Pulse */}
            <div className="flex items-center space-x-1.5 bg-emerald-950/60 border border-emerald-800/50 px-2.5 py-1 rounded-full">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider font-mono">
                Abierto
              </span>
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-3 text-stone-300 hover:text-amber-500 transition-colors focus:outline-none flex items-center justify-center w-12 h-12"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden bg-stone-950 border-b border-stone-800 overflow-hidden shadow-2xl"
          >
            <div className="px-4 pt-4 pb-6 space-y-4 max-w-7xl mx-auto">
              {['menú', 'experiencia', 'reseñas', 'reserva', 'ubicación'].map((key) => {
                const ids: Record<string, string> = {
                  'menú': 'menu',
                  'experiencia': 'experience',
                  'reseñas': 'reviews',
                  'reserva': 'booking',
                  'ubicación': 'location'
                };
                return (
                  <button
                    key={key}
                    onClick={() => scrollToSection(ids[key])}
                    className="block w-full text-left px-3 py-2 text-base font-semibold text-stone-300 hover:text-amber-500 hover:bg-stone-900/50 rounded-md uppercase tracking-wider transition-all"
                  >
                    {key}
                  </button>
                );
              })}

              <hr className="border-stone-800 my-4" />

              <div className="grid grid-cols-1 gap-3 pt-2">
                <a
                  href={decodeTel()}
                  onClick={handlePhoneInteraction}
                  title={revealedPhone ? "Llamar al bar" : "Toca para revelar e iniciar llamada"}
                  className="flex items-center justify-center space-x-2 py-3 bg-stone-900 hover:bg-stone-850 rounded-md text-stone-300 transition-colors font-medium cursor-pointer"
                >
                  <Phone className="w-5 h-5 text-amber-500" />
                  <span>{getPhoneText()}</span>
                </a>

                <button
                  onClick={() => scrollToSection('booking')}
                  className="flex items-center justify-center space-x-2 py-3 bg-amber-600 hover:bg-amber-500 text-stone-950 rounded-md font-bold text-sm uppercase tracking-widest transition-colors w-full shadow-lg"
                >
                  <Calendar className="w-5 h-5" />
                  <span>Reservar Mesa online</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
