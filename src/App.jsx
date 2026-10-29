import React, { useState, useEffect, useRef, memo } from 'react';

// Static Data
const truffleProducts = [
  {
    name: 'Black Winter Truffle',
    species: 'Tuber melanosporum',
    origin: 'Teruel, Spain & Périgord, France',
    pricePerOz: 135,
    pricePerLb: 1850,
    season: 'November – March',
    grade: 'Extra / Grade A (30g – 100g+)',
    pairing:
      'Ideal for butter emulsions, potato purée, fresh pasta, and game reductions.',
    description:
      'The undisputed "Black Diamond" of gastronomy. Characterized by deep, complex notes of hazelnut, earthy forest floor, and rich cocoa. Essential for fine-dining winter tasting menus.',
    image: '/lens-1.jpeg',
  },
  {
    name: 'Italian White Truffle',
    species: 'Tuber magnatum pico',
    origin: 'Alba, Piedmont, Italy',
    pricePerOz: 295,
    pricePerLb: 4400,
    season: 'October – December',
    grade: 'Grade A Whole Tubers (20g – 80g)',
    pairing:
      'Best served exclusively raw, delicately shaved tableside over minimal-sauce egg pasta or fondue.',
    description:
      'The rarest and most aromatic of all truffles. Offers an intoxicating aroma of shallots, aged parmesan, and pungent earth. Served raw, delicately shaved tableside.',
    image: '/lens-2.jpeg',
  },
  {
    name: 'Burgundy / Autumn Truffle',
    species: 'Tuber uncinatum',
    origin: 'Burgundy, France & Austrian Alps',
    pricePerOz: 58,
    pricePerLb: 850,
    season: 'September – December',
    grade: 'Grade A Fresh Selects (25g – 90g)',
    pairing:
      'Exceptional for carpaccio, cream sauces, truffle butter infusion, and high-volume resort service.',
    description:
      'A robust autumn harvest featuring a hazelnut-like aroma and savory, woodland flavor profile. Exceptional value for high-volume resort dining and infused preparations.',
    image: '/lens-3.jpeg',
  },
];

const exclusiveSpecimens = [
  {
    id: 1,
    name: 'Colossal Alba White Monolith',
    species: 'Tuber magnatum pico',
    origin: 'Alba Hills, Piedmont, Italy',
    weight: '280g (9.8 oz)',
    price: '$2,850',
    certNumber: 'CERT-ALBA-2026-991',
    hunter: 'Master Hunter Giovanni & Lagotto "Rocco"',
    description:
      'Extraordinary single white truffle featuring an unblemished peridium, intense pungent aroma, and pristine density.',
    image: '/lens-2.jpeg',
  },
  {
    id: 2,
    name: 'Périgord Black Crown Clump',
    species: 'Tuber melanosporum',
    origin: 'Ancient Oak Reserve, Périgord, France',
    weight: '420g (14.8 oz)',
    price: '$1,950',
    certNumber: 'CERT-PERI-2026-442',
    hunter: 'Certified Hunter Éric (Monaco Reserve)',
    description:
      'Magnificent multi-lobed black winter specimen harvested under centuries-old holm oaks with deep forest truffle musk.',
    image: '/lens-1.jpeg',
  },
  {
    id: 3,
    name: 'Umbrian Golden Reserve Cluster',
    species: 'Tuber aestivum / uncinatum',
    origin: 'Norcia, Umbria, Italy',
    weight: '350g (12.3 oz)',
    price: '$720',
    certNumber: 'CERT-UMBR-2026-104',
    hunter: 'Truffle Hunter Marco (Appennines)',
    description:
      'Exceptional aromatic profile with rich hazelnut notes, reserved for high-end resort tasting menus and table presentations.',
    image: '/lens-3.jpeg',
  },
];

const distributionCenters = [
  { center: 'Vail', region: 'Colorado' },
  { center: 'Beaver Creek', region: 'Colorado' },
  { center: 'Avon', region: 'Colorado' },
  { center: 'Aspen', region: 'Colorado' },
  { center: 'Telluride', region: 'Colorado' },
  { center: 'Basalt', region: 'Colorado' },
  { center: 'Carbondale', region: 'Colorado' },
  { center: 'Gypsum', region: 'Colorado' },
  { center: 'Eagle', region: 'Colorado' },
];

const truffleRegions = [
  { region: 'Sarrión & Teruel', country: 'Spain' },
  { region: 'Alba & Piedmont', country: 'Italy' },
  { region: 'Périgord', country: 'France' },
  { region: 'Burgundy', country: 'France' },
  { region: 'Austrian Alps', country: 'Austria' },
  { region: 'Monaco Reserve', country: 'Monaco' },
];

const partnerRestaurants = [
  { name: 'The Little Nell', location: 'Aspen' },
  { name: 'Matsuhisa', location: 'Aspen & Vail' },
  { name: 'Element 47', location: 'Aspen' },
  { name: 'Splendido at the Chateau', location: 'Beaver Creek' },
  { name: 'Beaver Creek Chophouse', location: 'Beaver Creek' },
  { name: 'Sweet Basil', location: 'Vail Village' },
  { name: 'Mountain Standard', location: 'Vail Village' },
  { name: 'The Wildflower', location: 'Vail' },
  { name: 'Frasca Food and Wine', location: 'Boulder' },
  { name: 'Cache Cache', location: 'Aspen' },
];

