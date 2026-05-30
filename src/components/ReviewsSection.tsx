import { useState, useMemo, FormEvent, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, MessageSquareCode, Heart, Share2, Plus, Smile, User, ThumbsUp, Sparkles } from 'lucide-react';
import { REVIEWS } from '../data/reviews';
import { Review } from '../types';

const RATING_TAGS = ['Todas', 'precio', 'carta', 'nachos', 'cenar'];

export default function ReviewsSection() {
  const [reviewsList, setReviewsList] = useState<Review[]>(() => {
    try {
      const saved = localStorage.getItem('ranch_reviews_list');
      return saved ? JSON.parse(saved) : REVIEWS;
    } catch {
      return REVIEWS;
    }
  });
  const [activeTag, setActiveTag] = useState<string>('Todas');
  const [likedReviews, setLikedReviews] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('ranch_liked_reviews');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('ranch_reviews_list', JSON.stringify(reviewsList));
    } catch (e) {
      console.warn('Failed to save reviews to localStorage:', e);
    }
  }, [reviewsList]);

  useEffect(() => {
    try {
      localStorage.setItem('ranch_liked_reviews', JSON.stringify(likedReviews));
    } catch (e) {
      console.warn('Failed to save liked reviews to localStorage:', e);
    }
  }, [likedReviews]);
  
  // Custom reviews creation states
  const [newAuthor, setNewAuthor] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newContent, setNewContent] = useState('');
  const [newCategory, setNewCategory] = useState('cena');

  // Interactive like incremental
  const handleLike = (id: string) => {
    if (likedReviews.includes(id)) {
      setLikedReviews(prev => prev.filter(item => item !== id));
      setReviewsList(prev => prev.map(rev => rev.id === id ? { ...rev, likes: (rev.likes || 1) - 1 } : rev));
    } else {
      setLikedReviews(prev => [...prev, id]);
      setReviewsList(prev => prev.map(rev => rev.id === id ? { ...rev, likes: (rev.likes || 0) + 1 } : rev));
    }
  };

  // Filter list of reviews based on tags
  const filteredReviews = useMemo(() => {
    if (activeTag === 'Todas') return reviewsList;
    return reviewsList.filter((rev) => {
      const tagLower = activeTag.toLowerCase();
      const contentLower = rev.content.toLowerCase();
      const foodLower = rev.highlightedFood ? rev.highlightedFood.toLowerCase() : '';
      return contentLower.includes(tagLower) || foodLower.includes(tagLower);
    });
  }, [reviewsList, activeTag]);

  // Ensure high density side-by-side looping of cards
  const duplicatedReviews = useMemo(() => {
    let items = [...filteredReviews];
    if (items.length === 0) return [];
    
    // Fill the track to ensure it occupies enough width
    while (items.length < 6) {
      items = [...items, ...items];
    }
    return items;
  }, [filteredReviews]);

  const [formError, setFormError] = useState<string | null>(null);

  // Form submit handler
  const handleAddReview = (e: FormEvent) => {
    e.preventDefault();
    if (!newAuthor || !newContent) {
      setFormError('Por favor, indica tu nombre y añade unas breves palabras de tu experiencia.');
      return;
    }

    setFormError(null);

    const created: Review = {
      id: `custom-rev-${Date.now()}`,
      author: newAuthor,
      role: 'Cliente Verificado AI Studio',
      rating: newRating,
      date: 'Hace unos instantes',
      content: newContent,
      likes: 0,
      highlightedFood: newCategory
    };

    setReviewsList(prev => [created, ...prev]);
    
    // Reset states
    setNewAuthor('');
    setNewContent('');
    setSelectedRating(5);
    setShowForm(false);
  };

  const setSelectedRating = (rating: number) => {
    setNewRating(rating);
  };

  return (
    <section id="reviews" className="py-24 bg-stone-900 text-stone-100 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(217,119,6,0.03),transparent_50%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-amber-500 font-mono">
            Veredicto de Nuestros Comensales
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-black uppercase text-stone-100 mt-2">
            Opiniones de Google Maps
          </h2>
          <p className="mt-4 text-stone-400 text-sm sm:text-base">
            La honestidad de nuestra clientela es nuestra mejor carta de recomendación. Lee más de 202 comentarios reales de guías locales que ya nos han visitado.
          </p>
          <div className="w-16 h-1 bg-amber-500/80 mx-auto mt-6" />
        </div>

        {/* Global Maps score stats widget */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-center bg-stone-950/80 rounded-xl border border-stone-850 p-6 sm:p-8 mb-10 shadow-xl">
          
          {/* Average rating summary card */}
          <div className="col-span-1 md:col-span-4 text-center md:border-r md:border-stone-850 md:pr-8 py-2 md:py-4">
            <span className="block text-5xl sm:text-6xl font-serif font-black text-amber-500">4.5</span>
            <div className="flex justify-center my-2 sm:my-3">
              {[1, 2, 3, 4, 5].map((_, i) => (
                <Star key={i} className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-amber-500 fill-amber-500" />
              ))}
            </div>
            <p className="text-[10px] sm:text-xs text-stone-400 font-mono uppercase tracking-wider font-semibold">
              202 Opiniones en Ciudad Real
            </p>
          </div>

          {/* Progress bar visual specs index - HIDDEN ON MOBILE to keep it principal rating only */}
          <div className="hidden md:block md:col-span-5 space-y-2.5 px-0 md:px-6">
            {[
              { label: 'Excepcional (5★)', pct: '81%' },
              { label: 'Muy bueno (4★)', pct: '12%' },
              { label: 'Aceptable (3★)', pct: '5%' },
              { label: 'Mejorable (2★/1★)', pct: '2%' }
            ].map((bar, idx) => (
              <div key={idx} className="flex items-center text-xs">
                <span className="w-32 text-stone-400 font-medium">{bar.label}</span>
                <div className="flex-1 bg-stone-900 h-2.5 rounded-full overflow-hidden mx-3">
                  <div className="bg-amber-500 h-full rounded-full" style={{ width: bar.pct }} />
                </div>
                <span className="w-8 text-right text-stone-500 font-mono font-bold">{bar.pct}</span>
              </div>
            ))}
          </div>

          {/* Action CTAs columns inside stats */}
          <div className="col-span-1 md:col-span-3 text-center md:pl-6 pt-2 md:pt-0">
            <button
              onClick={() => setShowForm(!showForm)}
              className="px-5 py-3 bg-stone-905 border border-stone-800 hover:border-amber-500/40 hover:text-amber-400 text-stone-200 font-bold text-xs uppercase tracking-widest rounded-lg transition-all w-full flex items-center justify-center space-x-2 active:scale-[0.98]"
            >
              <Plus className="w-4 h-4 text-amber-500" />
              <span>Dejar mi Opinión</span>
            </button>
          </div>
        </div>

        {/* Collapsible Write user review Form block */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-stone-950 border border-amber-500/20 rounded-xl p-6 mb-10 shadow-2xl"
            >
              <form onSubmit={handleAddReview} className="space-y-5">
                <h3 className="text-lg font-serif font-bold text-stone-200 uppercase tracking-wider flex items-center space-x-2">
                  <Sparkles className="w-5 h-5 text-amber-500" />
                  <span>Tu reseña para 26 Bar Ranch</span>
                </h3>

                {formError && (
                  <div className="p-3.5 bg-red-950/40 border border-red-900/45 text-red-300 text-xs sm:text-sm rounded-lg flex items-center space-x-2 animate-pulse">
                    <span className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
                    <span>{formError}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold font-mono text-stone-400 uppercase tracking-wider">Tu Nombre</label>
                    <input
                      type="text"
                      required
                      placeholder="p. ej. Miguel Ángel"
                      value={newAuthor}
                      onChange={(e) => setNewAuthor(e.target.value)}
                      className="w-full bg-stone-900 border border-stone-800 rounded-lg px-4 py-3 text-stone-100 placeholder-stone-600 focus:outline-none focus:border-amber-500/50 text-sm transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold font-mono text-stone-400 uppercase tracking-wider">¿Qué plato destacarías?</label>
                    <input
                      type="text"
                      placeholder="p. ej. Las patatas con salsa agria o tarta Guinness"
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      className="w-full bg-stone-900 border border-stone-800 rounded-lg px-4 py-3 text-stone-100 placeholder-stone-600 focus:outline-none focus:border-amber-500/50 text-sm transition-all"
                    />
                  </div>
                </div>

                {/* Star rating picker selectors */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold font-mono text-stone-400 uppercase tracking-wider">Tu Calificación de Estrellas</label>
                  <div className="flex items-center space-x-1.5 pt-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setSelectedRating(star)}
                        className="focus:outline-none transition-transform active:scale-95 text-stone-500 hover:scale-110"
                      >
                        <Star
                          className={`w-7 h-7 ${
                            star <= newRating ? 'text-amber-500 fill-amber-500' : 'text-stone-700'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-xs font-bold font-mono text-amber-500/80 ml-3 uppercase">
                      ({newRating === 5 ? 'Excepcional' : newRating === 4 ? 'Muy bueno' : newRating === 3 ? 'Aceptable' : 'Mejorable'})
                    </span>
                  </div>
                </div>

                {/* Comment box content */}
                <div className="space-y-2">
                  <label className="text-xs font-bold font-mono text-stone-400 uppercase tracking-wider">Comentario de tu experiencia</label>
                  <textarea
                    required
                    placeholder="Escribe aquí tu opinión sincera sobre nuestro ambiente western, la atención de nuestro personal o las especialidades culinarias..."
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    rows={3}
                    className="w-full bg-stone-900 border border-stone-800 rounded-lg p-4 text-stone-100 placeholder-stone-600 focus:outline-none focus:border-amber-500/50 text-sm transition-all resize-none"
                  />
                </div>

                <div className="flex justify-end space-x-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-4 py-2 border border-stone-850 hover:bg-stone-900 text-stone-400 rounded-lg text-xs font-bold uppercase transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-amber-600 hover:bg-amber-500 text-stone-950 rounded-lg text-xs font-bold uppercase tracking-widest transition-colors flex items-center space-x-1.5"
                  >
                    <span>Publicar Reseña en Vivo</span>
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Filter tags (precio, nachos, carta, etc) */}
        <div className="flex flex-wrap items-center gap-1.5 mb-8 bg-stone-950/40 p-3 rounded-lg border border-stone-850/60 max-w-xl">
          <span className="text-[10px] uppercase font-mono font-bold text-stone-500 tracking-wider mr-2 flex items-center">
            <ThumbsUp className="w-3.5 h-3.5 text-amber-500 shrink-0 mr-1" />
            <span>Filtro de Temas:</span>
          </span>

          {RATING_TAGS.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`px-3 py-1 bg-stone-900 border text-xs font-semibold rounded-md transition-all uppercase tracking-wide ${
                activeTag === tag
                  ? 'bg-amber-500/10 border-amber-500 text-amber-400 font-bold'
                  : 'border-stone-800 text-stone-400 hover:text-stone-300 hover:border-stone-700'
              }`}
            >
              {tag === 'Todas' ? 'Todas' : `#${tag}`}
            </button>
          ))}
        </div>

        {/* Reviews Horizontal Infinite Marquee */}
        <div className="relative overflow-hidden w-full py-4 mt-8">
          {/* Gradient Edges fading effect for high-end aesthetic */}
          <div className="absolute inset-y-0 left-0 w-12 sm:w-32 bg-gradient-to-r from-stone-900 via-stone-900/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-12 sm:w-32 bg-gradient-to-l from-stone-900 via-stone-900/80 to-transparent z-10 pointer-events-none" />

          {duplicatedReviews.length > 0 ? (
            <div className="flex w-max animate-marquee hover:[animation-play-state:paused] py-4 select-none">
              {/* First Track Copy */}
              <div className="flex gap-4 sm:gap-6 pr-4 sm:pr-6 shrink-0">
                {duplicatedReviews.map((rev, idx) => {
                  const isLiked = likedReviews.includes(rev.id);
                  return (
                    <div
                      key={`track1-${rev.id}-${idx}`}
                      className="bg-stone-950/70 hover:bg-stone-950 border border-stone-850/80 hover:border-amber-500/30 rounded-xl p-3.5 sm:p-6 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between w-[220px] sm:w-[350px] md:w-[420px] shrink-0"
                    >
                      <div>
                        {/* Header info user */}
                        <div className="flex items-start justify-between">
                          <div className="flex items-center space-x-2.5 sm:space-x-3">
                            <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-full bg-stone-900 border border-stone-800 flex items-center justify-center text-amber-500/80 font-bold font-serif shadow-inner text-xs sm:text-base">
                              {rev.author.charAt(0)}
                            </div>
                            <div className="min-w-0">
                              <h4 className="text-[11px] sm:text-sm font-bold text-stone-100 flex flex-wrap items-center gap-1 sm:gap-1.5 truncate">
                                <span className="truncate">{rev.author}</span>
                                {rev.role && rev.role.includes('Local Guide') && (
                                  <span className="text-[7px] sm:text-[8px] bg-amber-500/10 border border-amber-500/20 text-amber-400 font-bold tracking-widest px-0.5 sm:px-1 py-0.5 rounded font-mono uppercase">
                                    local guide
                                  </span>
                                )}
                              </h4>
                              <span className="text-[8px] sm:text-[10px] text-stone-500 font-medium block mt-0.5">
                                {rev.role || 'Cliente de Maps'} • {rev.date}
                              </span>
                            </div>
                          </div>

                          {/* Score indicator stars */}
                          <div className="flex items-center space-x-0.5 shrink-0">
                            {[1, 2, 3, 4, 5].map((_, idx) => (
                              <Star
                                key={idx}
                                className={`w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 ${
                                  idx < rev.rating ? 'text-amber-500 fill-amber-500' : 'text-stone-850'
                                }`}
                              />
                            ))}
                          </div>
                        </div>

                        {/* Review text content */}
                        <p className="mt-2.5 sm:mt-4 text-[10.5px] sm:text-sm text-stone-300 leading-normal sm:leading-relaxed font-normal italic">
                          "{rev.content}"
                        </p>
                      </div>

                      {/* Actions & highlighted Food footer */}
                      <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-stone-900/60 flex items-center justify-between text-xs">
                        {rev.highlightedFood ? (
                          <span className="text-[8px] sm:text-[10px] font-bold font-mono text-amber-500 bg-amber-950/20 border border-amber-900/30 px-1.5 sm:px-2 py-0.5 rounded uppercase truncate max-w-[90px] sm:max-w-none">
                            Destaca: {rev.highlightedFood}
                          </span>
                        ) : (
                          <span className="text-[8px] sm:text-[10px] font-mono text-stone-600 block">Excelente ambiente</span>
                        )}

                        <button
                          onClick={() => handleLike(rev.id)}
                          className={`flex items-center space-x-1 sm:space-x-1.5 font-semibold text-[9px] sm:text-[11px] px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md transition-all active:scale-95 ${
                            isLiked
                              ? 'text-red-400 bg-red-950/10 border border-red-900/20'
                              : 'text-stone-500 hover:text-stone-400 bg-stone-900/40 border border-stone-850'
                          }`}
                        >
                          <ThumbsUp className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
                          <span>¿Útil? ({rev.likes || 0})</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Second Track Copy (Seamless Looping Duplicate) */}
              <div className="flex gap-4 sm:gap-6 pr-4 sm:pr-6 shrink-0 animate-marquee-loop">
                {duplicatedReviews.map((rev, idx) => {
                  const isLiked = likedReviews.includes(rev.id);
                  return (
                    <div
                      key={`track2-${rev.id}-${idx}`}
                      className="bg-stone-950/70 hover:bg-stone-950 border border-stone-850/80 hover:border-amber-500/30 rounded-xl p-3.5 sm:p-6 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between w-[220px] sm:w-[350px] md:w-[420px] shrink-0"
                    >
                      <div>
                        {/* Header info user */}
                        <div className="flex items-start justify-between">
                          <div className="flex items-center space-x-2.5 sm:space-x-3">
                            <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-full bg-stone-900 border border-stone-800 flex items-center justify-center text-amber-500/80 font-bold font-serif shadow-inner text-xs sm:text-base">
                              {rev.author.charAt(0)}
                            </div>
                            <div className="min-w-0">
                              <h4 className="text-[11px] sm:text-sm font-bold text-stone-100 flex flex-wrap items-center gap-1 sm:gap-1.5 truncate">
                                <span className="truncate">{rev.author}</span>
                                {rev.role && rev.role.includes('Local Guide') && (
                                  <span className="text-[7px] sm:text-[8px] bg-amber-500/10 border border-amber-500/20 text-amber-400 font-bold tracking-widest px-0.5 sm:px-1 py-0.5 rounded font-mono uppercase">
                                    local guide
                                  </span>
                                )}
                              </h4>
                              <span className="text-[8px] sm:text-[10px] text-stone-500 font-medium block mt-0.5">
                                {rev.role || 'Cliente de Maps'} • {rev.date}
                              </span>
                            </div>
                          </div>

                          {/* Score indicator stars */}
                          <div className="flex items-center space-x-0.5 shrink-0">
                            {[1, 2, 3, 4, 5].map((_, idx) => (
                              <Star
                                key={idx}
                                className={`w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 ${
                                  idx < rev.rating ? 'text-amber-500 fill-amber-500' : 'text-stone-850'
                                }`}
                              />
                            ))}
                          </div>
                        </div>

                        {/* Review text content */}
                        <p className="mt-2.5 sm:mt-4 text-[10.5px] sm:text-sm text-stone-300 leading-normal sm:leading-relaxed font-normal italic">
                          "{rev.content}"
                        </p>
                      </div>

                      {/* Actions & highlighted Food footer */}
                      <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-stone-900/60 flex items-center justify-between text-xs">
                        {rev.highlightedFood ? (
                          <span className="text-[8px] sm:text-[10px] font-bold font-mono text-amber-500 bg-amber-950/20 border border-amber-900/30 px-1.5 sm:px-2 py-0.5 rounded uppercase truncate max-w-[90px] sm:max-w-none">
                            Destaca: {rev.highlightedFood}
                          </span>
                        ) : (
                          <span className="text-[8px] sm:text-[10px] font-mono text-stone-600 block">Excelente ambiente</span>
                        )}

                        <button
                          onClick={() => handleLike(rev.id)}
                          className={`flex items-center space-x-1 sm:space-x-1.5 font-semibold text-[9px] sm:text-[11px] px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md transition-all active:scale-95 ${
                            isLiked
                              ? 'text-red-400 bg-red-950/10 border border-red-900/20'
                              : 'text-stone-500 hover:text-stone-400 bg-stone-900/40 border border-stone-850'
                          }`}
                        >
                          <ThumbsUp className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
                          <span>¿Útil? ({rev.likes || 0})</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="text-center py-12 bg-stone-950/40 rounded-xl border border-stone-850 max-w-md mx-auto">
              <p className="text-sm text-stone-400">No hay opiniones en esta categoría por el momento.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
