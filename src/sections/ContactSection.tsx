import React from 'react'
import gsap from 'gsap'
import { useGSAPSection } from '../hooks/useGSAP'
import globalStyles from './sections.module.css'
import styles from './ContactSection.module.css'

const ContactSection: React.FC = () => {
  const containerRef = useGSAPSection((ctx) => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 60%',
        once: true
      }
    })

    // Draw web background
    const webPath = ctx.selector && ctx.selector('.' + styles.webPath)
    if (webPath || document.querySelector('.' + styles.webPath)) {
      tl.to(webPath || '.' + styles.webPath, {
        strokeDashoffset: 0,
        duration: 2,
        ease: 'power2.inOut'
      }, 0)
    }

    // Drop in characters stagger
    const chars = ctx.selector && ctx.selector('.' + styles.char)
    if (chars || document.querySelector('.' + styles.char)) {
      tl.to(chars || '.' + styles.char, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.05,
        ease: 'bounce.out'
      }, 0.5)
    }

    // Fade up subtext
    const subtext = ctx.selector && ctx.selector('.' + styles.subtext)
    if (subtext || document.querySelector('.' + styles.subtext)) {
      tl.to(subtext || '.' + styles.subtext, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: 'power3.out'
      }, '-=0.4')
    }

    // Fade up CTA and social
    const ctaButton = ctx.selector && ctx.selector('.' + styles.ctaButton)
    const socialLinks = ctx.selector && ctx.selector('.' + styles.socialLinks)
    if (ctaButton || document.querySelector('.' + styles.ctaButton)) {
      tl.to([ctaButton || '.' + styles.ctaButton, socialLinks || '.' + styles.socialLinks], {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.2,
        ease: 'power3.out'
      }, '-=0.2')
    }
  })

  // Helper to wrap characters in spans for animation
  const headingText = "READY TO SWING?"
  const words = headingText.split(' ')

  return (
    <section ref={containerRef} className={styles.contactSection}>
      <h2 className={globalStyles.sectionLabel} style={{ position: 'absolute', top: '6rem', left: '0', width: '100%', maxWidth: '1200px', margin: '0 auto', right: '0', padding: '0 2rem' }}>
        SIGNAL RECEIVED
      </h2>

      {/* Radial Web SVG Background */}
      <svg className={styles.webBackground} viewBox="0 0 100 100">
        {/* Simple concentric spider web pattern for effect */}
        <path className={styles.webPath} d="
          M 50 50 L 50 0 M 50 50 L 100 50 M 50 50 L 50 100 M 50 50 L 0 50 
          M 50 50 L 15 15 M 50 50 L 85 15 M 50 50 L 85 85 M 50 50 L 15 85
          M 50 30 Q 60 35 70 30 Q 65 40 70 50 Q 65 60 70 70 Q 60 65 50 70 Q 40 65 30 70 Q 35 60 30 50 Q 35 40 30 30 Q 40 35 50 30
          M 50 10 Q 70 20 90 10 Q 80 30 90 50 Q 80 70 90 90 Q 70 80 50 90 Q 30 80 10 90 Q 20 70 10 50 Q 20 30 10 10 Q 30 20 50 10
        " />
      </svg>

      <div className={styles.content}>
        <h1 className={styles.heading}>
          {words.map((word, wordIndex) => (
            <span key={wordIndex} className={styles.wordWrapper}>
              {word.split('').map((char, charIndex) => (
                <span key={`${wordIndex}-${charIndex}`} className={styles.char}>
                  {char}
                </span>
              ))}
              {wordIndex < words.length - 1 && (
                <span className={styles.char}>{'\u00A0'}</span>
              )}
            </span>
          ))}
        </h1>
        
        <p className={styles.subtext}>The city needs a hero. Are you in?</p>
        
        <button className={styles.ctaButton}>
          ENTER THE WEB &rarr;
        </button>

        <div className={styles.socialLinks}>
          <a href="#" className={styles.socialIcon}>𝕏</a>
          <a href="#" className={styles.socialIcon}></a> {/* GitHub icon approximate */}
          <a href="#" className={styles.socialIcon}>📷</a> {/* Insta icon approximate */}
        </div>
      </div>
    </section>
  )
}

export default ContactSection
