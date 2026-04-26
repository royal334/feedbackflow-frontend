import {
  HomepageNavbar,
  HomepageHero,
  HomepagePreview,
  HomepageStatusFlow,
  HomepageFeatures,
  HomepageCta,
  HomepageFooter,
} from "@/components/homepage";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Instrument+Serif:ital@0;1&display=swap');

        body { font-family: 'DM Sans', sans-serif; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        .fade-up  { animation: fadeUp 0.6s ease both; }
        .fade-in  { animation: fadeIn 0.8s ease both; }
        .delay-1  { animation-delay: 0.1s; }
        .delay-2  { animation-delay: 0.2s; }
        .delay-3  { animation-delay: 0.3s; }
        .delay-4  { animation-delay: 0.45s; }
        .delay-5  { animation-delay: 0.55s; }
        .hero-serif { font-family: 'Instrument Serif', serif; }
      `}</style>

      <HomepageNavbar />
      <HomepageHero />
      <HomepagePreview />
      <HomepageStatusFlow />
      <HomepageFeatures />
      <HomepageCta />
      <HomepageFooter />
    </div>
  );
}
