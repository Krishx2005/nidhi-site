import { useEffect, useRef, useState, useCallback } from 'react'
import './App.css'

const PARTICLES = ['💕', '✨', '💗', '⭐', '💖', '🌸']

function FloatingParticles() {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    const createParticle = () => {
      const el = document.createElement('span')
      el.className = 'particle'
      el.textContent = PARTICLES[Math.floor(Math.random() * PARTICLES.length)]
      el.style.left = Math.random() * 100 + 'vw'
      el.style.bottom = '-20px'
      el.style.fontSize = (Math.random() * 16 + 10) + 'px'
      el.style.animationDuration = (Math.random() * 8 + 10) + 's'
      container.appendChild(el)
      setTimeout(() => el.remove(), 18000)
    }

    const interval = setInterval(createParticle, 1200)
    // Create a few initial particles
    for (let i = 0; i < 6; i++) {
      setTimeout(createParticle, i * 400)
    }
    return () => clearInterval(interval)
  }, [])

  return <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0" />
}

function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1 }
    )

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])
}

function Hero() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative px-6 overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 hero-gradient" />
      {/* Soft radial glows */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-pink-soft/20 rounded-full blur-3xl hero-float-slow" />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-lavender/15 rounded-full blur-3xl hero-float-slower" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-rose/10 rounded-full blur-3xl" />
      {/* Decorative accents */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <span className="absolute top-[18%] left-[12%] text-2xl sm:text-3xl opacity-30 hero-float-slow fade-in-up delay-3">🌸</span>
        <span className="absolute top-[15%] right-[14%] text-xl sm:text-2xl opacity-25 hero-float-slower fade-in-up delay-4">✨</span>
        <span className="absolute bottom-[25%] left-[18%] text-xl sm:text-2xl opacity-20 hero-float-slower fade-in-up delay-5">🌷</span>
        <span className="absolute bottom-[22%] right-[12%] text-2xl sm:text-3xl opacity-25 hero-float-slow fade-in-up delay-3">💫</span>
        <span className="absolute top-[35%] right-[22%] text-lg opacity-20 hero-float-slow fade-in-up delay-2">🌸</span>
        <span className="absolute bottom-[35%] left-[8%] text-lg opacity-15 hero-float-slower fade-in-up delay-4">✨</span>
      </div>
      <div className="relative z-10 text-center">
        <h1
          className="font-script text-7xl sm:text-8xl md:text-[10rem] md:leading-none shimmer-text fade-in-up"
        >
          Nidhi Patel
        </h1>
        <p
          className="font-body text-base sm:text-lg mt-8 text-pink-deep/60 tracking-[0.2em] uppercase fade-in-up delay-2"
        >
          taco bell queen &middot; matcha enthusiast &middot; dog mom
        </p>
        {/* Hero polaroid photos */}
        <div className="mt-12 flex items-center justify-center gap-6 sm:gap-10 fade-in-up delay-3">
          <div className="group" style={{ transform: 'rotate(-5deg) translateY(8px)' }}>
            <div className="polaroid bg-white p-2 pb-10 sm:p-3 sm:pb-12 rounded-sm shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 relative">
              <img
                src="/images/hero-1.jpg"
                alt="Nidhi"
                className="w-36 h-44 sm:w-44 sm:h-52 object-cover rounded-xs"
                loading="lazy"
              />
              <p className="absolute bottom-2.5 sm:bottom-3.5 left-0 right-0 text-center font-script text-sm text-gray-400 group-hover:text-pink-deep transition-colors duration-300">
                her 💕
              </p>
              <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-12 h-4 bg-pink-100/50 rounded-sm rotate-2 shadow-sm" />
            </div>
          </div>
          <div className="group" style={{ transform: 'rotate(4deg) translateY(-6px)' }}>
            <div className="polaroid bg-white p-2 pb-10 sm:p-3 sm:pb-12 rounded-sm shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 relative">
              <img
                src="/images/hero-2.jpg"
                alt="Nidhi"
                className="w-36 h-44 sm:w-44 sm:h-52 object-cover rounded-xs"
                loading="lazy"
              />
              <p className="absolute bottom-2.5 sm:bottom-3.5 left-0 right-0 text-center font-script text-sm text-gray-400 group-hover:text-pink-deep transition-colors duration-300">
                ✨
              </p>
              <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-12 h-4 bg-amber-100/50 rounded-sm -rotate-1 shadow-sm" />
            </div>
          </div>
        </div>
        <div className="mt-12 fade-in-up delay-4">
          <a
            href="#loves"
            className="inline-flex flex-col items-center gap-2 group"
          >
            <span className="text-xs tracking-[0.3em] uppercase text-pink-soft/60 group-hover:text-pink-deep transition-colors duration-300">
              scroll
            </span>
            <span className="gentle-float inline-block w-10 h-10 rounded-full border-2 border-pink-soft/40 group-hover:border-pink-deep/60 flex items-center justify-center text-pink-soft group-hover:text-pink-deep transition-all duration-300 text-lg">
              &#8595;
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}

const photos = [
  {
    src: '/images/nidhi1.jpg',
    rotation: '-3deg',
    caption: 'her 💕',
  },
  {
    src: '/images/nidhi2.jpg',
    rotation: '2.5deg',
    caption: '✨',
  },
]

function PhotoBoard() {
  return (
    <section className="py-16 px-6 relative z-10">
      <div className="max-w-4xl mx-auto text-center">
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
          {photos.map((photo, i) => (
            <div
              key={i}
              className="reveal group"
              style={{
                transform: `rotate(${photo.rotation})`,
                transitionDelay: `${i * 150}ms`,
              }}
            >
              <div className="polaroid bg-white p-3 pb-14 sm:p-4 sm:pb-16 rounded-sm shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 relative">
                <img
                  src={photo.src}
                  alt="Nidhi"
                  className="w-56 h-64 sm:w-64 sm:h-72 object-cover rounded-xs"
                  loading="lazy"
                />
                <p className="absolute bottom-4 sm:bottom-5 left-0 right-0 text-center font-script text-lg text-gray-400 group-hover:text-pink-medium transition-colors duration-300">
                  {photo.caption}
                </p>
                {/* Tape effect */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-amber-100/60 rounded-sm rotate-1 shadow-sm" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const loves = [
  {
    emoji: '🍵',
    title: 'Matcha',
    description:
      "Her blood type is matcha at this point. Iced, hot, latte, ceremonial grade — she doesn't discriminate. Every cafe visit starts and ends the same way.",
    bg: 'from-green-100 to-emerald-50',
    border: 'border-green-200',
  },
  {
    emoji: '⚽',
    title: 'Blue Lock',
    description:
      "The only sport-coded thing she watches and she is more invested than actual soccer fans. Blue Lock changed her.",
    bg: 'from-blue-100 to-sky-50',
    border: 'border-blue-200',
  },
  {
    emoji: '⚡',
    title: 'Harry Potter',
    description:
      "Hogwarts is her comfort world. Movies on repeat, Gryffindor pride fully intact, zero plans to ever read the books.",
    bg: 'from-amber-100 to-yellow-50',
    border: 'border-amber-200',
  },
  {
    emoji: '🎵',
    title: 'KPop',
    description:
      "The playlists are immaculate. The choreography knowledge is unmatched. She didn't just fall down the rabbit hole — she redecorated it.",
    bg: 'from-purple-100 to-violet-50',
    border: 'border-purple-200',
  },
  {
    emoji: '🌮',
    title: 'Taco Bell',
    description:
      "The Crunchwrap Supreme is a love language and she is fluent. No one has ever been this devoted to a fast food chain. It's kind of iconic.",
    bg: 'from-orange-100 to-amber-50',
    border: 'border-orange-200',
  },
  {
    emoji: '🧸',
    title: 'Jellycat',
    description:
      "She collects them, she names them, she loves them unconditionally. Jellycat is not a phase, it's a lifestyle.",
    bg: 'from-pink-100 to-fuchsia-50',
    border: 'border-pink-200',
  },
  {
    emoji: '🐾',
    title: 'Rio',
    description:
      "Her baby, her best friend, her entire heart on four legs. Rio gets the kind of love most people only dream of. Honestly, we should all be so lucky.",
    bg: 'from-rose-100 to-pink-50',
    border: 'border-rose-200',
  },
]

function playDramaticChord() {
  const ctx = new (window.AudioContext || window.webkitAudioContext)()
  const notes = [130.81, 164.81, 196.00, 261.63, 329.63]
  notes.forEach((freq, i) => {
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = i === 0 ? 'sawtooth' : 'triangle'
    osc.frequency.value = freq
    gain.gain.setValueAtTime(0, ctx.currentTime)
    gain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 0.05)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2.5)
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start(ctx.currentTime + i * 0.06)
    osc.stop(ctx.currentTime + 2.5)
  })
}

const TB_EMOJIS = ['🌮', '🌯', '🍟', '🥤', '🔔', '🌮', '🌯']
const TB_ORDER = [
  '🌮 Crunchwrap Supreme',
  '🥤 Baja Blast (large, obviously)',
  '🌯 Cheesy Gordita Crunch',
  '🍟 Nacho Fries',
  '🔥 Fire sauce. All of it.',
  '💸 Total damage: doesn\u2019t matter, worth it',
]

function TacoBellEasterEgg({ onClose }) {
  const rainRef = useRef(null)
  const [visibleItems, setVisibleItems] = useState(0)
  const [showFinal, setShowFinal] = useState(false)

  useEffect(() => {
    playDramaticChord()

    // Emoji rain
    const container = rainRef.current
    const interval = setInterval(() => {
      const el = document.createElement('span')
      el.className = 'tb-rain'
      el.textContent = TB_EMOJIS[Math.floor(Math.random() * TB_EMOJIS.length)]
      el.style.left = Math.random() * 100 + 'vw'
      el.style.fontSize = (Math.random() * 20 + 16) + 'px'
      el.style.animationDuration = (Math.random() * 2 + 2) + 's'
      container.appendChild(el)
      setTimeout(() => el.remove(), 4000)
    }, 120)

    // Stagger order items
    TB_ORDER.forEach((_, i) => {
      setTimeout(() => setVisibleItems(i + 1), 800 + i * 500)
    })

    // Show final line after all items
    setTimeout(() => setShowFinal(true), 800 + TB_ORDER.length * 500 + 400)

    return () => clearInterval(interval)
  }, [])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center cursor-pointer"
      onClick={onClose}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/80 tb-fade-in" />
      {/* Emoji rain container */}
      <div ref={rainRef} className="absolute inset-0 pointer-events-none overflow-hidden" />
      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-2xl w-full pointer-events-none">
        {/* Title */}
        <h2 className="tb-drop-in text-3xl sm:text-5xl font-bold mb-10 sm:mb-14"
          style={{ color: '#702082', textShadow: '0 0 40px rgba(112, 32, 130, 0.5)' }}>
          HER OFFICIAL TACO BELL ORDER 🔔
        </h2>
        {/* Order items */}
        <div className="space-y-4 sm:space-y-5 mb-10 sm:mb-14">
          {TB_ORDER.map((item, i) => (
            <div
              key={i}
              className={`text-xl sm:text-2xl font-bold tracking-wide ${i < visibleItems ? 'tb-slide-in' : 'opacity-0'}`}
              style={{
                color: '#FFC629',
                textShadow: '0 2px 10px rgba(255, 198, 41, 0.3)',
                animationDelay: '0s',
              }}
            >
              {item}
            </div>
          ))}
        </div>
        {/* Final line */}
        {showFinal && (
          <p className="tb-pulse-in text-lg sm:text-2xl italic font-bold"
            style={{ color: '#fff', textShadow: '0 0 30px rgba(255, 198, 41, 0.6)' }}>
            this is not a want. this is a need. 👑
          </p>
        )}
      </div>
    </div>
  )
}

function ThingsSheLoves() {
  const [showTB, setShowTB] = useState(false)
  const clickTimesRef = useRef([])

  const handleTBClick = useCallback(() => {
    const now = Date.now()
    clickTimesRef.current = [...clickTimesRef.current.filter(t => now - t < 2000), now]
    if (clickTimesRef.current.length >= 5) {
      clickTimesRef.current = []
      setShowTB(true)
    }
  }, [])

  return (
    <section id="loves" className="py-24 px-6 relative z-10">
      {showTB && <TacoBellEasterEgg onClose={() => setShowTB(false)} />}
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="font-script text-4xl sm:text-5xl text-pink-deep mb-4 reveal">
          things she loves
        </h2>
        <p className="text-pink-deep/50 mb-16 reveal">
          a non-exhaustive but very accurate list
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loves.map((item, i) => (
            <div
              key={item.title}
              className={`reveal bg-gradient-to-br ${item.bg} ${item.border} border rounded-2xl p-6 text-center
                hover:scale-[1.03] transition-all duration-300 card-glow cursor-default
                ${item.title === 'Taco Bell' ? 'cursor-pointer select-none' : ''}`}
              style={{ transitionDelay: `${i * 80}ms` }}
              onClick={item.title === 'Taco Bell' ? handleTBClick : undefined}
            >
              <span className="text-4xl block mb-3">{item.emoji}</span>
              <h3 className="font-display text-xl font-semibold text-gray-800 mb-2">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-gray-600">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function RioPhotos() {
  return (
    <section className="py-16 px-6 relative z-10">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="font-script text-3xl sm:text-4xl text-pink-deep mb-12 reveal">
          rio 🐾
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-10">
          {[
            { src: '/images/rio-1.jpg', rotation: '-2.5deg', caption: 'Rio 💕' },
            { src: '/images/rio-2.jpg', rotation: '3deg', caption: 'baby boy 🐾' },
          ].map((photo, i) => (
            <div
              key={i}
              className="reveal group"
              style={{ transform: `rotate(${photo.rotation})`, transitionDelay: `${i * 150}ms` }}
            >
              <div className="polaroid bg-white p-3 pb-12 sm:p-4 sm:pb-14 rounded-sm shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 relative">
                <img
                  src={photo.src}
                  alt={photo.caption}
                  className="w-48 h-56 sm:w-56 sm:h-64 object-cover rounded-xs"
                  loading="lazy"
                />
                <p className="absolute bottom-3 sm:bottom-4 left-0 right-0 text-center font-script text-base text-gray-400 group-hover:text-pink-deep transition-colors duration-300">
                  {photo.caption}
                </p>
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-14 h-5 bg-rose-100/60 rounded-sm rotate-1 shadow-sm" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function JellycatPhotos() {
  return (
    <section className="py-16 px-6 relative z-10">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="font-script text-3xl sm:text-4xl text-pink-deep mb-12 reveal">
          the jellycat collection 🧸
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-10">
          {[
            { src: '/images/jellycat-1.jpg', rotation: '-2deg', caption: 'the squad 🧸' },
            { src: '/images/jellycat-2.jpg', rotation: '2.5deg', caption: 'so precious 💕' },
            { src: '/images/jellycat-3.jpg', rotation: '-1.5deg', caption: 'growing family ✨' },
          ].map((photo, i) => (
            <div
              key={i}
              className="reveal group"
              style={{ transform: `rotate(${photo.rotation})`, transitionDelay: `${i * 150}ms` }}
            >
              <div className="polaroid bg-white p-3 pb-12 sm:p-4 sm:pb-14 rounded-sm shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 relative">
                <img
                  src={photo.src}
                  alt={photo.caption}
                  className="w-48 h-56 sm:w-56 sm:h-64 object-cover rounded-xs"
                  loading="lazy"
                />
                <p className="absolute bottom-3 sm:bottom-4 left-0 right-0 text-center font-script text-base text-gray-400 group-hover:text-pink-deep transition-colors duration-300">
                  {photo.caption}
                </p>
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-14 h-5 bg-fuchsia-100/60 rounded-sm rotate-1 shadow-sm" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const movies = [
  { emoji: '🏹', title: 'The Hunger Games', note: 'Katniss walked so she could run. Volunteering as tribute is just Gryffindor behavior tbh.' },
  { emoji: '⚡', title: 'Harry Potter', note: 'Obviously. The entire series is basically her origin story. She IS the chosen one.' },
  { emoji: '😂', title: '21 & 22 Jump Street', note: 'Her comfort movies. She can and will quote these at any given moment and it will always land.' },
  { emoji: '💃', title: 'Yeh Jawaani Hai Deewani', note: 'Main toh khud se pyaar jataungi — and honestly she lives that energy every single day.' },
  { emoji: '🎵', title: 'A Silent Voice', note: 'The one that makes her cry every single time. Beautiful story, beautiful girl who loves it.' },
]

function MoviesSheLoves() {
  return (
    <section className="py-24 px-6 relative z-10">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="font-script text-4xl sm:text-5xl text-pink-deep mb-16 reveal">
          movies she loves 🎬
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {movies.map((movie, i) => (
            <div
              key={movie.title}
              className="reveal group bg-white/60 backdrop-blur-sm border border-pink-soft/30 rounded-2xl p-5 text-center
                hover:bg-white/80 hover:scale-[1.03] transition-all duration-300 card-glow cursor-default"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <span className="text-3xl block mb-2">{movie.emoji}</span>
              <h3 className="font-display text-lg font-semibold text-gray-800 mb-2">{movie.title}</h3>
              <p className="text-sm leading-relaxed text-gray-500">{movie.note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const shows = [
  { emoji: '🎮', title: 'Video Game High School', note: 'The nostalgia is real. She will make you watch this and you will not regret it.' },
  { emoji: '⚽', title: 'Blue Lock', note: 'Ego era activated. She takes the striker rankings personally.' },
  { emoji: '🔥', title: 'Jujutsu Kaisen', note: 'Gojo could end her and she would say thank you. The brainrot is strong with this one.' },
  { emoji: '🗡️', title: 'Demon Slayer', note: 'The animation alone is enough but she is HERE for the storyline. Nezuko defense squad president.' },
]

function CurrentlyWatching() {
  return (
    <section className="py-24 px-6 relative z-10">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="font-script text-4xl sm:text-5xl text-pink-deep mb-16 reveal">
          currently watching (and rewatching) 📺
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {shows.map((show, i) => (
            <div
              key={show.title}
              className="reveal group bg-gradient-to-br from-lavender/30 to-pink-soft/20 border border-lavender/40 rounded-2xl p-5 text-center
                hover:from-lavender/50 hover:to-pink-soft/30 hover:scale-[1.03] transition-all duration-300 card-glow cursor-default"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <span className="text-3xl block mb-2">{show.emoji}</span>
              <h3 className="font-display text-lg font-semibold text-gray-800 mb-2">{show.title}</h3>
              <p className="text-sm leading-relaxed text-gray-500">{show.note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const matchaSpots = [
  'Marib Matcha',
  'Milkyway Matcha',
  'Qahmaria Matcha',
  'Little Cat Matcha',
]

function MatchaEra() {
  return (
    <section className="py-24 px-6 relative z-10">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="font-script text-4xl sm:text-5xl text-pink-deep mb-6 reveal">
          her matcha era 🍵
        </h2>
        <p className="text-pink-deep/50 mb-4 reveal font-body text-sm tracking-wide">
          the spots she swears by
        </p>
        <p className="mb-16 reveal">
          <span className="inline-block bg-gradient-to-r from-green-100 to-pink-100 border border-green-200/60
            text-green-800 text-sm font-body px-5 py-2 rounded-full shadow-sm">
            will ONLY order strawberry matcha, no exceptions 🍓
          </span>
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-2xl mx-auto">
          {matchaSpots.map((spot, i) => (
            <div
              key={spot}
              className="reveal group relative bg-gradient-to-br from-green-50 via-emerald-50 to-green-100
                border border-green-200/50 rounded-2xl p-6
                hover:shadow-lg hover:shadow-green-200/30 hover:scale-[1.04] hover:border-green-300/60
                transition-all duration-300 cursor-default overflow-hidden"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="absolute top-2 right-3 text-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-300">
                🍵
              </div>
              <h3 className="font-display text-lg font-semibold text-gray-800 group-hover:text-green-800 transition-colors duration-300">
                {spot}
              </h3>
              <div className="mt-3 flex justify-center gap-1">
                {Array.from({ length: 3 }, (_, j) => (
                  <span key={j} className="text-xs opacity-60">🍃</span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-14 flex flex-wrap items-center justify-center gap-8 sm:gap-10">
          {[
            { src: '/images/marib-matcha.jpg', rotation: '-2.5deg', caption: 'marib 🍵' },
            { src: '/images/strawberry-matcha.jpg', rotation: '3deg', caption: 'strawberry matcha 🍓' },
          ].map((photo, i) => (
            <div
              key={i}
              className="reveal group"
              style={{ transform: `rotate(${photo.rotation})`, transitionDelay: `${i * 150}ms` }}
            >
              <div className="polaroid bg-white p-3 pb-12 sm:p-4 sm:pb-14 rounded-sm shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 relative">
                <img
                  src={photo.src}
                  alt={photo.caption}
                  className="w-48 h-56 sm:w-56 sm:h-64 object-cover rounded-xs"
                  loading="lazy"
                />
                <p className="absolute bottom-3 sm:bottom-4 left-0 right-0 text-center font-script text-base text-gray-400 group-hover:text-green-700 transition-colors duration-300">
                  {photo.caption}
                </p>
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-14 h-5 bg-green-100/60 rounded-sm -rotate-1 shadow-sm" />
              </div>
            </div>
          ))}
        </div>
        <p className="mt-10 text-sm text-pink-deep/40 reveal font-body italic">
          just don&apos;t ask her about RH Rooftop Matcha 🚩
        </p>
      </div>
    </section>
  )
}

const restaurants = [
  'Butcher & Rose',
  'Modern Martini Italian',
  'Cento',
  'Amul India',
  'Astra Rooftop',
]

function FavoriteRestaurants() {
  return (
    <section className="py-24 px-6 relative z-10">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="font-script text-4xl sm:text-5xl text-pink-deep mb-6 reveal">
          favorite restaurants 🍽️
        </h2>
        <p className="text-pink-deep/50 mb-16 reveal font-body text-sm tracking-wide">
          she also loves sushi — specifically california rolls 🍣
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-3xl mx-auto">
          {restaurants.map((spot, i) => (
            <div
              key={spot}
              className="reveal group bg-white/60 backdrop-blur-sm border border-pink-soft/30 rounded-2xl p-5 text-center
                hover:bg-white/80 hover:scale-[1.03] transition-all duration-300 card-glow cursor-default"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <h3 className="font-display text-lg font-semibold text-gray-800 group-hover:text-pink-deep transition-colors duration-300">
                {spot}
              </h3>
            </div>
          ))}
        </div>
        <div className="mt-14 flex flex-wrap items-center justify-center gap-8 sm:gap-10">
          {[
            { src: '/images/restaurant-1.jpg', rotation: '-3deg', caption: 'date night 💕' },
            { src: '/images/restaurant-2.jpg', rotation: '2deg', caption: 'good food, better company ✨' },
            { src: '/images/restaurant-3.jpg', rotation: '-1.5deg', caption: 'always eating 🍽️' },
          ].map((photo, i) => (
            <div
              key={i}
              className="reveal group"
              style={{ transform: `rotate(${photo.rotation})`, transitionDelay: `${i * 150}ms` }}
            >
              <div className="polaroid bg-white p-3 pb-12 sm:p-4 sm:pb-14 rounded-sm shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 relative">
                <img
                  src={photo.src}
                  alt={photo.caption}
                  className="w-48 h-56 sm:w-56 sm:h-64 object-cover rounded-xs"
                  loading="lazy"
                />
                <p className="absolute bottom-3 sm:bottom-4 left-0 right-0 text-center font-script text-base text-gray-400 group-hover:text-pink-deep transition-colors duration-300">
                  {photo.caption}
                </p>
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-14 h-5 bg-pink-100/60 rounded-sm rotate-1 shadow-sm" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function WhatMakesHerHer() {
  return (
    <section className="py-24 px-6 relative z-10">
      <div className="max-w-[700px] mx-auto text-center">
        <h2 className="font-script text-4xl sm:text-5xl text-pink-deep mb-16 reveal">
          what makes her her
        </h2>
        <p className="text-lg leading-relaxed text-gray-700 reveal">
          There&apos;s a version of her that&apos;s fully locked in on a new show at midnight,
          and a version that&apos;s at a new restaurant trying to figure out if it deserves
          a spot on the list. Both are equally her. She&apos;s the kind of person who makes
          you care about the things she cares about — not because she&apos;s loud about it,
          but because her excitement is just that contagious.
        </p>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="py-16 text-center relative z-10">
      <p className="text-sm text-pink-soft/60 hover:text-pink-deep transition-colors duration-500 cursor-default">
        made with 💕 by Krish
      </p>
    </footer>
  )
}

function App() {
  useScrollReveal()

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      <FloatingParticles />
      {/* Soft gradient overlays */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-pink-soft/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-lavender/15 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-72 h-72 bg-peach/10 rounded-full blur-3xl" />
      </div>
      <Hero />
      <PhotoBoard />
      <ThingsSheLoves />
      <RioPhotos />
      <JellycatPhotos />
      <MoviesSheLoves />
      <CurrentlyWatching />
      <MatchaEra />
      <FavoriteRestaurants />
      <WhatMakesHerHer />
      <Footer />
    </div>
  )
}

export default App