// Marquee Ticker Component
const MarqueeTicker = memo(({ items, isRegion = false }) => (
  <div className="w-full max-w-6xl mx-auto overflow-hidden relative">
    <div className="absolute left-0 inset-y-0 w-16 bg-gradient-to-r from-[#080706] to-transparent z-20 pointer-events-none" />
    <div className="absolute right-0 inset-y-0 w-16 bg-gradient-to-l from-[#080706] to-transparent z-20 pointer-events-none" />

    <div className="flex items-center justify-center bg-[#13110E]/90 border border-[#C8A261]/25 py-3 px-8 overflow-hidden rounded-2xl shadow-xl backdrop-blur-md">
      <div className="animate-marquee flex items-center space-x-10 whitespace-nowrap">
        {[...items, ...items, ...items].map((item, idx) => (
          <React.Fragment key={idx}>
            <div className="inline-flex items-center space-x-3 text-xs sm:text-sm tracking-[0.3em] uppercase text-[#A39B8B]">
              <span className="text-[#E2C381] font-semibold">
                {isRegion ? item.region : item.center || item.name}
              </span>
              <span className="text-[#8B6D36]">•</span>
              <span className="text-[#CBA86B] font-light">
                {isRegion ? item.country : item.region || item.location}
              </span>
            </div>
            <span className="text-[#8B6D36]/60 text-sm">|</span>
          </React.Fragment>
        ))}
      </div>
    </div>
  </div>
));

MarqueeTicker.displayName = 'MarqueeTicker';

// Tilt Card Component
const TiltCard = memo(({ children, className = '' }) => {
  const cardRef = useRef(null);
  const rafId = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    if (rafId.current) cancelAnimationFrame(rafId.current);

    rafId.current = requestAnimationFrame(() => {
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -3;
      const rotateY = ((x - centerX) / centerX) * 3;

      cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
    });
  };

  const handleMouseLeave = () => {
    if (rafId.current) cancelAnimationFrame(rafId.current);
    if (!cardRef.current) return;
    cardRef.current.style.transform =
      'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`transition-transform duration-300 ease-out will-change-transform ${className}`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {children}
    </div>
  );
});

TiltCard.displayName = 'TiltCard';

