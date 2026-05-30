import { useState } from 'react';
import { Sparkles, GlassWater, Landmark, Award, ChevronDown, ChevronUp } from 'lucide-react';

export default function Experience() {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const toggleCard = (id: string) => {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const cards = [
    {
      id: 'decor',
      icon: Landmark,
      title: 'Decoración Western de época',
      desc: 'Entra por las puertas batientes de nuestro saloon y déjate acoger por la calidez de nuestras paredes de madera rústica, taburetes vintage de cuero y barriles seleccionados. Ideal para evadirte de la rutina con un ambiente inmejorable y auténtico del oeste americano.',
      badge: 'Inmersión rústica premium',
      badgeColor: 'bg-amber-500/80',
      colSpan: 'md:col-span-2'
    },
    {
      id: 'pastry',
      icon: Sparkles,
      title: 'Tartería de Otro Planeta',
      desc: 'Nuestros clientes definen nuestra Tarta de Queso el 26 de auténtico queso manchego y nuestro Brownie templado de chocolate como milagros de repostería diaria.',
      badge: 'Horneado hoy mismo',
      badgeColor: 'bg-amber-500/80',
      colSpan: ''
    },
    {
      id: 'service',
      icon: GlassWater,
      title: 'Atención Inmejorable',
      desc: 'Para nosotros, comer en el rancho significa sentirse como en casa. Recibe un trato cercano, proactivo de nuestro equipo, listo para guiarte sobre alérgenos e ingredientes locales.',
      badge: 'Servicio familiar',
      badgeColor: 'bg-emerald-500/80',
      colSpan: ''
    },
    {
      id: 'regional',
      icon: Award,
      title: 'Ingredientes KM 0 & Sabor Manchego',
      desc: 'Todas nuestras carnes (como las espectaculares hamburguesas gourmet) y quesos proceden de pequeños ganaderos sostenibles y queserías tradicionales de Castilla-La Mancha. Sabor local auténtico y frescura garantizada en tu mesa.',
      badge: '100% Sostenible e Ibérico',
      badgeColor: 'bg-amber-500/80',
      colSpan: 'md:col-span-2'
    }
  ];

  return (
    <section id="experience" className="py-24 bg-stone-950 text-stone-100 relative">
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-amber-500 font-mono">
            Un Rincón Único en Ciudad Real
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-black uppercase text-stone-100 mt-2">
            La Experiencia Ranchera
          </h2>
          <p className="mt-4 text-stone-400 text-sm sm:text-base">
            Más que cenar o almorzar, adéntrate en un pedacito de la frontera americana fusionado con el auténtico calor manchego.
          </p>
          <div className="w-16 h-1 bg-amber-500/80 mx-auto mt-6" />
        </div>

        {/* Feature Bento Grid (asymmetrical 3-column system) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {cards.map((card) => {
            const isExpanded = !!expanded[card.id];
            return (
              <div 
                key={card.id}
                className={`${card.colSpan || ''} bg-stone-900/40 backdrop-blur-md border border-stone-850 p-6 sm:p-8 rounded-2xl shadow-xl hover:bg-stone-950/60 hover:border-amber-500/35 hover:shadow-[0_0_25px_rgba(217,119,6,0.12)] transition-all duration-300 group flex flex-col justify-between active:scale-[0.99]`}
              >
                <div>
                  <div className="flex items-center justify-between md:block">
                    <div className="flex items-center space-x-3.5 md:space-x-0 md:block">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 md:mb-6 group-hover:scale-110 transition-transform shrink-0">
                        <card.icon className="w-5.5 h-5.5 sm:w-6 sm:h-6 text-amber-500" />
                      </div>
                      <h3 className="text-sm sm:text-base md:text-xl font-serif font-bold text-stone-100 uppercase tracking-wide group-hover:text-amber-400 transition-colors">
                        {card.title}
                      </h3>
                    </div>

                    {/* Mobile Only Expander Click Action */}
                    <button 
                      onClick={() => toggleCard(card.id)}
                      className="md:hidden flex items-center space-x-1 text-[11px] font-mono text-amber-500 hover:text-amber-400 bg-amber-500/10 hover:bg-amber-500/15 border border-amber-500/20 px-2.5 py-1.5 rounded-lg transition-all"
                    >
                      <span>{isExpanded ? 'Ocultar' : 'Detalles'}</span>
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>
                  </div>

                  {/* Body Content - toggled on mobile, always visible on desktop */}
                  <div className={`${isExpanded ? 'block' : 'hidden md:block'} mt-4`}>
                    <p className="text-xs sm:text-sm text-stone-400 leading-relaxed font-normal">
                      {card.id === 'pastry' ? (
                        <>Nuestros clientes definen nuestra <strong>Tarta de Queso el 26</strong> de auténtico queso manchego y nuestro <strong>Brownie templado</strong> de chocolate como milagros de repostería diaria.</>
                      ) : card.desc}
                    </p>
                    
                    <div className="mt-4 flex items-center space-x-2 text-stone-500 text-xs font-mono">
                      <span className={`w-1.5 h-1.5 rounded-full ${card.badgeColor}`} />
                      <span>{card.badge}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

        </div>

        {/* Visual Quotes Banner block */}
        <div className="mt-16 bg-gradient-to-r from-stone-900 to-stone-950 border border-stone-850 rounded-2xl p-8 sm:p-12 shadow-xl flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rotate-45 rounded-xl pointer-events-none" />
          
          <div className="md:w-2/3 space-y-4">
            <span className="text-[10px] uppercase font-mono font-bold text-amber-500 bg-amber-950/40 px-2.5 py-1 rounded inline-block">
              La Opinión de la Crítica Regional
            </span>
            <blockquote className="text-lg sm:text-xl font-serif font-medium text-stone-300 italic leading-relaxed">
              &ldquo;Un sitio de paso obligatorio en pleno centro de Ciudad Real. Puedes ir de almuerzo o de cena, ideal tanto para una buena hamburguesa gourmet como para una sepia a la plancha de ración generosa.&rdquo;
            </blockquote>
            <cite className="block text-xs font-bold uppercase tracking-wider text-stone-500 font-mono mt-3">
              — Resumen de Guías Locales
            </cite>
          </div>

          <div className="md:w-1/3 w-full border-t md:border-t-0 md:border-l border-stone-850 pt-6 md:pt-0 md:pl-8 text-center md:text-left">
            <span className="block text-5xl font-serif font-black text-amber-500">100%</span>
            <span className="block text-[11px] font-bold uppercase text-stone-400 tracking-wider font-mono mt-1">Carne regional garantizada</span>
            <p className="text-[11px] text-stone-500 mt-2 leading-relaxed">
              Todos nuestros cortes de vacuno y porcino proceden de ganaderías sostenibles de proximidad de Castilla-La Mancha.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
