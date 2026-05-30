import { useState, useMemo, FormEvent } from 'react';
import { MapPin, Phone, Clock, Navigation, Car, Sparkles, Send, CheckCircle2, Mail, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function LocationSection() {
  const [origin, setOrigin] = useState('');
  const [calcResult, setCalcResult] = useState<{
    walk: number;
    bike: number;
    car: number;
    distance: number;
  } | null>(null);

  // Contact Form states
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSuccess, setContactSuccess] = useState(false);
  const [contactSubmitting, setContactSubmitting] = useState(false);

  // Decryption States for Privacy & anti-scraping
  const [revealedPhone, setRevealedPhone] = useState(false);
  const [revealedEmail, setRevealedEmail] = useState(false);
  const [revealedWhatsApp, setRevealedWhatsApp] = useState(false);

  const getDecryptedPhone = () => revealedPhone ? atob('OTI2IDA0IDI3IDc2') : 'Mostrar Teléfono';
  const getPhoneHref = () => revealedPhone ? atob('dGVsOjkyNjA0Mjc3Ng==') : '#';

  const getDecryptedEmail = () => revealedEmail ? atob('Y29udGFjdG9AMjZiYXJyYW5jaC5lcw==') : 'Mostrar Email';
  const getEmailHref = () => revealedEmail ? atob('bWFpbHRvOmNvbnRhY3RvQDI2YmFycmFuY2guZXM=') : '#';

  const getDecryptedWhatsApp = () => revealedWhatsApp ? 'Ir a WhatsApp Chat' : 'Revelar Enlace de WhatsApp';
  const getWhatsAppHref = () => revealedWhatsApp ? atob('aHR0cHM6Ly93YS5tZS8zNDkyNjA0Mjc3Ng==') : '#';

  // Real physical details of 26 Bar ranch
  const address = 'C. Corazón de María, 1, 13003 Ciudad Real';
  const phone = '926 04 27 76';
  const hours = [
    { days: 'Lunes a Jueves', hours: '12:00 PM - 12:30 AM' },
    { days: 'Viernes', hours: '12:00 PM - 2:00 AM' },
    { days: 'Sábados', hours: '11:30 AM - 2:00 AM' },
    { days: 'Domingos', hours: '11:30 AM - 12:30 AM' }
  ];

  // Custom Directions planner mock metrics (Ciudad Real points of interest)
  const calculateRoute = (e: FormEvent) => {
    e.preventDefault();
    if (!origin.trim()) return;

    // Simulate distance calculations relative to common Ciudad Real landmarks
    const lower = origin.toLowerCase();
    let distance = 1.2; // average km for Ciudad Real center
    
    if (lower.includes('uclm') || lower.includes('universidad') || lower.includes('campus')) {
      distance = 2.1;
    } else if (lower.includes('ave') || lower.includes('estacion')) {
      distance = 2.8;
    } else if (lower.includes('plaza mayor') || lower.includes('centro')) {
      distance = 0.6;
    } else if (lower.includes('larache')) {
      distance = 2.3;
    } else if (lower.includes('hospital')) {
      distance = 3.2;
    }

    // Averages:
    // Walk: 5 km/h -> 12 min per km
    // Bike: 15 km/h -> 4 min per km
    // Car: 30 km/h -> 2 min per km (adding lights)
    const walkTime = Math.ceil(distance * 12);
    const bikeTime = Math.ceil(distance * 4);
    const carTime = Math.ceil(distance * 2.5 + 3); // some extra for parking in central region

    setCalcResult({
      distance: parseFloat(distance.toFixed(1)),
      walk: walkTime,
      bike: bikeTime,
      car: carTime
    });
  };

  const handleContactSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactEmail || !contactMessage) return;

    setContactSubmitting(true);
    setTimeout(() => {
      setContactSubmitting(false);
      setContactSuccess(true);
      setContactName('');
      setContactEmail('');
      setContactMessage('');
    }, 1200);
  };

  return (
    <section id="location" className="py-24 bg-stone-950 text-stone-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-amber-500 font-mono">
            ¿Dónde encontrarnos?
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-black uppercase text-stone-100 mt-2">
            Contacto & Ubicación
          </h2>
          <p className="mt-4 text-stone-400 text-sm sm:text-base">
            Situados en pleno corazón latente de Ciudad Real, muy fácil de encontrar. Ven a disfrutar de la verdadera ambientación western. ¡Te esperamos!
          </p>
          <div className="w-16 h-1 bg-amber-500/80 mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Coordinates & Directions Estimator */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Quick cards */}
            <div className="bg-stone-900 border border-stone-850 p-6 rounded-xl space-y-5">
              <h3 className="text-lg font-serif font-bold text-stone-200 uppercase tracking-wider flex items-center space-x-2">
                <span className="w-1.5 h-6 bg-amber-500 inline-block rounded" />
                <span>Datos de Interés</span>
              </h3>

              <div className="space-y-4 text-sm">
                
                {/* MapPin */}
                <div className="flex items-start space-x-3.5">
                  <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
                    <MapPin className="w-4.5 h-4.5 text-amber-500" />
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase font-mono font-bold text-stone-500 tracking-wider">Dirección Física:</span>
                    <strong className="block text-stone-200 mt-0.5 leading-relaxed">{address}</strong>
                    <span className="text-[11px] text-stone-400 font-mono">Código Plus: X3PF+GP Ciudad Real</span>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start space-x-3.5">
                  <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
                    <Phone className="w-4.5 h-4.5 text-amber-500" />
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase font-mono font-bold text-stone-500 tracking-wider">Teléfono de Sala:</span>
                    <strong className="block text-stone-200 mt-0.5 hover:text-amber-400 transition-colors">
                      <a
                        href={getPhoneHref()}
                        onClick={(e) => {
                          if (!revealedPhone) {
                            e.preventDefault();
                            setRevealedPhone(true);
                          }
                        }}
                        title={revealedPhone ? "Llamar al bar" : "Haga clic para desofuscar y llamar"}
                        className="cursor-pointer underline decoration-amber-500/40 decoration-wavy hover:decoration-solid"
                      >
                        {getDecryptedPhone()}
                      </a>
                    </strong>
                    <span className="text-[11px] text-stone-400">¿Tienes dudas? Atendemos llamadas en horario de cocina.</span>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start space-x-3.5">
                  <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                    <MessageCircle className="w-4.5 h-4.5 text-emerald-500" />
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase font-mono font-bold text-stone-500 tracking-wider">WhatsApp Directo:</span>
                    <strong className="block text-stone-200 mt-0.5 hover:text-emerald-400 transition-colors">
                      <a
                        href={getWhatsAppHref()}
                        onClick={(e) => {
                          if (!revealedWhatsApp) {
                            e.preventDefault();
                            setRevealedWhatsApp(true);
                          }
                        }}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={revealedWhatsApp ? "Abrir chat de WhatsApp" : "Haga clic para revelar enlace seguro"}
                        className="cursor-pointer underline decoration-emerald-500/40 decoration-wavy hover:decoration-solid"
                      >
                        {getDecryptedWhatsApp()}
                      </a>
                    </strong>
                    <span className="text-[11px] text-stone-400">Canal rápido para consultas breves o modificaciones.</span>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start space-x-3.5">
                  <div className="w-9 h-9 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0">
                    <Mail className="w-4.5 h-4.5 text-blue-500" />
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase font-mono font-bold text-stone-500 tracking-wider">Email del Negocio:</span>
                    <strong className="block text-stone-200 mt-0.5 hover:text-blue-400 transition-colors">
                      <a
                        href={getEmailHref()}
                        onClick={(e) => {
                          if (!revealedEmail) {
                            e.preventDefault();
                            setRevealedEmail(true);
                          }
                        }}
                        title={revealedEmail ? "Enviar correo" : "Haga clic para mostrar correo del bar"}
                        className="cursor-pointer underline decoration-blue-500/40 decoration-wavy hover:decoration-solid"
                      >
                        {getDecryptedEmail()}
                      </a>
                    </strong>
                    <span className="text-[11px] text-stone-400">Para temas corporativos, eventos u ofertas comerciales.</span>
                  </div>
                </div>

                {/* Clock */}
                <div className="flex items-start space-x-3.5">
                  <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
                    <Clock className="w-4.5 h-4.5 text-amber-500" />
                  </div>
                  <div className="flex-grow">
                    <span className="block text-[10px] uppercase font-mono font-bold text-stone-500 tracking-wider">Horarios del Saloon:</span>
                    <div className="mt-1 space-y-1">
                      {hours.map((h, i) => (
                        <div key={i} className="flex justify-between text-xs text-stone-300">
                          <span className="font-semibold">{h.days}:</span>
                          <span className="font-mono">{h.hours}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CRO Interactive Directions Planner widget */}
            <div className="bg-stone-900 border border-stone-850 p-6 rounded-xl space-y-4">
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-stone-200 font-mono flex items-center space-x-1.5">
                  <Navigation className="w-4 h-4 text-amber-500" />
                  <span>¿A cuánto estás de nosotros?</span>
                </h4>
                <p className="text-[11px] text-stone-400 mt-1 leading-relaxed">
                  Indica desde dónde vienes de Ciudad Real para estimar tu ruta:
                </p>
              </div>

              <form onSubmit={calculateRoute} className="flex gap-2">
                <input
                  type="text"
                  placeholder="p. ej. Plaza Mayor, UCLM..."
                  value={origin}
                  onChange={(e) => setOrigin(e.target.value)}
                  className="flex-grow bg-stone-950 border border-stone-800 rounded-lg px-3 py-2 text-stone-100 placeholder-stone-600 focus:outline-none focus:border-amber-500/50 text-xs transition-all"
                />
                <button
                  type="submit"
                  className="px-3 py-2 bg-amber-600 hover:bg-amber-500 text-stone-950 font-bold text-xs uppercase tracking-wider rounded-lg transition-colors outline-none whitespace-nowrap"
                >
                  Calcular
                </button>
              </form>

              {calcResult && (
                <div className="p-3 bg-stone-950 border border-stone-800 rounded-lg space-y-2.5 text-xs animate-fadeIn">
                  <div className="flex justify-between border-b border-stone-850 pb-1.5 font-mono text-[10px] text-stone-400">
                    <span>Origen: <strong>{origin}</strong></span>
                    <span>Distancia: <strong>{calcResult.distance} km</strong></span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center text-stone-300">
                    <div className="p-1">
                      <span className="block text-[10px] text-stone-500 font-semibold uppercase">Andando</span>
                      <strong className="block text-sm text-stone-200 font-mono mt-0.5">{calcResult.walk} min</strong>
                    </div>
                    <div className="p-1 border-x border-stone-850">
                      <span className="block text-[10px] text-stone-500 font-semibold uppercase">Bici/VMP</span>
                      <strong className="block text-sm text-stone-200 font-mono mt-0.5">{calcResult.bike} min</strong>
                    </div>
                    <div className="p-1">
                      <span className="block text-[10px] text-stone-500 font-semibold uppercase">En auto</span>
                      <strong className="block text-sm text-amber-500 font-mono mt-0.5">{calcResult.car} min</strong>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Center Column: Embedded Google Maps frame map */}
          <div className="lg:col-span-5 relative group bg-stone-900 border border-stone-850 p-2.5 rounded-2xl overflow-hidden h-96 shadow-xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3106.669389977811!2d-3.9262194!3d38.9839446!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd6bc31215bb41f9%3A0xb35a9fae9d4a8e6!2sCalle%20Coraz%C3%B3n%20de%20Mar%C3%ADa%2C%201%2C%252%2013003%20Ciudad%20Real%2C%20Espa%C3%B1a!5e0!3m2!1ses!2ses!4v1700000000000!5m2!1ses!2ses"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-xl w-full h-full filter brightness-90 contrast-95 invert-[5%] hue-rotate-[180deg] saturation-120 group-hover:brightness-100 transition-all duration-300 pointer-events-auto"
            />
            
            {/* Quick indications CTA */}
            <div className="absolute bottom-4 left-4 right-4 z-10">
              <a
                href="https://maps.google.com/?q=Corazon+de+Maria+1+Ciudad+Real"
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-4 bg-amber-600 hover:bg-amber-500 text-stone-950 font-black text-xs uppercase tracking-widest rounded-lg shadow-xl inline-flex items-center justify-center space-x-2 w-full transition-colors active:scale-95"
              >
                <Navigation className="w-4 h-4 fill-current" />
                <span>Obtener Indicaciones en Maps</span>
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Quick Message / Contact Form */}
          <div className="lg:col-span-3 bg-stone-900 border border-stone-850 p-6 rounded-xl shadow-xl">
            <h3 className="text-lg font-serif font-bold text-stone-200 uppercase tracking-wider mb-4 flex items-center space-x-2">
              <Send className="w-4.5 h-4.5 text-amber-500" />
              <span>Pregúntanos</span>
            </h3>

            <AnimatePresence mode="wait">
              {!contactSuccess ? (
                <motion.form
                  key="contact-form"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleContactSubmit}
                  className="space-y-4 text-xs"
                >
                  <div className="space-y-1.5">
                    <label className="font-mono text-stone-400 uppercase font-bold tracking-wider">Tu Nombre</label>
                    <input
                      type="text"
                      required
                      placeholder="p. ej. Sofía"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full bg-stone-950 border border-stone-800 rounded-lg px-3 py-2.5 text-stone-100 placeholder-stone-600 focus:outline-none focus:border-amber-500/50 text-xs transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-mono text-stone-400 uppercase font-bold tracking-wider">Tu Email</label>
                    <input
                      type="email"
                      required
                      placeholder="sofia@ejemplo.com"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      className="w-full bg-stone-950 border border-stone-800 rounded-lg px-3 py-2.5 text-stone-100 placeholder-stone-600 focus:outline-none focus:border-amber-500/50 text-xs transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-mono text-stone-400 uppercase font-bold tracking-wider">Mensaje</label>
                    <textarea
                      required
                      placeholder="¿Deseas contratar tu fiesta temática western, catering exclusivo o menús concertados?"
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      rows={3}
                      className="w-full bg-stone-950 border border-stone-800 rounded-lg p-3 text-stone-100 placeholder-stone-600 focus:outline-none focus:border-amber-500/50 text-xs transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={contactSubmitting}
                    className="w-full py-3 bg-stone-950 hover:bg-stone-850 hover:text-amber-500 border border-stone-800 hover:border-amber-500/30 text-stone-200 font-bold uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center space-x-1.5 outline-none disabled:opacity-50"
                  >
                    {contactSubmitting ? (
                      <span>Enviando mensaje...</span>
                    ) : (
                      <>
                        <span>Enviar Mensaje</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="contact-success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-emerald-950/20 border border-emerald-800/40 p-5 rounded-lg text-center space-y-3"
                >
                  <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                  <h4 className="font-serif font-bold text-emerald-400 text-sm">¡Mensaje Enviado!</h4>
                  <p className="text-[11px] text-stone-400 leading-relaxed">
                    Muchas gracias por contactar con 26 Bar Ranch. Nuestro equipo del saloon responderá a tu petición en menos de 24 horas laborables.
                  </p>
                  <button
                    onClick={() => setContactSuccess(false)}
                    className="mt-2 text-[10px] uppercase font-mono font-bold tracking-wider text-amber-500 hover:text-amber-400 outline-none"
                  >
                    Enviar otro mensaje
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