export default function LandingPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    restaurant: '',
    phone: '',
    tier: '1 lb Weekly Trial',
    passcode: '',
  });

  const [isAuthorized, setIsAuthorized] = useState(() => {
    return sessionStorage.getItem('blackoak_auth') === 'true';
  });
  const [authError, setAuthError] = useState(false);

  const handleLogout = () => {
    setIsAuthorized(false);
    sessionStorage.removeItem('blackoak_auth');
  };

  const [selectedProduct, setSelectedProduct] = useState(0);
  const [unitSystem, setUnitSystem] = useState('imperial');
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  useEffect(() => {
    document.title = 'Black Oak Truffle Co. | Direct European Truffle Reserve';
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsLightboxOpen(false);
      }
    };
    if (isLightboxOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.passcode.trim().toUpperCase() !== 'BLACKOAK') {
      setAuthError(true);
      return;
    }

    setIsAuthorized(true);
    sessionStorage.setItem('blackoak_auth', 'true');
    setAuthError(false);
    setSubmitted(true);

    const subject = encodeURIComponent(
      `New Truffle Allocation Request - ${formData.restaurant}`,
    );
    const body = encodeURIComponent(
      `New Wholesale Inquiry / Allocation Request:\n\n` +
        `Chef / Name: ${formData.name}\n` +
        `Restaurant: ${formData.restaurant}\n` +
        `Phone Number: ${formData.phone}\n` +
        `Allocation Tier: ${formData.tier}\n\n` +
        `Black Oak Truffle Co. LLC - Direct Reserve`,
    );

    setTimeout(() => {
      window.location.href = `mailto:orders@blackoaktruffleco.com?cc=adlan.yandarbiev@blackoaktruffleco.com&subject=${subject}&body=${body}`;
    }, 400);
  };

  const activeProduct = truffleProducts[selectedProduct];

  const formatPrice = (prod) => {
    if (unitSystem === 'imperial') {
      return `$${prod.pricePerOz} / oz ($${prod.pricePerLb.toLocaleString()} / lb)`;
    } else {
      const pricePer100g = Math.round((prod.pricePerOz / 28.3495) * 100);
      const pricePerKg = Math.round(prod.pricePerLb / 0.45359237);
      return `$${pricePer100g} / 100g ($${pricePerKg.toLocaleString()} / kg)`;
    }
  };

  return (
    <div className="h-[100dvh] overflow-y-scroll snap-y snap-mandatory scroll-smooth bg-[#080706] text-[#A39B8B] font-['Cormorant'] selection:bg-[#C8A261] selection:text-black relative">
      {/* 1. Organic Truffle Peridium & Gleba Veining Texture */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-40 mix-blend-color-dodge"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160' viewBox='0 0 160 160'%3E%3Cpath d='M20 10 L50 40 L40 80 L10 60 Z' fill='%2319140E' stroke='%23C8A261' stroke-width='0.4' stroke-opacity='0.25'/%3E%3Cpath d='M50 40 L95 20 L110 65 L70 90 L40 80 Z' fill='%23120F0B' stroke='%238B6D36' stroke-width='0.5' stroke-opacity='0.2'/%3E%3Cpath d='M95 20 L140 10 L155 50 L110 65 Z' fill='%231E1812' stroke='%23C8A261' stroke-width='0.4' stroke-opacity='0.25'/%3E%3Cpath d='M10 60 L40 80 L25 130 L5 110 Z' fill='%2315110D' stroke='%23C8A261' stroke-width='0.4' stroke-opacity='0.2'/%3E%3Cpath d='M40 80 L70 90 L85 140 L35 150 L25 130 Z' fill='%23221B13' stroke='%23E2C381' stroke-width='0.5' stroke-opacity='0.3'/%3E%3Cpath d='M70 90 L110 65 L135 105 L115 145 L85 140 Z' fill='%2316120D' stroke='%23C8A261' stroke-width='0.4' stroke-opacity='0.2'/%3E%3Cpath d='M110 65 L155 50 L150 100 L135 105 Z' fill='%23261E16' stroke='%238B6D36' stroke-width='0.4' stroke-opacity='0.25'/%3E%3Cpath d='M135 105 L150 100 L155 150 L115 145 Z' fill='%2318140E' stroke='%23C8A261' stroke-width='0.4' stroke-opacity='0.2'/%3E%3Cpath d='M25 45 Q 60 70 85 55 T 140 75' fill='none' stroke='%23E2C381' stroke-width='0.6' stroke-opacity='0.22' stroke-dasharray='3 2'/%3E%3Cpath d='M15 115 Q 50 100 80 125 T 145 115' fill='none' stroke='%23C8A261' stroke-width='0.5' stroke-opacity='0.18'/%3E%3C/svg%3E")`,
          backgroundSize: '160px 160px',
        }}
      />

      {/* 2. Earthy Macro Depth Texture (Soil Noise) */}
      <div
        className="fixed inset-0 pointer-events-none z-50 opacity-[0.055] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='truffleGrain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23truffleGrain)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* 3. Luxury Terroir Vignette Illumination */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-[15%] left-1/2 -translate-x-1/2 w-[1200px] h-[700px] rounded-full bg-gradient-to-b from-[#C8A261]/[0.10] via-[#8B6D36]/[0.04] to-transparent blur-[160px]" />
        <div className="absolute top-[45%] -right-[15%] w-[600px] h-[600px] rounded-full bg-[#3D2C1A]/[0.18] blur-[140px]" />
        <div className="absolute -bottom-[20%] -left-[10%] w-[700px] h-[700px] rounded-full bg-[#2A1F13]/[0.22] blur-[150px]" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#080706]/50 to-[#080706]/95" />
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 38s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Macro Texture Inspection View"
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setIsLightboxOpen(false)}
        >
          <div className="relative max-w-4xl max-h-[90vh] w-full h-full flex flex-col items-center justify-center">
            <button
              onClick={() => setIsLightboxOpen(false)}
              aria-label="Close Lightbox"
              className="absolute top-4 right-4 text-[#E2C381] bg-[#141414] border border-[#C8A261]/50 px-4 py-2 text-xs uppercase tracking-[0.3em] hover:bg-[#C8A261]/20 transition rounded-xl cursor-pointer"
            >
              Close [Esc]
            </button>
            <img
              src={activeProduct.image}
              alt="Macro Texture Inspection"
              loading="lazy"
              decoding="async"
              className="max-w-full max-h-[80vh] object-contain rounded-3xl border border-[#C8A261]/40 shadow-2xl"
            />
            <p className="mt-4 text-xs uppercase tracking-[0.4em] text-[#CBA86B]">
              Macro Texture View • {activeProduct.name} ({activeProduct.species}
              )
            </p>
          </div>
        </div>
      )}

      {/* ================= PAGE 1: HERO ================= */}
      <div className="h-[100dvh] w-full snap-start flex flex-col justify-between relative z-10 bg-[#0A0907]/80 py-6">
        <header className="w-full bg-[#0D0B08]/85 backdrop-blur-md border-b border-[#C8A261]/20 flex-shrink-0 z-50 shadow-lg">
          <div className="max-w-[1600px] mx-auto px-6 sm:px-12 py-5 flex items-center justify-between">
            <div className="flex items-center space-x-5">
              {/* Seamless Circular Logo with Radial Mask & Screen Blend */}
              <div className="relative w-[108px] h-[108px] sm:w-[120px] sm:h-[120px] rounded-full overflow-hidden flex items-center justify-center flex-shrink-0 bg-transparent">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(200,162,97,0.18)_0%,_transparent_75%)] pointer-events-none" />
                <img
                  src="/logo.jpeg"
                  alt="Black Oak Truffle Co. Logo Emblem"
                  loading="eager"
                  decoding="async"
                  className="w-full h-full object-cover rounded-full mix-blend-screen drop-shadow-[0_4px_16px_rgba(200,162,97,0.25)] filter contrast-125 brightness-110"
                  style={{
                    maskImage:
                      'radial-gradient(circle, black 65%, transparent 98%)',
                    WebkitMaskImage:
                      'radial-gradient(circle, black 65%, transparent 98%)',
                  }}
                />
              </div>
              <div className="text-left">
                <span className="font-['Cormorant'] text-2xl sm:text-3xl font-light tracking-wide text-transparent bg-clip-text bg-gradient-to-b from-[#E2C381] via-[#C8A261] to-[#8B6D36] block leading-none">
                  Black Oak Truffle Co.
                </span>
                <span className="font-['Plus_Jakarta_Sans'] text-[9px] sm:text-[10px] uppercase tracking-[0.4em] text-[#CBA86B] font-light block mt-1.5">
                  Import & Wholesale Distribution
                </span>
              </div>
            </div>

            <nav className="flex items-center space-x-8 text-xs font-['Plus_Jakarta_Sans'] tracking-[0.3em] uppercase text-[#A39B8B]">
              <a
                href="#products"
                className="hover:text-[#E2C381] transition-colors"
              >
                Products
              </a>
              <a
                href="#vault"
                className="hover:text-[#E2C381] transition-colors"
              >
                Vault
              </a>
              {isAuthorized && (
                <button
                  onClick={handleLogout}
                  className="text-red-400 border border-red-500/40 px-3 py-1 rounded-xl hover:bg-red-500/10 transition cursor-pointer"
                >
                  Lock Portal
                </button>
              )}
              <a
                href="#contact"
                className="text-[#E2C381] border border-[#C8A261]/40 px-4 py-2 rounded-xl hover:bg-[#C8A261]/10 transition-all duration-300 shadow-[0_4px_20px_rgba(200,162,97,0.1)]"
              >
                Contact
              </a>
            </nav>
          </div>
        </header>

        {/* Hero Section Container */}
        <div className="flex-1 flex flex-col justify-center items-center px-6 py-4 w-full max-w-6xl mx-auto gap-4 my-auto -translate-y-6">
          <div className="space-y-1 text-center flex flex-col items-center justify-center drop-shadow-md">
            <p className="font-['Plus_Jakarta_Sans'] text-[10px] sm:text-xs uppercase tracking-[0.5em] text-[#CBA86B] font-light">
              Exclusive Harvest & Distribution
            </p>
            <h1 className="font-['Cormorant'] text-3xl sm:text-5xl text-[#A39B8B] font-extralight tracking-[0.06em] leading-tight">
              Direct European Truffle Reserve
            </h1>
          </div>

          <TiltCard className="w-full grid grid-cols-1 md:grid-cols-12 gap-4 h-[31vh] sm:h-[35vh]">
            <div className="md:col-span-7 h-full overflow-hidden relative p-[1px] bg-gradient-to-b from-[#C8A261]/60 via-[#C8A261]/20 to-transparent rounded-3xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95)]">
              <div className="w-full h-full relative bg-[#12100D] overflow-hidden rounded-3xl">
                <img
                  src="/hero_1.jpeg"
                  alt="Alpine Truffle Mountain Reserve"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover object-center block contrast-105 saturate-90 hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-md border border-[#C8A261]/50 px-3 py-1.5 rounded-xl text-[10px] uppercase tracking-[0.25em] text-[#E2C381] shadow-lg">
                  Alpine Reserve • Colorado & Europe
                </div>
              </div>
            </div>

            <div className="md:col-span-5 grid grid-rows-2 gap-3 h-full">
              <div className="overflow-hidden relative p-[1px] bg-gradient-to-b from-[#C8A261]/40 via-[#C8A261]/15 to-transparent rounded-2xl shadow-[0_15px_40px_-10px_rgba(0,0,0,0.9)]">
                <div className="w-full h-full relative bg-[#0D0B08] overflow-hidden rounded-2xl">
                  <img
                    src="/hero_2.jpeg"
                    alt="Preserved Reserve Jars & Marketing Items"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-center block contrast-110 hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute bottom-2 left-2.5 bg-black/75 backdrop-blur-sm border border-[#C8A261]/40 px-2 py-0.5 rounded-lg text-[9px] uppercase tracking-[0.2em] text-[#E2C381]">
                    Preserved Reserve Jars
                  </div>
                </div>
              </div>

              <div className="overflow-hidden relative p-[1px] bg-gradient-to-b from-[#C8A261]/40 via-[#C8A261]/15 to-transparent rounded-2xl shadow-[0_15px_40px_-10px_rgba(0,0,0,0.9)]">
                <div className="w-full h-full relative bg-[#0D0B08] overflow-hidden rounded-2xl">
                  <img
                    src="/hero_3.jpeg"
                    alt="Luxury Tableside Service"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-center block contrast-110 hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute bottom-2 left-2.5 bg-black/75 backdrop-blur-sm border border-[#C8A261]/40 px-2 py-0.5 rounded-lg text-[9px] uppercase tracking-[0.2em] text-[#E2C381]">
                    Tableside Reserve Service
                  </div>
                </div>
              </div>
            </div>
          </TiltCard>

          <MarqueeTicker items={distributionCenters} />
        </div>

        <div className="w-full bg-[#0E0C09] border-t border-[#C8A261]/20 py-3.5 px-6 flex-shrink-0">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between text-center sm:text-left font-['Plus_Jakarta_Sans'] gap-3 text-[10px] uppercase tracking-[0.3em] text-[#A39B8B]">
            <span>USDA APHIS Permitted & FDA Registered</span>
            <span className="hidden sm:inline text-[#8B6D36]">•</span>
            <span>48-Hr Direct Cold-Chain Air Freight</span>
            <span className="hidden sm:inline text-[#8B6D36]">•</span>
            <span>100% Wild European Certified Species</span>
          </div>
        </div>
      </div>

      {/* ================= PAGE 2: PRODUCTS CATALOG ================= */}
      <div
        id="products"
        className="h-[100dvh] w-full snap-start flex flex-col justify-between items-center px-6 sm:px-12 py-6 relative z-10 text-center bg-[#0A0907]/80 overflow-hidden"
      >
        <div className="w-full flex flex-col items-center z-10 pt-2">
          {/* Seamless Circular Logo with Radial Mask & Screen Blend */}
          <div className="relative w-[120px] h-[120px] sm:w-[144px] sm:h-[144px] rounded-full overflow-hidden flex items-center justify-center bg-transparent">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(200,162,97,0.18)_0%,_transparent_75%)] pointer-events-none" />
            <img
              src="/logo.jpeg"
              alt="Black Oak Truffle Co. Logo"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover rounded-full mix-blend-screen drop-shadow-[0_4px_16px_rgba(200,162,97,0.25)] filter contrast-125 brightness-110"
              style={{
                maskImage:
                  'radial-gradient(circle, black 65%, transparent 98%)',
                WebkitMaskImage:
                  'radial-gradient(circle, black 65%, transparent 98%)',
              }}
            />
          </div>
          <p className="text-xs uppercase tracking-[0.4em] text-[#CBA86B] font-light pt-1.5 font-['Plus_Jakarta_Sans']">
            BLACK OAK TRUFFLE CO. LLC
          </p>
        </div>

        <div className="w-full max-w-7xl mx-auto z-10 my-auto flex flex-col gap-5">
          <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-3">
            <div className="inline-flex items-center space-x-2.5 bg-[#C8A261]/15 border border-[#C8A261]/50 px-6 py-2 rounded-full text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-[#E2C381] font-['Plus_Jakarta_Sans'] font-medium shadow-[0_5px_15px_rgba(200,162,97,0.15)]">
              <span className="w-2 h-2 rounded-full bg-[#E2C381] animate-ping"></span>
              <span>Peak Season • Direct Mountain Reserve</span>
            </div>
            <div className="inline-flex items-center space-x-2 bg-[#13110E] border border-[#C8A261]/30 px-5 py-2 rounded-full text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-[#A39B8B] font-['Plus_Jakarta_Sans']">
              <span className="text-[#E2C381] font-bold">
                Bi-Weekly Harvest Flight
              </span>
              <span>Direct DEN Terminal Recovery</span>
            </div>
          </div>

          <TiltCard className="w-full">
            <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#13110E]/95 backdrop-blur-md border border-[#C8A261]/35 p-6 sm:p-10 rounded-3xl shadow-[0_30px_70px_-15px_rgba(0,0,0,0.95)] text-left relative">
              <div
                onClick={() => setIsLightboxOpen(true)}
                className="lg:col-span-5 relative h-[320px] sm:h-[420px] overflow-hidden border border-[#C8A261]/40 rounded-2xl bg-[#080706] cursor-pointer group shadow-2xl"
              >
                <img
                  src={activeProduct.image}
                  alt={activeProduct.name}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover filter contrast-110 brightness-95 group-hover:scale-105 transition-transform duration-700 rounded-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent pointer-events-none rounded-2xl" />
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="text-xs sm:text-sm font-['Plus_Jakarta_Sans'] uppercase tracking-[0.3em] text-[#CBA86B] block mb-1">
                    {activeProduct.species}
                  </span>
                  <span className="font-['Cormorant'] text-xl sm:text-2xl text-[#A39B8B]">
                    {activeProduct.origin}
                  </span>
                </div>
              </div>

              <div className="lg:col-span-7 flex flex-col justify-between space-y-4 font-['Plus_Jakarta_Sans']">
                <div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#C8A261]/20 pb-4">
                    <div>
                      <h4 className="font-['Cormorant'] text-3xl sm:text-4xl text-[#E2C381] font-normal">
                        {activeProduct.name}
                      </h4>
                      <div className="flex items-center space-x-3 mt-1.5 text-[11px] text-[#A39B8B] uppercase tracking-[0.2em]">
                        <span>Season: {activeProduct.season}</span>
                        <span>•</span>
                        <span className="text-[#C8A261]">
                          {activeProduct.grade}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 bg-[#080706] border border-[#C8A261]/40 p-1 rounded-xl shadow-inner">
                      <button
                        onClick={() => setUnitSystem('imperial')}
                        className={`px-3 py-1.5 text-[10px] uppercase tracking-wider transition rounded-lg cursor-pointer ${
                          unitSystem === 'imperial'
                            ? 'bg-[#C8A261] text-black font-semibold shadow-md'
                            : 'text-[#A39B8B] hover:text-[#E2C381]'
                        }`}
                      >
                        Imperial [oz/lb]
                      </button>
                      <button
                        onClick={() => setUnitSystem('metric')}
                        className={`px-3 py-1.5 text-[10px] uppercase tracking-wider transition rounded-lg cursor-pointer ${
                          unitSystem === 'metric'
                            ? 'bg-[#C8A261] text-black font-semibold shadow-md'
                            : 'text-[#A39B8B] hover:text-[#E2C381]'
                        }`}
                      >
                        Metric [g/kg]
                      </button>
                    </div>
                  </div>

                  <div className="mt-4">
                    <span className="text-base sm:text-lg font-semibold text-[#A39B8B] bg-[#C8A261]/15 px-4.5 py-2 border border-[#C8A261]/40 rounded-xl inline-block shadow-sm">
                      {formatPrice(activeProduct)}
                    </span>
                  </div>

                  <p className="text-sm sm:text-base text-[#A39B8B] font-light leading-relaxed pt-3">
                    {activeProduct.description}
                  </p>

                  <div className="mt-4 pt-4 border-t border-[#C8A261]/10 text-xs sm:text-sm text-[#A39B8B] font-light italic">
                    <span className="text-[#C8A261] uppercase tracking-[0.2em] not-italic text-[11px] font-medium mr-2">
                      Pairing:
                    </span>
                    {activeProduct.pairing}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 pt-2">
                  {truffleProducts.map((prod, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedProduct(idx)}
                      className={`px-4.5 py-3 border text-left transition-all duration-300 rounded-2xl cursor-pointer ${
                        selectedProduct === idx
                          ? 'bg-[#C8A261]/20 border-[#C8A261] text-[#A39B8B] shadow-lg transform -translate-y-0.5'
                          : 'bg-[#080706] border-[#333333] text-[#A39B8B] hover:border-[#C8A261]/40'
                      }`}
                    >
                      <span className="text-[11px] uppercase tracking-[0.2em] block font-medium truncate">
                        0{idx + 1}. {prod.name.split(' ')[0]}
                      </span>
                      <span className="text-[10px] text-[#CBA86B] block truncate mt-1">
                        {unitSystem === 'imperial'
                          ? `$${prod.pricePerOz} / oz`
                          : `$${Math.round((prod.pricePerOz / 28.3495) * 100)} / 100g`}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </TiltCard>

          <MarqueeTicker items={truffleRegions} isRegion={true} />
        </div>

        <div className="w-full bg-[#0E0C09] border-t border-[#C8A261]/20 py-3.5 px-6 flex-shrink-0 z-10">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between text-[10px] uppercase tracking-[0.3em] text-[#A39B8B] font-['Plus_Jakarta_Sans'] gap-3">
            <span>USDA APHIS Permit #L-00142270 Verified</span>
            <span className="hidden sm:inline text-[#8B6D36]">•</span>
            <span>FDA Prior Notice PN-7201 Compliant</span>
            <span className="hidden sm:inline text-[#8B6D36]">•</span>
            <span>Direct Denver International (DEN) Entry</span>
          </div>
        </div>
      </div>

      {/* ================= PAGE 3: THE PRIVATE RESERVE VAULT ================= */}
      <div
        id="vault"
        className="h-[100dvh] w-full snap-start flex flex-col justify-between items-center px-6 sm:px-12 py-6 relative z-10 text-center bg-[#0A0907]/80 overflow-hidden"
      >
        <div className="w-full flex flex-col items-center z-10 pt-2 space-y-2">
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.5em] text-[#CBA86B] font-light font-['Plus_Jakarta_Sans']">
            Museum-Grade Single Harvests
          </p>
          <h3 className="font-['Cormorant'] text-3xl sm:text-4xl text-[#E2C381] font-normal tracking-wide">
            The Private Reserve Vault
          </h3>

          {/* Seamless Circular Logo with Radial Mask & Screen Blend */}
          <div className="relative w-[120px] h-[120px] sm:w-[144px] sm:h-[144px] rounded-full overflow-hidden flex items-center justify-center my-1 bg-transparent">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(200,162,97,0.18)_0%,_transparent_75%)] pointer-events-none" />
            <img
              src="/logo.jpeg"
              alt="Black Oak Truffle Co. Logo"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover rounded-full mix-blend-screen drop-shadow-[0_4px_16px_rgba(200,162,97,0.25)] filter contrast-125 brightness-110"
              style={{
                maskImage:
                  'radial-gradient(circle, black 65%, transparent 98%)',
                WebkitMaskImage:
                  'radial-gradient(circle, black 65%, transparent 98%)',
              }}
            />
          </div>
          <p className="text-[10px] uppercase tracking-[0.4em] text-[#CBA86B] font-light font-['Plus_Jakarta_Sans']">
            BLACK OAK TRUFFLE CO. LLC
          </p>

          <p className="font-['Plus_Jakarta_Sans'] text-xs sm:text-sm text-[#A39B8B]/80 max-w-2xl mx-auto font-light leading-relaxed pt-6 sm:pt-8">
            Reserved exclusively for Michelin-starred establishments and elite
            resort tasting menus. Each colossal specimen is individually
            cataloged, wild-harvested by master hunters, and flown direct via
            cold-chain reserve.
          </p>
        </div>

        <div className="w-full max-w-7xl mx-auto z-10 my-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {exclusiveSpecimens.map((spec) => (
              <TiltCard key={spec.id}>
                <div className="bg-[#13110E]/95 backdrop-blur-md border border-[#C8A261]/30 p-5 rounded-3xl shadow-[0_20px_40px_-10px_rgba(0,0,0,0.8)] text-left flex flex-col justify-between hover:border-[#C8A261] hover:shadow-[0_30px_60px_-10px_rgba(200,162,97,0.2)] transition-all duration-500 relative h-full">
                  <div>
                    <div className="relative h-[140px] sm:h-[150px] overflow-hidden border border-[#C8A261]/30 rounded-2xl mb-3 bg-[#080706] shadow-inner">
                      <img
                        src={spec.image}
                        alt={spec.name}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover filter contrast-110 rounded-2xl"
                      />
                      <div className="absolute top-2.5 right-2.5 bg-black/90 border border-[#C8A261]/50 px-2.5 py-0.5 rounded-full text-[9px] uppercase tracking-[0.2em] text-[#E2C381] shadow">
                        {spec.weight}
                      </div>
                    </div>

                    <span className="text-[9px] uppercase tracking-[0.3em] text-[#CBA86B] block mb-1 font-['Plus_Jakarta_Sans']">
                      {spec.certNumber}
                    </span>
                    <h4 className="font-['Cormorant'] text-xl sm:text-2xl text-[#E2C381] font-normal leading-tight mb-1.5">
                      {spec.name}
                    </h4>
                    <p className="text-xs sm:text-[13px] text-[#A39B8B] font-['Plus_Jakarta_Sans'] font-light leading-relaxed mb-3">
                      {spec.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#C8A261]/20 font-['Plus_Jakarta_Sans'] flex items-center justify-between">
                    <div>
                      <span className="text-[9px] text-[#A39B8B]/70 block uppercase tracking-wider">
                        Reserve Price
                      </span>
                      <span className="text-base font-semibold text-[#E2C381]">
                        {spec.price}
                      </span>
                    </div>
                    {isAuthorized ? (
                      <a
                        href={`sms:9188525701?body=Inquiry%20regarding%20Private%20Reserve%20Vault%20Lot%20${spec.id}:%20${encodeURIComponent(spec.name)}`}
                        className="px-3 py-2 bg-[#C8A261]/20 border border-[#C8A261]/50 text-[#E2C381] hover:bg-[#C8A261]/30 rounded-xl text-[10px] font-semibold uppercase tracking-[0.2em] transition shadow-md"
                      >
                        🔒 Reserve
                      </a>
                    ) : (
                      <a
                        href="#contact"
                        className="px-3 py-2 bg-[#1A1A1A] border border-[#333333] text-neutral-400 hover:text-[#E2C381] rounded-xl text-[9px] uppercase tracking-[0.2em] transition"
                        title="Partner login required on Page 4 to reserve"
                      >
                        🔒 Partner Lock
                      </a>
                    )}
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>

        <div className="w-full bg-[#0E0C09] border-t border-[#C8A261]/20 py-3.5 px-6 flex-shrink-0 z-10">
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#CBA86B] font-['Plus_Jakarta_Sans']">
            Private Vault lots are allocated on a first-in-inquiry basis for
            executive resort chefs.
          </p>
        </div>
      </div>

      {/* ================= PAGE 4: CONTACT & ALLOCATION FORM ================= */}
      <div
        id="contact"
        className="h-[100dvh] w-full snap-start flex flex-col justify-between items-center px-6 sm:px-12 py-6 relative z-10 text-center bg-[#0A0907]/80"
      >
        <div className="flex-1 flex flex-col justify-center items-center w-full max-w-6xl mx-auto my-auto gap-6">
          <div className="w-full bg-[#13110E]/95 backdrop-blur-md border border-[#C8A261]/35 p-8 sm:p-12 rounded-3xl shadow-[0_30px_90px_rgba(0,0,0,0.95)] relative transform hover:-translate-y-1 transition-all duration-500">
            {!submitted ? (
              <form
                onSubmit={handleSubmit}
                className="space-y-6 text-left font-['Plus_Jakarta_Sans'] text-base"
              >
                <div className="text-center space-y-2 mb-6">
                  <p className="font-['Plus_Jakarta_Sans'] text-[10px] sm:text-xs uppercase tracking-[0.4em] text-[#CBA86B] font-light">
                    Direct Resort Culinary Access
                  </p>
                  <h2 className="font-['Cormorant'] text-3xl sm:text-4xl text-[#A39B8B] font-normal tracking-wide">
                    Secure Your Weekly Truffle Allocation
                  </h2>
                  <p className="font-['Plus_Jakarta_Sans'] text-xs sm:text-sm text-[#A39B8B]/80 max-w-2xl mx-auto font-light leading-relaxed">
                    Complete your wholesale allocation request below.
                    Submissions require partner authentication code{' '}
                    <span className="text-[#C8A261]">
                      (Demo Code: BLACKOAK)
                    </span>
                    .
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="chef-name"
                      className="block text-[11px] uppercase tracking-[0.2em] text-[#A39B8B] mb-1.5 font-light"
                    >
                      Executive Chef / Name
                    </label>
                    <input
                      id="chef-name"
                      type="text"
                      required
                      className="w-full bg-[#080706] border border-[#333333] px-4 py-3 rounded-2xl text-white text-sm focus:outline-none focus:ring-1 focus:ring-[#C8A261] transition shadow-inner"
                      placeholder="Chef Name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="restaurant-name"
                      className="block text-[11px] uppercase tracking-[0.2em] text-[#A39B8B] mb-1.5 font-light"
                    >
                      Restaurant / Establishment
                    </label>
                    <input
                      id="restaurant-name"
                      type="text"
                      required
                      className="w-full bg-[#080706] border border-[#333333] px-4 py-3 rounded-2xl text-white text-sm focus:outline-none focus:ring-1 focus:ring-[#C8A261] transition shadow-inner"
                      placeholder="Resort / Restaurant Name"
                      value={formData.restaurant}
                      onChange={(e) =>
                        setFormData({ ...formData, restaurant: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="phone-number"
                      className="block text-[11px] uppercase tracking-[0.2em] text-[#A39B8B] mb-1.5 font-light"
                    >
                      Phone Number
                    </label>
                    <input
                      id="phone-number"
                      type="tel"
                      required
                      className="w-full bg-[#080706] border border-[#333333] px-4 py-3 rounded-2xl text-white text-sm focus:outline-none focus:ring-1 focus:ring-[#C8A261] transition shadow-inner"
                      placeholder="918-852-5701"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="allocation-tier"
                      className="block text-[11px] uppercase tracking-[0.2em] text-[#A39B8B] mb-1.5 font-light"
                    >
                      Weekly Allocation Tier
                    </label>
                    <select
                      id="allocation-tier"
                      className="w-full bg-[#080706] border border-[#333333] px-4 py-3 rounded-2xl text-white text-sm focus:outline-none focus:ring-1 focus:ring-[#C8A261] transition cursor-pointer shadow-inner"
                      value={formData.tier}
                      onChange={(e) =>
                        setFormData({ ...formData, tier: e.target.value })
                      }
                    >
                      <option value="1 lb Weekly Trial">
                        1 lb Weekly Trial
                      </option>
                      <option value="2-5 lbs Weekly">
                        2 – 5 lbs Weekly Reserve
                      </option>
                      <option value="Custom High-Volume">
                        Custom High-Volume Resort
                      </option>
                    </select>
                  </div>
                </div>

                <div className="bg-[#080706] border border-[#C8A261]/30 p-4 rounded-2xl space-y-2 shadow-inner">
                  <label
                    htmlFor="partner-passcode"
                    className="block text-[11px] uppercase tracking-[0.2em] text-[#E2C381] font-light"
                  >
                    🔒 Partner Authentication Code Required to Order
                  </label>
                  <input
                    id="partner-passcode"
                    type="password"
                    required
                    className="w-full bg-black border border-[#333333] px-4 py-2.5 rounded-xl text-white text-sm tracking-widest focus:outline-none focus:ring-1 focus:ring-[#C8A261] transition"
                    placeholder="Enter Code (BLACKOAK)"
                    value={formData.passcode}
                    onChange={(e) =>
                      setFormData({ ...formData, passcode: e.target.value })
                    }
                  />
                  {authError && (
                    <p className="text-xs text-red-400 tracking-wider">
                      Incorrect passcode. Contact dispatch at +1 (918) 852-5701.
                    </p>
                  )}
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-[#C8A261] via-[#E2C381] to-[#8B6D36] text-black font-semibold uppercase tracking-[0.2em] py-3.5 rounded-2xl hover:brightness-110 transition duration-300 shadow-xl cursor-pointer text-sm transform hover:-translate-y-0.5"
                  >
                    Request Fresh Allocation
                  </button>
                  <a
                    href="mailto:orders@blackoaktruffleco.com?subject=Wholesale%20Inquiry%20from%20Website"
                    className="px-5 py-3.5 bg-[#141414] border border-[#C8A261]/50 text-[#E2C381] hover:bg-[#C8A261]/10 rounded-2xl text-xs font-semibold uppercase tracking-[0.2em] transition text-center flex items-center justify-center shadow-md"
                  >
                    ✉️ Email Desk
                  </a>
                  <a
                    href={`sms:9188525701?body=${encodeURIComponent(
                      `Inquiry from ${formData.name || 'Chef'} at ${formData.restaurant || 'Restaurant'} regarding ${formData.tier}`,
                    )}`}
                    className="px-5 py-3.5 bg-[#141414] border border-[#C8A261]/50 text-[#E2C381] hover:bg-[#C8A261]/10 rounded-2xl text-xs font-semibold uppercase tracking-[0.2em] transition text-center flex items-center justify-center shadow-md"
                  >
                    💬 Text Dispatch
                  </a>
                  <a
                    href="tel:9188525701"
                    className="px-5 py-3.5 border border-[#C8A261]/50 text-[#E2C381] hover:bg-[#C8A261]/10 rounded-2xl text-xs font-semibold uppercase tracking-[0.2em] transition text-center flex items-center justify-center shadow-md"
                  >
                    📞 Call Direct
                  </a>
                </div>
              </form>
            ) : (
              <div className="py-8 text-center space-y-4">
                <p className="text-[#E2C381] text-3xl font-['Cormorant']">
                  Allocation Request Received.
                </p>
                <p className="text-sm sm:text-base text-[#A39B8B] font-['Plus_Jakarta_Sans'] leading-relaxed font-light max-w-lg mx-auto">
                  Thank you, Chef {formData.name}. Our dispatch team at Black
                  Oak Truffle Co. will contact you immediately regarding your{' '}
                  {formData.tier} for {formData.restaurant}.
                </p>
                <p className="text-xs uppercase tracking-[0.3em] text-[#C8A261] pt-2 font-medium">
                  Direct Dispatch / Text: +1 (918) 852-5701 •
                  orders@blackoaktruffleco.com
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-3 text-xs uppercase tracking-widest text-[#E2C381] border border-[#C8A261]/40 px-5 py-2 rounded-xl hover:bg-[#C8A261]/10 transition cursor-pointer"
                >
                  ← Submit Another Inquiry
                </button>
              </div>
            )}
          </div>

          <MarqueeTicker items={partnerRestaurants} />
        </div>

        <div className="flex flex-col items-center space-y-1.5 font-['Plus_Jakarta_Sans'] mb-4">
          {/* Seamless Circular Logo with Radial Mask & Screen Blend */}
          <div className="relative w-[120px] h-[120px] sm:w-[144px] sm:h-[144px] rounded-full overflow-hidden flex items-center justify-center pt-1 bg-transparent">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(200,162,97,0.18)_0%,_transparent_75%)] pointer-events-none" />
            <img
              src="/logo.jpeg"
              alt="Black Oak Truffle Co. Logo"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover rounded-full mix-blend-screen drop-shadow-[0_4px_16px_rgba(200,162,97,0.25)] filter contrast-125 brightness-110"
              style={{
                maskImage:
                  'radial-gradient(circle, black 65%, transparent 98%)',
                WebkitMaskImage:
                  'radial-gradient(circle, black 65%, transparent 98%)',
              }}
            />
          </div>
          <p className="text-[10px] uppercase tracking-[0.4em] text-[#CBA86B] font-light">
            Black Oak Truffle Co. LLC
          </p>
        </div>

        <footer className="w-full max-w-[1400px] mx-auto pt-2 pb-2 border-t border-[#C8A261]/20 flex flex-col md:flex-row items-center justify-between text-[11px] font-['Plus_Jakarta_Sans'] text-[#A39B8B] tracking-widest uppercase flex-shrink-0 bg-transparent gap-4">
          <div className="text-center md:text-left">
            <p className="text-[#E2C381] font-light tracking-[0.2em]">
              Black Oak Truffle Co. LLC
            </p>
            <p className="text-[9px] text-[#A39B8B]/60 mt-0.5">
              Direct Reserve • Eagle County, Colorado
            </p>
          </div>

          <div className="flex items-center space-x-5 text-[10px] flex-wrap justify-center">
            <a
              href="https://www.aphis.usdata.gov"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#E2C381] transition-colors"
            >
              USDA APHIS L-00142270
            </a>
            <span>•</span>
            <a
              href="mailto:orders@blackoaktruffleco.com"
              className="hover:text-[#E2C381] transition-colors"
            >
              orders@blackoaktruffleco.com
            </a>
            <span>•</span>
            <a
              href="tel:9188525701"
              className="hover:text-[#E2C381] transition-colors"
            >
              Dispatch: +1 (918) 852-5701
            </a>
          </div>

          <div className="text-center md:text-right text-[10px] text-[#A39B8B]/60">
            <p>© {new Date().getFullYear()} All Rights Reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
