import { useState, useMemo, FormEvent, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Users, MapPin, Clock, Check, Sparkles, AlertCircle, Info, BookmarkCheck, Share2 } from 'lucide-react';
import { Reservation } from '../types';

export default function BookingSection() {
  const [formData, setFormData] = useState<Omit<Reservation, 'id'>>({
    name: '',
    email: '',
    phone: '',
    date: new Date().toISOString().split('T')[0],
    time: '21:00',
    guests: 2,
    zone: 'saloon',
    specialRequests: ''
  });

  const [activeZone, setActiveZone] = useState<'saloon' | 'bar' | 'terrace'>('saloon');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reservationResult, setReservationResult] = useState<Reservation | null>(() => {
    try {
      const saved = localStorage.getItem('ranch_last_reservation');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [bookingError, setBookingError] = useState<string | null>(null);

  useEffect(() => {
    if (reservationResult) {
      try {
        localStorage.setItem('ranch_last_reservation', JSON.stringify(reservationResult));
      } catch (e) {
        console.warn('Failed to save reservation to localStorage:', e);
      }
    } else {
      try {
        localStorage.removeItem('ranch_last_reservation');
      } catch {}
    }
  }, [reservationResult]);

  // Seat/Table zones explanation
  const zonesDetails = {
    saloon: {
      title: 'Western Saloon Principal',
      capacity: 'Llenado alto los sábados',
      desc: 'Sumérgete por completo en el auténtico espíritu Far West. Grandes mesas rústicas de roble macizo, luz cálida de lámparas de cobre, rodeado de objetos vintage de colección y una magnífica música de fondo.',
      colorClass: 'border-amber-500/35 bg-amber-950/20 text-amber-400',
      tag: 'El favorito de los grupos'
    },
    bar: {
      title: 'Barra de Caños & Tapas',
      capacity: 'Ambiente muy dinámico',
      desc: 'La acción de primera mano. Sitúate al lado de nuestros tiradores de cerveza artesanal de barril y observa el desfile continuo de tapas y raciones en salida. Perfecto para parejas o picoteos rápidos.',
      colorClass: 'border-sky-500/35 bg-sky-950/20 text-sky-400',
      tag: 'Vibrante y conversador'
    },
    terrace: {
      title: 'Terraza Corazón de María',
      capacity: 'Alta demanda en noches de verano',
      desc: 'Nuestra espaciosa terraza al aire libre ubicada en plena Calle Corazón de María. Ideal para disfrutar de una noche de tapas bajo las estrellas con la frescura de la brisa manchega.',
      colorClass: 'border-emerald-500/35 bg-emerald-950/20 text-emerald-400',
      tag: 'Con brisa al aire libre'
    }
  };

  // Peak Hour detection based on Saturday maps data ("sábados mayor concurrencia")
  const isPeakTime = useMemo(() => {
    const selectedDate = new Date(formData.date);
    const isSaturday = selectedDate.getDay() === 6; // Sunday is 0, Saturday is 6
    const hour = parseInt(formData.time.split(':')[0]);
    // Saturday peak times are afternoon (2 PM - 4 PM) and night (9 PM - 11:30 PM)
    return isSaturday && ((hour >= 13 && hour <= 16) || (hour >= 20 && hour <= 23));
  }, [formData.date, formData.time]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      setBookingError('Por favor, rellene todos los campos obligatorios para asegurar su reserva.');
      return;
    }

    setBookingError(null);
    setIsSubmitting(true);
    
    // Simulate API turnaround
    setTimeout(() => {
      setIsSubmitting(false);
      setReservationResult({
        ...formData,
        zone: activeZone
      });
    }, 1200);
  };

  // Generate Google Calendar Link for CRO
  const googleCalendarUrl = useMemo(() => {
    if (!reservationResult) return '';
    const dateStr = reservationResult.date.replace(/-/g, '');
    const timeSplit = reservationResult.time.split(':');
    const startHour = parseInt(timeSplit[0]);
    const startMin = timeSplit[1];
    
    // Format calendar start/end times (typical checkout dur: 2 hours)
    const endHour = (startHour + 2) % 24;
    const endStr = `${endHour < 10 ? '0' + endHour : endHour}${startMin}`;
    
    const formattedStartTime = `${dateStr}T${reservationResult.time.replace(':', '')}00Z`;
    const formattedEndTime = `${dateStr}T${endStr}00Z`;

    const title = encodeURIComponent('Cena en 26 Bar Ranch 🤠🍻');
    const details = encodeURIComponent(
      `¡Hola ! Se ha confirmado tu reserva en 26 Bar Ranch.\n\n` +
      `Detalles:\n` +
      `- Comensales: ${reservationResult.guests} personas\n` +
      `- Zona del Rancho: ${zonesDetails[reservationResult.zone].title}\n` +
      `- Dirección: Calle Corazón de María, 1, 13003 Ciudad Real\n` +
      `- Teléfono: 926 04 27 76\n\n` +
      `¡Los mejores nachos y tartas Guinness te esperan!`
    );
    const location = encodeURIComponent('Calle Corazón de María, 1, 13003 Ciudad Real, España');

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${formattedStartTime}/${formattedEndTime}&details=${details}&location=${location}`;
  }, [reservationResult]);

  return (
    <section id="booking" className="py-24 bg-stone-950 text-stone-100 relative">
      {/* Background vectors decoration */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-stone-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-amber-500 font-mono">
            Planifica tu Experiencia
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-black uppercase text-stone-100 mt-2">
            Reservar una Mesa
          </h2>
          <p className="mt-4 text-stone-400 text-sm sm:text-base">
            Garantiza tu sitio preferido de manera inmediata y gratuita. Recibe tu confirmación digital al instante para añadir directamente a tu calendario.
          </p>
          <div className="w-16 h-1 bg-amber-500/80 mx-auto mt-6" />
        </div>

        <AnimatePresence mode="wait">
          {!reservationResult ? (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            >
              
              {/* Left Column: Interactive Floor Planner details */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-stone-900 border border-stone-850 p-6 rounded-xl shadow-xl">
                  <h3 className="text-lg font-serif font-bold text-stone-200 mb-4 uppercase tracking-wide flex items-center space-x-2">
                    <span className="w-1.5 h-6 bg-amber-500 inline-block rounded" />
                    <span>Selección de Zona del Rancho</span>
                  </h3>
                  
                  {/* Buttons Selector */}
                  <div className="grid grid-cols-3 gap-2 mb-6">
                    {(['saloon', 'bar', 'terrace'] as const).map((z) => (
                      <button
                        key={z}
                        type="button"
                        onClick={() => {
                          setActiveZone(z);
                          setFormData(prev => ({ ...prev, zone: z }));
                        }}
                        className={`py-3.5 px-2 rounded-lg text-xs font-bold flex flex-col items-center justify-center space-y-1 transition-all border outline-none ${
                          activeZone === z
                            ? 'bg-amber-500/10 border-amber-500 text-amber-400 font-black scale-[1.02]'
                            : 'bg-stone-950/40 border-stone-800 text-stone-400 hover:text-stone-300 hover:bg-stone-850'
                        }`}
                      >
                        <span className="uppercase tracking-wider">{z === 'saloon' ? 'Saloon' : z === 'bar' ? 'Barra' : 'Terraza'}</span>
                      </button>
                    ))}
                  </div>

                  {/* Active Zone features description */}
                  <div className={`p-4 rounded-lg border leading-relaxed transition-all duration-300 ${zonesDetails[activeZone].colorClass}`}>
                    <div className="flex items-center justify-between">
                      <h4 className="font-serif font-bold text-sm tracking-wide">{zonesDetails[activeZone].title}</h4>
                      <span className="text-[10px] uppercase font-mono font-bold tracking-widest px-2 py-0.5 bg-stone-950/60 rounded border border-current">
                        {zonesDetails[activeZone].tag}
                      </span>
                    </div>
                    <p className="text-xs mt-3 leading-relaxed text-stone-300">
                      {zonesDetails[activeZone].desc}
                    </p>
                    <div className="mt-4 pt-3 border-t border-current/10 flex items-center justify-between text-[10px] font-semibold text-stone-400 uppercase font-mono">
                      <span>Ocupación media:</span>
                      <span className="font-bold text-amber-500">{zonesDetails[activeZone].capacity}</span>
                    </div>
                  </div>
                </div>

                {/* Local Guides Tips Accordion */}
                <div className="bg-stone-900/60 border border-stone-850/80 p-5 rounded-xl space-y-3">
                  <div className="flex items-start space-x-2.5">
                    <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-stone-300 font-mono">Consejo de Reserva CRO:</h4>
                      <p className="text-[11px] text-stone-400 mt-1.5 leading-relaxed">
                        Los sábados entre las <strong>9:00 PM</strong> y las <strong>11:00 PM</strong> son nuestras horas de mayor concurrencia. Si prefieres cenar con mayor calma, te recomendamos agendar tu mesa a las <strong>8:15 PM</strong> o a partir de las <strong>11:15 PM</strong>.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Reservation Form */}
              <div className="lg:col-span-7 bg-stone-900 border border-stone-850 p-6 sm:p-8 rounded-xl shadow-xl">
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {bookingError && (
                    <div className="p-4 bg-red-950/40 border border-red-900/40 text-red-300 text-xs sm:text-sm rounded-lg flex items-center space-x-2 animate-pulse">
                      <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                      <span>{bookingError}</span>
                    </div>
                  )}
                  
                  {/* Personal info fields row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-stone-400 uppercase tracking-wider font-mono">
                        Tu Nombre Completo *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full bg-stone-950 border border-stone-800 rounded-lg px-4 py-3 text-stone-100 placeholder-stone-600 focus:outline-none focus:border-amber-500/50 text-sm transition-all"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-stone-400 uppercase tracking-wider font-mono">
                        WhatsApp / Teléfono *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="600 000 000"
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        className="w-full bg-stone-950 border border-stone-800 rounded-lg px-4 py-3 text-stone-100 placeholder-stone-600 focus:outline-none focus:border-amber-500/50 text-sm transition-all"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-stone-400 uppercase tracking-wider font-mono">
                      Correo Electrónico *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="tu@correo.com"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full bg-stone-950 border border-stone-800 rounded-lg px-4 py-3 text-stone-100 placeholder-stone-600 focus:outline-none focus:border-amber-500/50 text-sm transition-all"
                    />
                    <p className="text-[10px] text-stone-500 font-medium">Usado exclusivamente para enviar la confirmación inmediata de reserva.</p>
                  </div>

                  {/* Date, Time, guests row */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-stone-400 uppercase tracking-wider font-mono">
                        Fecha *
                      </label>
                      <input
                        type="date"
                        required
                        min={new Date().toISOString().split('T')[0]}
                        value={formData.date}
                        onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                        className="w-full bg-stone-950 border border-stone-800 rounded-lg px-4 py-3 text-stone-100 focus:outline-none focus:border-amber-500/50 text-sm transition-all scheme-dark"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-stone-400 uppercase tracking-wider font-mono">
                        Hora *
                      </label>
                      <select
                        value={formData.time}
                        onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
                        className="w-full bg-stone-950 border border-stone-800 rounded-lg px-4 py-3 text-stone-100 focus:outline-none focus:border-amber-500/50 text-sm transition-all"
                      >
                        {['13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '20:00', '20:30', '21:00', '21:30', '22:00', '22:30', '23:00', '23:30', '00:00'].map((t) => (
                          <option key={t} value={t} className="bg-stone-900">{t} hs</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-stone-400 uppercase tracking-wider font-mono">
                        Nº Personas *
                      </label>
                      <div className="relative">
                        <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-500" />
                        <select
                          value={formData.guests}
                          onChange={(e) => setFormData(prev => ({ ...prev, guests: parseInt(e.target.value) }))}
                          className="w-full bg-stone-950 border border-stone-800 rounded-lg pl-9 pr-4 py-3 text-stone-100 focus:outline-none focus:border-amber-500/50 text-sm transition-all"
                        >
                          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 20].map((num) => (
                            <option key={num} value={num} className="bg-stone-900">{num} {num === 1 ? 'persona' : 'personas'}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Peak Hour Danger Notice Alerts (CRO warning) */}
                  <AnimatePresence>
                    {isPeakTime && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="p-3 bg-amber-950/20 border border-amber-600/30 text-amber-500 rounded-lg flex items-start space-x-2 text-xs leading-relaxed"
                      >
                        <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                        <div>
                          <strong>¡Horario de Concurrencia Máxima!</strong> Has seleccionado un sábado por la noche/tarde. Como indicaron más de 70 clientes habituales, a esta hora el Saloon se llena al máximo. Te aseguramos la mesa, pero te aconsejamos puntualidad absoluta para conservar tu mesa.
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Special notes */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-stone-400 uppercase tracking-wider font-mono flex items-center justify-between">
                      <span>Notas especiales / Alergias</span>
                      <span className="text-[10px] text-stone-500 lowercase normal-case">(opcional)</span>
                    </label>
                    <textarea
                      placeholder="¿Alguna alergia severa o intolerancia, carrito de bebé, o necesitáis trona? Cuéntanos..."
                      value={formData.specialRequests}
                      onChange={(e) => setFormData(prev => ({ ...prev, specialRequests: e.target.value }))}
                      rows={3}
                      className="w-full bg-stone-950 border border-stone-800 rounded-lg p-4 text-stone-100 placeholder-stone-600 focus:outline-none focus:border-amber-500/50 text-sm transition-all resize-none"
                    />
                  </div>

                  {/* Security protection stamp */}
                  <div className="flex items-center space-x-2 text-[11px] text-stone-500">
                    <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                    <span>Conexión blindada SSL de 256 bits. No compartimos tu información personal.</span>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4.5 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-black text-sm uppercase tracking-widest rounded-lg shadow-lg active:scale-[0.98] transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="animate-spin rounded-full h-4 w-4 border-2 border-stone-950 border-t-transparent mr-2"></span>
                        <span>Marcando tu sitio en el mapa...</span>
                      </>
                    ) : (
                      <>
                        <span>Confirmar Reserva de Mesa Gratis</span>
                        <Sparkles className="w-4 h-4 ml-1" />
                      </>
                    )}
                  </button>
                </form>
              </div>

            </motion.div>
          ) : (
            
            /* Reservation Success Receipt Screen */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', damping: 25 }}
              className="max-w-2xl mx-auto bg-stone-900 border border-stone-800 shadow-2xl rounded-2xl overflow-hidden"
            >
              {/* Header Box badge */}
              <div className="bg-emerald-600 p-6 text-center text-stone-950">
                <BookmarkCheck className="w-12 h-12 text-stone-950 mx-auto" />
                <h3 className="text-xl sm:text-2xl font-serif font-black uppercase tracking-wider mt-2">
                  ¡Reserva Confirmada Exitosamente!
                </h3>
                <p className="text-sm text-stone-950 font-medium mt-1">
                  Tu sitio en el Rancho está reservado. Hemos enviado tu justificante.
                </p>
              </div>

              {/* Styled Vintage Ticket Section */}
              <div className="p-6 sm:p-8 space-y-6 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.05),transparent_50%)]">
                
                {/* Code badge banner */}
                <div className="flex items-center justify-between border-b border-stone-800 pb-5">
                  <div>
                    <span className="text-[10px] uppercase font-mono font-bold text-stone-500 tracking-widest">Código de Mesa:</span>
                    <span className="block font-mono text-lg font-bold text-amber-400">#RANCH-{Math.floor(1000 + Math.random() * 9000)}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase font-mono font-bold text-stone-500 tracking-widest">Estado:</span>
                    <span className="block text-emerald-400 text-xs font-bold uppercase tracking-wider bg-emerald-950/40 px-2.5 py-1 rounded border border-emerald-800/40">Garantizado</span>
                  </div>
                </div>

                {/* Main ticket summary info */}
                <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-sm">
                  <div>
                    <span className="block text-xs font-mono text-stone-500 uppercase tracking-wider">Titular:</span>
                    <strong className="block text-stone-200 text-base mt-0.5">{reservationResult.name}</strong>
                  </div>
                  <div>
                    <span className="block text-xs font-mono text-stone-500 uppercase tracking-wider">Comensales:</span>
                    <strong className="block text-stone-200 text-base mt-0.5">{reservationResult.guests} personas</strong>
                  </div>
                  <div>
                    <span className="block text-xs font-mono text-stone-500 uppercase tracking-wider">Fecha & Hora:</span>
                    <span className="block font-mono text-stone-200 text-base mt-0.5 font-bold">
                      {new Date(reservationResult.date).toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'short' })} • {reservationResult.time} hs
                    </span>
                  </div>
                  <div>
                    <span className="block text-xs font-mono text-stone-500 uppercase tracking-wider">Zona del Bar:</span>
                    <strong className="block text-amber-400 text-base mt-0.5">{zonesDetails[reservationResult.zone].title}</strong>
                  </div>
                </div>

                <div className="border-t border-stone-800 pt-5 space-y-3">
                  <div className="text-xs text-stone-400 leading-relaxed bg-stone-950/50 p-4 rounded-xl border border-stone-850">
                    <span className="block text-[10px] font-bold uppercase text-stone-500 tracking-widest font-mono mb-1">Ubicación del Establecimiento:</span>
                    <strong>Calle Corazón de María, 1, 13003 Ciudad Real.</strong> En pleno centro de la ciudad de Ciudad Real. No tendrás problemas de estacionamiento cercano.
                  </div>

                  {reservationResult.specialRequests && (
                    <div className="text-xs text-stone-400 bg-stone-950/20 p-3.5 rounded-lg border border-stone-850">
                      <span className="block font-bold text-stone-500 uppercase tracking-widest font-mono text-[9px] mb-1">Notas especiales enviadas:</span>
                      <p className="italic">"{reservationResult.specialRequests}"</p>
                    </div>
                  )}
                </div>

                {/* Micro-actions buttons for Google calendar integration or cancellation */}
                <div className="border-t border-stone-800 pt-6 flex flex-col sm:flex-row gap-3">
                  <a
                    href={googleCalendarUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 bg-amber-600 hover:bg-amber-500 text-stone-950 font-black text-xs uppercase tracking-widest rounded-lg transition-colors text-center flex items-center justify-center space-x-2 shadow-lg"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Añadir a Google Calendar</span>
                  </a>

                  <button
                    onClick={() => {
                      setReservationResult(null);
                      setFormData({
                        name: '',
                        email: '',
                        phone: '',
                        date: new Date().toISOString().split('T')[0],
                        time: '21:00',
                        guests: 2,
                        zone: 'saloon',
                        specialRequests: ''
                      });
                    }}
                    className="py-3 px-5 border border-stone-700/60 hover:border-stone-500 text-stone-400 hover:text-stone-300 font-bold text-xs uppercase tracking-wider rounded-lg transition-colors"
                  >
                    Programar otra mesa
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
