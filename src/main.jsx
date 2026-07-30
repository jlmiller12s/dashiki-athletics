import React, { useEffect, useRef, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { Analytics } from '@vercel/analytics/react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './styles.css'

gsap.registerPlugin(ScrollTrigger)

const A = '/assets/'
const SQUARE_CHECKOUT = 'https://square.link/u/DwI8JZju?src=embed'

const spinFrames = [
  'studio-shot-5.jpg',
  'studio-shot-01.jpg',
  'studio-shot-9.jpg',
  'studio-shot-7.jpg',
  'studio-shot-10.jpg',
  'studio-shot-11.jpg',
]

function Arrow() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6" /></svg>
}

function App() {
  const root = useRef(null)
  const spin = useRef(null)
  const [frame, setFrame] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)
  const [showOrderNotice, setShowOrderNotice] = useState(
    () => new URLSearchParams(window.location.search).get('order') === 'complete',
  )

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let lenis

    if (!reduce) {
      lenis = new Lenis({ lerp: 0.085, smoothWheel: true })
      const tick = (time) => lenis.raf(time * 1000)
      gsap.ticker.add(tick)
      gsap.ticker.lagSmoothing(0)
      lenis.on('scroll', ScrollTrigger.update)

      const progress = { value: 0 }
      gsap.to(progress, {
        value: spinFrames.length - 1,
        ease: 'none',
        scrollTrigger: {
          trigger: spin.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.45,
          onUpdate: () => setFrame(Math.round(progress.value)),
        },
      })

      gsap.utils.toArray('[data-reveal]').forEach((element) => {
        gsap.from(element, {
          y: 48,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: { trigger: element, start: 'top 88%' },
        })
      })

      gsap.to('.hero__media img', {
        scale: 1.08,
        yPercent: 5,
        ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
      })

      return () => {
        gsap.ticker.remove(tick)
        lenis.destroy()
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
      }
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <div ref={root}>
      <div className="announcement">Built for the work. Designed to be seen.</div>
      {showOrderNotice && (
        <div className="order-notice" role="status">
          <span><strong>Order received.</strong> Thank you for carrying Dashiki Athletics.</span>
          <button type="button" onClick={() => setShowOrderNotice(false)} aria-label="Dismiss order confirmation">Close</button>
        </div>
      )}
      <header className="nav">
        <a href="#top" className="logo" aria-label="Dashiki Athletics home">
          <img src={`${A}cropped-da-logo1-white.png`} alt="Dashiki Athletics" />
        </a>
        <nav aria-label="Main navigation">
          <a href="#shop">Shop</a>
          <a href="#bag">The Bag</a>
          <a href="#details">Details</a>
          <a href="#gallery">Gallery</a>
        </nav>
        <button className="menu-button" onClick={() => setMenuOpen(true)} aria-label="Open menu">
          <span /><span />
        </button>
      </header>

      <div className={`menu-drawer ${menuOpen ? 'is-open' : ''}`} aria-hidden={!menuOpen}>
        <button onClick={() => setMenuOpen(false)} aria-label="Close menu">Close</button>
        {['Shop', 'The Bag', 'Details', 'Gallery'].map((item, index) => (
          <a key={item} href={['#shop', '#bag', '#details', '#gallery'][index]} onClick={() => setMenuOpen(false)}>
            <small>0{index + 1}</small>{item}
          </a>
        ))}
      </div>

      <main id="top">
        <section className="hero">
          <div className="hero__media">
            <img src={`${A}bag-environment-shot-1.jpeg`} alt="Athlete carrying the Dashiki Athletics gym bag" />
          </div>
          <div className="hero__shade" />
          <div className="hero__copy">
            <p className="eyebrow">The Original Dashiki Gym Bag</p>
            <h1>Carry<br /><em>bold.</em></h1>
            <p className="hero__dek">Performance utility wrapped in unmistakable culture.</p>
            <a className="button" href="#bag">Meet the bag <Arrow /></a>
          </div>
          <div className="scroll-cue"><span /> Scroll to explore</div>
        </section>

        <section className="manifesto" data-reveal>
          <p>More than a gym bag.</p>
          <h2>Made to carry the whole day—<span>and every version of you in it.</span></h2>
        </section>

        <section className="shop" id="shop">
          <div className="shop__bar">
            <div><p className="eyebrow">Shop the original</p><h2>One bag.<br />Every move.</h2></div>
            <p>The flagship Dashiki Athletics Gym Bag is available now. Explore every angle, then check out securely with Square.</p>
          </div>
          <div className="product-grid">
            <article className="product-card product-card--hero" data-reveal>
              <div className="product-card__image">
                <span className="product-card__badge">Flagship</span>
                <img src={`${A}studio-shot-5.jpg`} alt="Dashiki Athletics Original Gym Bag" />
                <a href={SQUARE_CHECKOUT} target="_blank" rel="noreferrer">Buy now — $29.99 <Arrow /></a>
              </div>
              <div className="product-card__meta">
                <div><h3>The Original Gym Bag</h3><p>Black / Signature Dashiki print</p></div>
                <strong>$29.99 · In stock</strong>
              </div>
            </article>
            <article className="product-story" data-reveal>
              <img src={`${A}studio-shot-8.jpg`} alt="Dashiki Athletics Gym Bag strap detail" />
              <div><span>Signature detail</span><h3>Culture in every carry.</h3></div>
            </article>
            <article className="product-story product-story--orange" data-reveal>
              <img src={`${A}studio-shot-10.jpg`} alt="Dashiki Athletics Gym Bag side profile" />
              <div><span>Built versatile</span><h3>Duffle. Backpack. Daily driver.</h3></div>
            </article>
          </div>
          <div className="store-assurances">
            <div><span>01</span><strong>Multi-carry design</strong><p>Switch the way you carry to match the day.</p></div>
            <div><span>02</span><strong>Purposeful storage</strong><p>Dedicated space for training and daily essentials.</p></div>
            <div><span>03</span><strong>Secure Square checkout</strong><p>Pay through Square and receive an order confirmation instantly.</p></div>
          </div>
        </section>

        <section className="spin" id="bag" ref={spin}>
          <div className="spin__sticky">
            <div className="spin__copy spin__copy--left">
              <span>01 / The exterior</span>
              <h2>Built to<br />stand out.</h2>
              <p>A hard-working black shell, cut through with vivid African-inspired print.</p>
            </div>
            <div className="spin__product" aria-live="polite">
              {spinFrames.map((src, index) => (
                <img
                  key={src}
                  src={`${A}${src}`}
                  alt={index === frame ? `Dashiki Athletics bag view ${index + 1}` : ''}
                  className={index === frame ? 'is-active' : ''}
                  aria-hidden={index !== frame}
                />
              ))}
              <div className="spin__halo" />
            </div>
            <div className="spin__copy spin__copy--right">
              <span>0{frame + 1} / 06</span>
              <p>Scroll to rotate</p>
              <div className="spin__meter"><i style={{ transform: `scaleX(${(frame + 1) / spinFrames.length})` }} /></div>
            </div>
          </div>
        </section>

        <section className="feature-grid" id="details">
          <article className="feature feature--large" data-reveal>
            <img src={`${A}studio-shot-1.jpg`} alt="Inside the roomy Dashiki Athletics bag" />
            <div><span>01</span><h3>Room for the full routine.</h3><p>Multiple compartments keep training gear, tech, and daily essentials in their place.</p></div>
          </article>
          <article className="feature" data-reveal>
            <img src={`${A}studio-shot-3.jpg`} alt="Dashiki bag side pocket and bottle storage" />
            <div><span>02</span><h3>Organized by design.</h3><p>Quick-access pockets make the small things easy to find.</p></div>
          </article>
          <article className="feature feature--dark" data-reveal>
            <blockquote>“The only bag you will ever need.”</blockquote>
            <p>Durable. Functional. Unmistakably bold.</p>
          </article>
        </section>

        <section className="lifestyle" data-reveal>
          <img src={`${A}bag-environment-shot-3.jpg`} alt="Dashiki Athletics bag in the gym" />
          <div>
            <p className="eyebrow">Gym floor to everywhere</p>
            <h2>Go hard.<br />Carry easy.</h2>
          </div>
        </section>

        <section className="gallery" id="gallery">
          <div className="gallery__heading" data-reveal>
            <p className="eyebrow">In motion</p>
            <h2>Made for people<br />who move different.</h2>
            <a href="https://www.instagram.com/dashikiathletics/" target="_blank" rel="noreferrer">Follow @dashikiathletics <Arrow /></a>
          </div>
          <div className="gallery__mosaic">
            <img data-reveal src={`${A}MG_4571-01-01-scaled.jpeg`} alt="Athlete training with the Dashiki Athletics bag" />
            <img data-reveal src={`${A}MG_4544-01-scaled.jpeg`} alt="Athlete wearing the Dashiki Athletics bag" />
            <img data-reveal src={`${A}MG_4574-01-scaled.jpeg`} alt="Dashiki Athletics bag in use" />
          </div>
        </section>

        <section className="cta">
          <video src={`${A}demo-video-1.mp4`} autoPlay muted loop playsInline aria-hidden="true" />
          <div className="cta__shade" />
          <div data-reveal>
            <p className="eyebrow">Dashiki Athletics</p>
            <h2>Bold designs.<br /><em>Bold people.</em></h2>
            <a className="button button--light" href={SQUARE_CHECKOUT} target="_blank" rel="noreferrer">
              Buy now — $29.99 <Arrow />
            </a>
          </div>
        </section>
      </main>

      <footer>
        <img src={`${A}cropped-da-logo1-white.png`} alt="Dashiki Athletics" />
        <div><a href="#shop">Shop</a><a href="#bag">The Bag</a><a href="#details">Details</a><a href="#gallery">Gallery</a></div>
        <div><a href="https://www.instagram.com/dashikiathletics/" target="_blank" rel="noreferrer">Instagram</a><a href="https://www.facebook.com/dashikiathletics" target="_blank" rel="noreferrer">Facebook</a></div>
        <p>© {new Date().getFullYear()} Dashiki Athletics</p>
      </footer>
    </div>
  )
}

createRoot(document.getElementById('root')).render(
  <>
    <App />
    <Analytics />
  </>,
)
