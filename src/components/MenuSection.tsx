import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Filter, Check, Flame, AlertCircle, Info, Sparkles } from 'lucide-react';
import { MENU_ITEMS } from '../data/menu';
import { MenuItem } from '../types';

// Import local images
import torreznoImg from '../assets/images/ranch_torrezno_1780163723481.png';
import tacosMarrowImg from '../assets/images/ranch_tacos_marrow_1780163740418.png';
import cheesecakeImg from '../assets/images/ranch_manchego_cake_1780163757887.png';
import burgerEl26Img from '../assets/images/ranch_burger_el26_1780163776483.png';

const ALLERGENS_LIST = ['Gluten', 'Lácteos', 'Huevo', 'Frutos de cáscara', 'Pescado/Moluscos'];

export default function MenuSection() {
  const [activeCategory, setActiveCategory] = useState<string>('ensaladas');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedAllergens, setSelectedAllergens] = useState<string[]>([]);
  const [onlyVegOption, setOnlyVegOption] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  // Categories definition
  const categories = [
    { id: 'ensaladas', label: 'Ensaladas' },
    { id: 'cantinadas', label: 'Cantinadas (Raciones)' },
    { id: 'tascas', label: 'Tascas Clásicos' },
    { id: 'hamburguesas', label: 'Hamburguesas' },
    { id: 'vegan', label: 'Vegan el 26' },
    { id: 'postres', label: 'Postres' },
    { id: 'bebidas', label: 'Bebidas' }
  ];

  // Helper to toggle allergen filters
  const toggleAllergen = (allergen: string) => {
    setSelectedAllergens(prev =>
      prev.includes(allergen) ? prev.filter(a => a !== allergen) : [...prev, allergen]
    );
  };

  // Filter logic
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // 1. Category check
      if (activeCategory !== 'all' && item.category !== activeCategory) {
        return false;
      }

      // 2. Search query check
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        if (!matchesName && !matchesDesc) return false;
      }

      // 3. Allergens exclusion lock (hide if item contains ANY of the selected allergens)
      if (selectedAllergens.length > 0) {
        const hasExcludedAllergen = item.allergens.some(a => selectedAllergens.includes(a));
        if (hasExcludedAllergen) return false;
      }

      // 4. Vegan / Vegetarian constraint
      if (onlyVegOption) {
        if (!item.isVegan && !item.isVegetarian) return false;
      }

      return true;
    });
  }, [activeCategory, searchQuery, selectedAllergens, onlyVegOption]);

  // Handle image binding and Unsplash URL speed/quality optimization (q=75)
  const getItemImage = (item: MenuItem): string => {
    let imgPath = '';
    if (item.id === 'cantinada-torrezno' && torreznoImg) {
      imgPath = torreznoImg;
    } else if (item.id === 'tasca-tacos' && tacosMarrowImg) {
      imgPath = tacosMarrowImg;
    } else if (item.id === 'postre-tarta-queso-26' && cheesecakeImg) {
      imgPath = cheesecakeImg;
    } else if (item.id === 'burger-el-26' && burgerEl26Img) {
      imgPath = burgerEl26Img;
    } else {
      // Fallback images styled relative to the category
      const fallbacks: Record<string, string> = {
        ensaladas: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&auto=format&fit=crop&q=75', // salad
        cantinadas: 'https://images.unsplash.com/photo-1560684352-8497838a2229?w=600&auto=format&fit=crop&q=75', // raciones / tapas
        tascas: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=600&auto=format&fit=crop&q=75', // hot grill platter
        hamburguesas: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=75', // burger
        vegan: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&auto=format&fit=crop&q=75', // vegan bowl
        postres: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&auto=format&fit=crop&q=75', // cake
        bebidas: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=600&auto=format&fit=crop&q=75' // beverages
      };
      imgPath = item.image || fallbacks[item.category] || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&auto=format&fit=crop&q=75';
    }

    if (imgPath.includes('unsplash.com')) {
      return imgPath.replace(/q=\d+/, 'q=75');
    }
    return imgPath;
  };

  return (
    <section id="menu" className="py-24 bg-stone-900 text-stone-100 relative">
      {/* Visual background anchor */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(217,119,6,0.06),transparent_50%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-amber-500 font-mono">
            Gastronomía Salvaje & Tradicional
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-black uppercase text-stone-100 mt-2">
            La Carta del Rancho
          </h2>
          <p className="mt-4 text-stone-400 text-sm sm:text-base">
            Cada plato está elaborado al momento con ingredientes seleccionados de primera. Haz clic en cualquier plato para conocer sus secretos de cocina y alérgenos.
          </p>
          <div className="w-16 h-1 bg-amber-500/80 mx-auto mt-6" />
        </div>

        {/* Live Filter & Controls Panel */}
        <div className="bg-stone-950/80 rounded-xl border border-stone-800 p-6 shadow-xl mb-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            {/* Search inputs */}
            <div className="lg:col-span-5 relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-stone-500" />
              <input
                type="text"
                placeholder="Buscar tu plato favorito (nachos, tarta, sepia...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-stone-900 border border-stone-800 rounded-lg pl-11 pr-4 py-3 text-stone-100 placeholder-stone-500 focus:outline-none focus:border-amber-500/50 text-sm transition-all"
              />
            </div>

            {/* Category tabs */}
            <div className="lg:col-span-7 flex flex-wrap gap-1.5 scrollbar-thin overflow-x-auto pb-1 lg:pb-0">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-300 whitespace-nowrap ${
                    activeCategory === cat.id
                      ? 'bg-amber-500 text-stone-950 shadow-md shadow-amber-500/10'
                      : 'bg-stone-900/50 text-stone-400 hover:text-stone-100 hover:bg-stone-800 border border-stone-800/80'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* Collapsible Dietary filters */}
          <div className="mt-5 pt-5 border-t border-stone-800/70 flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Allergen check tags (Strict Avoidance) */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs text-stone-400 font-semibold flex items-center space-x-1 font-mono">
                <Filter className="w-3.5 h-3.5 text-amber-500" />
                <span>EXCLUIR ALÉRGENOS:</span>
              </span>

              {ALLERGENS_LIST.map((allergen) => {
                const isSelected = selectedAllergens.includes(allergen);
                return (
                  <button
                    key={allergen}
                    onClick={() => toggleAllergen(allergen)}
                    className={`px-3 py-1.5 rounded-full text-[11px] font-bold transition-all flex items-center space-x-1 border ${
                      isSelected
                        ? 'bg-red-950/40 border-red-700/60 text-red-400'
                        : 'bg-stone-900/20 border-stone-800 hover:border-stone-700 text-stone-400 hover:text-stone-300'
                    }`}
                  >
                    {isSelected && <span className="w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse mr-1" />}
                    <span>Sin {allergen}</span>
                  </button>
                );
              })}
            </div>

            {/* Vegan filter quick switcher */}
            <label className="inline-flex items-center space-x-2.5 cursor-pointer py-1.5 px-3.5 bg-stone-900/50 hover:bg-stone-850 rounded-lg border border-stone-800/80 transition-all select-none self-start">
              <input
                type="checkbox"
                checked={onlyVegOption}
                onChange={() => setOnlyVegOption(!onlyVegOption)}
                className="rounded text-amber-500 focus:ring-amber-500/50 bg-stone-800 border-stone-700 focus:ring-offset-stone-950"
              />
              <span className="text-xs font-bold uppercase tracking-wider text-green-400 flex items-center space-x-1">
                <span>Sólo Vegano / Vegetariano</span>
              </span>
            </label>
          </div>
        </div>

        {/* Items Grid Layout */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout pb-4">
            {filteredItems.map((item) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                onClick={() => setSelectedItem(item)}
                className="group bg-stone-950/70 hover:bg-stone-950 border border-stone-800 hover:border-amber-500/40 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col h-full"
              >
                
                {/* Visual Cover */}
                <div className="relative h-48 overflow-hidden bg-stone-900 shrink-0">
                  <img
                    src={getItemImage(item)}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90 group-hover:brightness-100"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent" />
                  
                  {/* Category badging */}
                  {item.label ? (
                    <span className="absolute top-3.5 left-3.5 px-2.5 py-1 bg-amber-500 text-stone-950 font-black text-[10px] uppercase tracking-widest rounded-md shadow-md animate-pulse">
                      {item.label}
                    </span>
                  ) : item.isPopular ? (
                    <span className="absolute top-3.5 left-3.5 px-2.5 py-1 bg-stone-900 border border-amber-500/40 text-amber-400 font-bold text-[10px] uppercase tracking-widest rounded-md shadow-md flex items-center space-x-1">
                      <Flame className="w-3 h-3 text-amber-500 fill-amber-500" />
                      <span>Popular</span>
                    </span>
                  ) : null}

                  {/* Vegan branding */}
                  {item.isVegan && (
                    <span className="absolute top-3.5 right-3.5 px-2 py-0.5 bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 font-black text-[10px] uppercase tracking-wider rounded-md">
                      VEGANO
                    </span>
                  )}
                </div>

                {/* Card Content body */}
                <div className="p-5 flex flex-col justify-between flex-grow">
                  <div>
                    <div className="flex items-start justify-between">
                      <h3 className="text-lg font-serif font-bold text-stone-100 group-hover:text-amber-400 transition-colors">
                        {item.name}
                      </h3>
                      <span className="text-base font-mono font-bold text-amber-400 ml-3 whitespace-nowrap">
                        {item.price.toFixed(2)}€
                      </span>
                    </div>

                    <p className="mt-3 text-xs text-stone-400 leading-relaxed font-normal line-clamp-2">
                      {item.description}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-stone-900 flex items-center justify-between text-[11px]">
                    <span className="text-stone-500 font-mono">
                      Info: {item.allergens.length > 0 ? `${item.allergens.length} alérgenos` : 'Sin alérgenos'}
                    </span>
                    <span className="text-amber-500/80 group-hover:text-amber-400 font-bold uppercase tracking-wider flex items-center space-x-1">
                      <span>Ver detalles</span>
                      <span className="font-semibold group-hover:translate-x-0.5 transition-transform">→</span>
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Empty Search Fallback */}
          {filteredItems.length === 0 && (
            <div className="col-span-full text-center py-16 bg-stone-950/40 rounded-xl border border-stone-850">
              <AlertCircle className="w-12 h-12 text-stone-600 mx-auto mb-4" />
              <h3 className="text-lg font-serif font-bold text-stone-300">Ningún plato coincide</h3>
              <p className="text-stone-500 text-sm mt-2 max-w-md mx-auto">
                No hemos encontrado platos libre de los alérgenos seleccionados o que coincidan con "{searchQuery}". Intenta limpiar algún filtro o tu búsqueda.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedAllergens([]);
                  setOnlyVegOption(false);
                }}
                className="mt-6 px-4 py-2 bg-stone-900 border border-stone-800 text-amber-500 hover:bg-stone-800 font-bold text-xs uppercase tracking-wider rounded-lg transition-colors"
              >
                Limpiar todos los filtros
              </button>
            </div>
          )}
        </motion.div>

        {/* Nutritional & Sourcing details bottom ribbon */}
        <div className="mt-12 text-center text-xs text-stone-500 bg-stone-950/40 rounded-lg border border-stone-850/60 p-4 max-w-2xl mx-auto flex items-center justify-center space-x-3">
          <Info className="w-5 h-5 text-amber-600 shrink-0" />
          <p className="leading-relaxed">
            De acuerdo con el Reglamento de la UE 1169/2011, disponemos de fichas de información técnica completas. Por favor, de haber alguna intolerancia o alergia severa, adviértelo a nuestro equipo de sala al reservar o de inmediato al llegar.
          </p>
        </div>
      </div>

      {/* Item Detail Lightbox Modal */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Overlay backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
              className="absolute inset-0 bg-stone-950/80 backdrop-blur-md"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-full max-w-lg bg-stone-950 border border-stone-800 rounded-2xl overflow-hidden shadow-2xl z-10"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-stone-900/80 border border-stone-800 flex items-center justify-center text-stone-400 hover:text-stone-100 hover:scale-105 transition-all outline-none"
              >
                ✕
              </button>

              {/* Cover Image */}
              <div className="relative h-56 bg-stone-900">
                <img
                  src={getItemImage(selectedItem)}
                  alt={selectedItem.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <span className="px-2 py-1 bg-amber-500 text-stone-950 font-mono font-bold text-[10px] uppercase tracking-wider rounded">
                    {categories.find(c => c.id === selectedItem.category)?.label}
                  </span>
                </div>
              </div>

              {/* Dialog Body */}
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <h3 className="text-xl sm:text-2xl font-serif font-black text-stone-100 uppercase">
                    {selectedItem.name}
                  </h3>
                  <span className="text-xl font-mono font-bold text-amber-400 ml-4">
                    {selectedItem.price.toFixed(2)}€
                  </span>
                </div>

                <p className="mt-4 text-sm text-stone-300 leading-relaxed">
                  {selectedItem.description}
                </p>

                {/* Special Perks row */}
                <div className="mt-6 flex flex-wrap gap-2.5">
                  {selectedItem.isPopular && (
                    <span className="inline-flex items-center space-x-1.5 px-3 py-1 bg-amber-950/30 border border-amber-700/40 text-amber-400 text-xs font-bold rounded-lg uppercase tracking-wide">
                      <Flame className="w-3.5 h-3.5 text-amber-500" />
                      <span>Recomendación Especial</span>
                    </span>
                  )}
                  {selectedItem.isVegan && (
                    <span className="inline-flex items-center space-x-1 px-3 py-1 bg-emerald-950/30 border border-emerald-700/40 text-emerald-400 text-xs font-bold rounded-lg uppercase tracking-wide">
                      <span>Plato Vegano</span>
                    </span>
                  )}
                  {selectedItem.isVegetarian && !selectedItem.isVegan && (
                    <span className="inline-flex items-center space-x-1 px-3 py-1 bg-emerald-950/20 border border-emerald-900/40 text-emerald-500 text-xs font-bold rounded-lg uppercase tracking-wide">
                      <span>Vegetariano</span>
                    </span>
                  )}
                </div>

                {/* Allergens Checklist Box */}
                <div className="mt-6 pt-5 border-t border-stone-900">
                  <h4 className="text-xs font-bold font-mono text-stone-400 uppercase tracking-wider mb-3">
                    Ficha de Alérgenos:
                  </h4>
                  {selectedItem.allergens.length > 0 ? (
                    <div className="grid grid-cols-2 gap-2">
                      {selectedItem.allergens.map((alg) => (
                        <div key={alg} className="flex items-center space-x-2 text-xs text-stone-300 bg-stone-900/60 border border-stone-850 py-2 px-3 rounded-lg">
                          <span className="w-2 h-2 rounded-full bg-red-500 shrink-0" />
                          <span>Contiene <strong>{alg}</strong></span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2.5 py-3 px-4 bg-emerald-950/20 border border-emerald-900/40 rounded-xl text-emerald-400 text-xs">
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>Este plato está catalogado como <strong>Libre de Alérgenos Comunes</strong>.</span>
                    </div>
                  )}
                </div>

                {/* Action in details */}
                <div className="mt-8 flex gap-3">
                  <button
                    onClick={() => {
                      setSelectedItem(null);
                      const element = document.getElementById('booking');
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="w-full py-3 bg-amber-600 hover:bg-amber-500 text-stone-950 font-black text-xs uppercase tracking-widest rounded-lg transition-colors duration-300 shadow-md flex items-center justify-center space-x-2"
                  >
                    <span>Reservar Mesa Para Probarlo</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
