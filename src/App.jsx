import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Plane, Coffee, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Howl } from 'howler';

import Aurora from './Aurora';
import CircularGallery from './CircularGallery';
import MagneticButton from './MagneticButton';
import EvasiveButton from './EvasiveButton';
import BlurText from './BlurText';
import ScrollReveal from './ScrollReveal';

// Direct high-quality images for the gallery
const galleryItems = [
  { src: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=800&q=80', alt: 'Tokyo Scenery', title: 'Senso-ji Temple' },
  { src: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=800&q=80', alt: 'Tokyo Street', title: 'Shibuya Night' },
  { src: 'https://images.unsplash.com/photo-1551641506-ee5bf4cb45f1?auto=format&fit=crop&w=800&q=80', alt: 'Haneda Airport', title: 'Arrival at Haneda' },
  { src: 'https://images.unsplash.com/photo-1555505012-1c49b6ce8341?auto=format&fit=crop&w=800&q=80', alt: 'Japanese Cafe', title: 'Reserved for You' },
  { src: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80', alt: 'Kyoto/Tokyo Garden', title: 'Quiet Moments' },
];

// Stability: Module-scoped variable to prevent multiple instances during HMR
let globalMusic = null;

const App = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [tokyoTime, setTokyoTime] = useState('');
  const [isAccepted, setIsAccepted] = useState(false);
  const [showAnniversaryModal, setShowAnniversaryModal] = useState(false);
  const [showPleaModal, setShowPleaModal] = useState(false);
  const [bgMusic, setBgMusic] = useState(null);
  const slide3ScrollRef = useRef(null);

  // Japan Time Widget Logic
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = { timeZone: 'Asia/Tokyo', hour: '2-digit', minute: '2-digit', hour12: false };
      setTokyoTime(now.toLocaleTimeString('en-US', options));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Initialize Audio
  useEffect(() => {
    if (!globalMusic) {
      globalMusic = new Howl({
        src: ['/vierra.mp3'],
        loop: true,
        volume: 0,
        html5: false, // Use Web Audio to avoid pool exhaustion
        onload: () => console.log("🎵 Music loaded successfully"),
        onplay: () => console.log("🎵 Music started playing"),
        onloaderror: (id, err) => console.error("❌ Music load error:", err),
        onplayerror: (id, err) => {
          console.error("⚠️ Play error:", err);
          globalMusic.once('unlock', () => globalMusic.play());
        }
      });
    }
    setBgMusic(globalMusic);
  }, []);

  const handleNext = () => {
    // More aggressive play trigger: Attempt playback on any early interaction
    if (bgMusic && !bgMusic.playing()) {
      console.log("🎵 User interacted, attempting playback...");
      bgMusic.play();
      bgMusic.fade(0, 0.5, 3000); // Fade in over 3 seconds
    }

    if (slideIndex < 7) {
      setSlideIndex(prev => prev + 1);
    }
  };

  const handleYes = () => {
    setIsAccepted(true);

    // Trigger Confession Confetti
    const end = Date.now() + 3 * 1000;
    const colors = ['#bb0000', '#ffffff', '#b76e79', '#ffccdf'];

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());

    // Music: Boost volume on 'YES' click to celebrate
    if (bgMusic && bgMusic.playing()) {
      bgMusic.fade(0.4, 0.7, 2000); // Gradual build-up for the big reveal
    } else if (bgMusic) {
      bgMusic.play();
      bgMusic.fade(0, 0.7, 3000);
    }

    // Show Anniversary Pop-up
    setTimeout(() => {
      setShowAnniversaryModal(true);
    }, 1500);
  };

  const slideVariants = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
    exit: { opacity: 0, y: -30, transition: { duration: 0.5 } }
  };

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden font-sans text-white selection:bg-rose-500/30">
      <Aurora
        id="aurora-bg"
        colorStops={["#7cff67", "#B19EEF", "#5227FF"]}
        blend={1.0}
        amplitude={2.5}
        speed={1.0}
      />

      {/* Primary Content Container */}

      {/* Japan Time Widget - Luxury Glassmorphism */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-8 right-8 z-50 flex items-center gap-4 backdrop-blur-xl bg-white/[0.03] border border-white/10 px-6 py-3 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
      >
        <div className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500"></span>
        </div>
        <p className="text-xs font-light tracking-[0.15em] text-white uppercase">
          Shoji <span className="text-white font-medium ml-2">{tokyoTime}</span>
          <span className="hidden md:inline ml-3 border-l border-white/20 pl-3 italic lowercase normal-case tracking-normal text-white">"aku masih memikirkanmu"</span>
        </p>
      </motion.div>

      {/* Main Content Area */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center max-w-6xl mx-auto px-8">
        <AnimatePresence mode="wait">

          {/* Slide 0: Intro Greeting */}
          {slideIndex === 0 && (
            <motion.div
              key="intro"
              variants={slideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="text-center group cursor-pointer"
              onClick={handleNext}
            >
              <motion.p
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-rose-200 text-sm tracking-[0.8em] uppercase mb-8"
              >
                Special for
              </motion.p>
              <h1 className="text-4xl md:text-7xl font-light tracking-tight">
                <span className="text-pressure block opacity-90"> Putri Ayesha</span>
                <span className="font-serif italic text-rose-200/90 ml-4">Zakee Alifia</span>
              </h1>
              <motion.div
                animate={{ opacity: [0.3, 0.8, 0.3] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="mt-20 text-white/40 text-[10px] tracking-[0.5em] uppercase"
              >
                Ketuk untuk Memulai
              </motion.div>
            </motion.div>
          )}

          {/* New Slide 1: Transition Message */}
          {slideIndex === 1 && (
            <motion.div
              key="slide-made"
              variants={slideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="text-center group cursor-pointer"
              onClick={handleNext}
            >
              <div className="text-3xl md:text-6xl font-light tracking-tight flex flex-col items-center gap-4">
                <BlurText
                  text="Just a little something"
                  delay={100}
                  className="text-white mb-2 uppercase text-sm tracking-[0.4em]"
                />
                <BlurText
                  text="i made something for you"
                  delay={150}
                  className="font-serif italic text-rose-200"
                />
              </div>
              <motion.div
                animate={{ opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 2.5, repeat: Infinity }}
                className="mt-16 text-white/30 text-[10px] tracking-[0.3em] uppercase"
              >
                Klik untuk melihat
              </motion.div>
            </motion.div>
          )}

          {/* Slide 2: The Hook */}
          {slideIndex === 2 && (
            <motion.div
              key="slide1"
              variants={slideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="text-center group cursor-pointer"
              onClick={handleNext}
            >
              <div className="text-4xl md:text-7xl font-light leading-[1.1] max-w-4xl mx-auto tracking-tight flex flex-col items-center gap-6">
                <BlurText
                  text="Satu tahun di Jepang,"
                  delay={100}
                  className="text-pressure opacity-80"
                />
                <BlurText
                  text="aku belajar bahwa kota semegah Tokyo pun..."
                  delay={150}
                  className="font-serif italic italic text-rose-100/90"
                />
                <BlurText
                  text="bisa terasa sepi tanpa seseorang untuk berbagi cerita."
                  delay={200}
                  className="mt-2 text-white/90"
                />
              </div>
              <motion.div
                animate={{ opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="mt-16 text-white/40 text-[10px] tracking-[0.4em] uppercase"
              >
                Sentuh layar
              </motion.div>
            </motion.div>
          )}

          {/* Slide 3: The Bridge (Scroll Reveal Box) */}
          {slideIndex === 3 && (
            <motion.div
              key="slide2"
              variants={slideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full h-full flex flex-col items-center justify-center px-4 relative z-10"
            >
              {/* Slide 3 Title */}
              <div className="mb-8 text-center pt-8 md:pt-0">
                <BlurText
                  text="Lalu Aku Mengenalmu."
                  delay={100}
                  className="text-3xl md:text-6xl font-light text-white/90 tracking-wide"
                />
              </div>

              {/* Confined Scrollable Container (Wider and Taller) */}
              <div
                ref={slide3ScrollRef}
                className="w-full max-w-[650px] h-[320px] overflow-y-auto custom-scrollbar pr-6 text-left border border-white/10 bg-black/40 backdrop-blur-xl rounded-2xl p-8 shadow-2xl flex flex-col items-center"
              >
                <ScrollReveal
                  scrollContainerRef={slide3ScrollRef}
                  baseOpacity={0.7}
                  enableBlur
                  baseRotation={2}
                  blurStrength={9}
                  containerClassName="text-white/90"
                >
                  Satu tahun di Jepang bukan waktu yang singkat untuk dijalani sendiri. Aku terbiasa dengan stasiun yang padat, kereta yang tepat waktu, dan dingin yang kadang terasa menggigit. Jepang itu indah, tapi jujur, seringkali terasa hampa.

                  Sampai suatu hari, namamu muncul dalam hidupku.

                  Awalnya hanya sebuah perkenalan sederhana, lalu tumbuh menjadi obrolan-obrolan kecil yang perlahan mengisi kekosongan di sini. Lucu rasanya, bagaimana seseorang yang jaraknya ribuan kilometer dariku, bisa membuat hari-hariku di negeri asing ini terasa jauh lebih hangat. Aku mulai membayangkan, bagaimana jadinya jika langkah-langkahmu benar-benar sampai di sini nanti...
                </ScrollReveal>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNext}
                className="mt-8 px-10 py-4 rounded-full border border-white/40 text-white/80 hover:text-white hover:bg-white/10 transition-all duration-300 tracking-[0.3em] text-xs uppercase backdrop-blur-sm"
              >
                Lanjutkan
              </motion.button>
            </motion.div>
          )}

          {/* Slide 4: Circular Gallery */}
          {slideIndex === 4 && (
            <motion.div
              key="slide3"
              variants={slideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full h-full flex flex-col items-center justify-center pt-12"
            >
              <div className="mb-4 text-center">
                <BlurText
                  text="CANTIKMU"
                  delay={200}
                  animateBy="chars"
                  className="text-xl md:text-3xl font-light tracking-[0.3em] text-white"
                />
                <div className="h-px w-24 bg-gradient-to-r from-transparent via-rose-500 to-transparent mx-auto mt-4"></div>
              </div>

              <div style={{ height: '500px', width: '100%', position: 'relative' }}>
                <CircularGallery
                  items={[
                    { image: '/photo1.jpg', text: '' },
                    { image: '/photo2.jpg', text: '' },
                    { image: '/photo3.jpg', text: '' },
                    { image: '/photo4.jpg', text: '' }
                  ]}
                  bend={1}
                  textColor="#ffffff"
                  borderRadius={0.05}
                  scrollSpeed={2}
                  scrollEase={0.05}
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.1)' }}
                whileTap={{ scale: 0.98 }}
                onClick={handleNext}
                className="mt-4 px-10 py-3 rounded-full border border-white/20 text-white/60 hover:text-white transition-all duration-500 tracking-[0.3em] text-[10px] uppercase backdrop-blur-sm"
              >
                Selanjutnya
              </motion.button>
            </motion.div>
          )}
          {/* Slide 5 (Core Confession) */}
          {slideIndex === 5 && (
            <motion.div
              key="slide4"
              variants={slideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="relative text-center max-w-4xl space-y-12"
              onClick={handleNext}
            >
              <div className="relative z-10 flex justify-center mb-4">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <MapPin size={40} className="text-rose-400/50" strokeWidth={1} />
                </motion.div>
              </div>
              <div className="relative z-10 text-2xl md:text-5xl font-light leading-[1.4] cursor-pointer px-4 flex flex-col items-center gap-6">
                <BlurText
                  text="Aku tidak ingin hanya menyambutmu sebagai teman di Negeri Sakura ini."
                  delay={100}
                  className="text-white/90"
                />

                <div className="flex flex-wrap justify-center items-center">
                  <BlurText
                    text="Aku ingin menjadi alasan kenapa kamu merasa"
                    delay={100}
                    className="mr-2 text-white/90"
                  />
                  <BlurText
                    text="'pulang'"
                    delay={150}
                    className="font-serif italic text-rose-200 mx-2"
                  />
                  <BlurText
                    text="saat menapakkan kaki di negeri ini."
                    delay={100}
                    className="text-white/90"
                  />
                </div>

                <BlurText
                  text="Rumah bukan lagi tentang koordinat, tapi tentang di mana kamu berada."
                  delay={50}
                  className="text-white/60 mt-4 text-xl md:text-3xl"
                />
              </div>
              <p className="relative z-10 text-white/10 text-[10px] tracking-[0.5em] uppercase">Sentuh untuk melangkah lebih jauh</p>
            </motion.div>
          )}

          {/* New Slide 6: Pre-Proposal */}
          {slideIndex === 6 && (
            <motion.div
              key="slide-terlalu-lama"
              variants={slideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="text-center group cursor-pointer"
              onClick={handleNext}
            >
              <div className="text-4xl md:text-7xl font-light tracking-wide leading-tight flex flex-col items-center gap-4">
                <BlurText
                  text="Aku sudah terlalu lama"
                  delay={150}
                  className="text-white/90"
                />
                <BlurText
                  text="menyimpan rasa ini..."
                  delay={200}
                  className="font-serif italic text-rose-200"
                />
              </div>
              <motion.div
                animate={{ opacity: [0.4, 0.8, 0.4] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="mt-16 text-white/30 text-[10px] tracking-[0.5em] uppercase border border-white/10 inline-block px-6 py-2 rounded-full"
              >
                Ketuk untuk melangkah lebih jauh
              </motion.div>
            </motion.div>
          )}

          {/* Slide 7 (The Proposal) */}
          {slideIndex === 7 && (
            <motion.div
              key="slide7"
              variants={slideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="text-center w-full max-w-5xl"
            >
              {!isAccepted ? (
                <div className="space-y-20">
                  <h2
                    className="text-4xl md:text-9xl font-light tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/20 mx-auto"
                    style={{ textShadow: '0 0 40px rgba(255, 255, 255, 0.1)' }}
                  >
                    Will you be mine?
                  </h2>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-12 md:gap-24 pt-8 min-h-[160px]">
                    <MagneticButton onClick={handleYes} className="text-xl md:text-3xl px-16 py-6 z-20 font-light tracking-[0.2em]">
                      YES ❤️
                    </MagneticButton>

                    <EvasiveButton
                      maxEvasions={8}
                      onCatch={() => setShowPleaModal(true)}
                      className="text-lg md:text-xl px-12 py-5 z-10 w-40 font-light tracking-[0.1em] text-white/60 italic"
                    >
                      No...
                    </EvasiveButton>
                  </div>
                </div>
              ) : (
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="space-y-12"
                >
                  <div className="flex justify-center mb-4">
                    <Heart className="text-rose-500/80 w-20 h-20 drop-shadow-[0_0_30px_rgba(244,63,94,0.4)]" fill="currentColor" strokeWidth={0.5} />
                  </div>
                  <div className="text-5xl md:text-7xl font-light tracking-wide leading-tight px-4 flex flex-col items-center gap-4">
                    <BlurText
                      text="Sampai jumpa di Jepang,"
                      delay={100}
                      className="text-white"
                    />
                    <BlurText
                      text="sayang! ❤️"
                      delay={150}
                      className="font-serif italic text-rose-200/90 italic"
                    />
                  </div>
                  <BlurText
                    text="Matahari terbit di Jepang takkan seindah senyummu nanti."
                    delay={80}
                    className="text-white/40 text-lg md:text-xl font-light tracking-[0.2em] uppercase max-w-2xl mx-auto px-4 leading-relaxed mt-12"
                  />

                  <motion.a
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2.5, duration: 1 }}
                    href="https://wa.me/?text=Halo%20sayang!%20Aku%20sudah%20melihat%20halaman%20confession-nya.%20Dan%20jawabanku...%20YES!%20%E2%9D%A4%EF%B8%8F"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-8 px-8 py-3 rounded-full bg-green-500/20 text-green-400 border border-green-500/30 hover:bg-green-500 hover:text-white transition-all duration-300 font-medium tracking-[0.1em] text-sm backdrop-blur-sm"
                  >
                    Call Me Beb💬
                  </motion.a>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Anniversary Pop-up Modal */}
      <AnimatePresence>
        {showAnniversaryModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.8, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.8, y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 100 }}
              className="relative max-w-lg w-full bg-white/[0.03] border border-white/20 backdrop-blur-2xl rounded-[2.5rem] p-12 text-center shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden"
            >
              {/* Decorative Glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-rose-500/20 rounded-full blur-[80px] -z-10"></div>

              <div className="space-y-8">
                <div className="flex justify-center">
                  <div className="p-4 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-300">
                    <Heart size={32} fill="currentColor" className="animate-pulse" />
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-white/40 text-[10px] tracking-[0.6em] uppercase">Mulai Hari Ini</h3>
                  <h2 className="text-4xl md:text-6xl font-light tracking-widest text-white">
                    10 MARET 2026
                  </h2>
                </div>

                <div className="h-px w-32 bg-gradient-to-r from-transparent via-rose-500 to-transparent mx-auto"></div>

                <p className="text-xl md:text-2xl font-light leading-relaxed text-white/90">
                  "Sejak detik ini, namamu adalah satu-satunya alasan detak jantungku merasa <span className="font-serif italic text-rose-200">sempurna.</span>"
                </p>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowAnniversaryModal(false)}
                  className="mt-8 w-full py-4 rounded-2xl bg-white text-black font-semibold tracking-widest uppercase text-xs hover:bg-rose-50 transition-colors"
                >
                  Simpan di Hati ✨
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Plea Pop-up Modal (When 'No' is finally caught) */}
      <AnimatePresence>
        {showPleaModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.8, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.8, y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 100 }}
              className="relative max-w-sm w-full bg-white/[0.05] border border-white/10 backdrop-blur-2xl rounded-[2rem] p-8 text-center shadow-2xl"
            >
              <div className="space-y-6">
                <div className="text-6xl">🥺</div>
                <h2 className="text-2xl font-light text-white">
                  Yahhh... beneran ditolak nih?
                </h2>
                <p className="text-white/70 font-serif italic text-lg">
                  "Please terima dong..."
                </p>

                <div className="pt-4 flex flex-col gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowPleaModal(false)}
                    className="w-full py-3 rounded-xl bg-white/10 border border-white/20 text-white/80 hover:bg-white/20 hover:text-white transition-colors text-sm"
                  >
                    Tutup bentar, mau mikir lagi
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress Indicator Dots */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-4 z-40">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            initial={false}
            animate={{
              width: slideIndex === i ? 24 : 6,
              opacity: slideIndex === i ? 1 : 0.2,
              backgroundColor: slideIndex === i ? '#fb7185' : '#ffffff'
            }}
            className="h-1.5 rounded-full"
          />
        ))}
      </div>
    </div>
  );
};

export default App;
