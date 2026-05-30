import Header from './components/Header';
import Hero from './components/Hero';
import Experience from './components/Experience';
import MenuSection from './components/MenuSection';
import ReviewsSection from './components/ReviewsSection';
import BookingSection from './components/BookingSection';
import LocationSection from './components/LocationSection';
import Footer from './components/Footer';
import BottomDock from './components/BottomDock';

export default function App() {
  return (
    <div className="bg-stone-950 text-stone-100 min-h-screen selection:bg-amber-500 selection:text-stone-950 font-sans antialiased overflow-x-hidden">
      {/* Header element */}
      <Header />

      {/* Main layout contents */}
      <main>
        {/* Hero element */}
        <Hero />

        {/* Experience details bento grids */}
        <Experience />

        {/* Interactive Menu lists */}
        <MenuSection />

        {/* Opinions and Maps reviews */}
        <ReviewsSection />

        {/* Real-time booking layout */}
        <BookingSection />

        {/* Dynamic Location planners & contact blocks */}
        <LocationSection />
      </main>

      {/* Footer & mobile sticky panel */}
      <Footer />

      {/* Floating navigation dock on mobiles */}
      <BottomDock />
    </div>
  );
}
