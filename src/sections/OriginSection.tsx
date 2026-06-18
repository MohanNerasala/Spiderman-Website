import React from 'react'
import gsap from 'gsap'
import { useGSAPSection } from '../hooks/useGSAP'
import { useIsMobile } from '../hooks/useIsMobile'
import globalStyles from './sections.module.css'
import styles from './OriginSection.module.css'

const OriginSection: React.FC = () => {
  const isMobile = useIsMobile()
  const isDesktop = !isMobile

  const containerRef = useGSAPSection((ctx) => {
    const leftCol = ctx.selector && ctx.selector('.' + styles.leftCol)
    const rightCol = ctx.selector && ctx.selector('.' + styles.rightCol)
    
    // Fallback if ctx.selector isn't available for some reason
    const leftTarget = leftCol || '.' + styles.leftCol
    const rightTarget = rightCol || '.' + styles.rightCol

    gsap.to(leftTarget, {
      x: 0,
      opacity: 1,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        once: true,
        scrub: false
      }
    })

    gsap.to(rightTarget, {
      x: 0,
      opacity: 1,
      duration: 1,
      ease: 'power3.out',
      delay: 0.2, // slightly delayed for stagger effect between columns
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        once: true,
        scrub: false
      }
    })

    if (isDesktop) {
      const beats = gsap.utils.toArray<HTMLElement>('.' + styles.storyBeat)
      if (beats.length > 0) {
        gsap.fromTo(beats, 
          { x: 50, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power3.out',
            delay: 0.4, // wait for the column to start coming in
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 80%',
              once: true
            }
          }
        )
      }
    }
  }, [isDesktop])

  return (
    <section ref={containerRef} className={globalStyles.section}>
      <div className={globalStyles.container}>
        <h2 className={globalStyles.sectionLabel}>ORIGIN STORY</h2>
        
        <div className={styles.layout}>
          {/* LEFT COLUMN */}
          <div className={styles.leftCol}>
            <div className={`${globalStyles.glitchText} ${styles.year}`} data-text="1962">
              1962
            </div>
            <div className={styles.credits}>
              CREATED BY STAN LEE<br />& STEVE DITKO
            </div>
          </div>

          {/* SVG DIAGONAL DIVIDER */}
          <div className={styles.divider}>
            <svg width="100%" height="100%" viewBox="0 0 100 1000" preserveAspectRatio="none">
              <line x1="80" y1="0" x2="20" y2="1000" stroke="var(--red)" strokeWidth="2" opacity="0.3" />
            </svg>
          </div>

          {/* RIGHT COLUMN */}
          <div className={styles.rightCol}>
            <div className={styles.storyContent}>
              <div className={styles.storyBeat}>
                <p className={styles.paragraph}>
                  Bitten by a <strong>radioactive spider</strong> during a science exhibition, high school student Peter Parker gained the proportional strength and agility of an arachnid.
                </p>
              </div>
              <div className={styles.storyBeat}>
                <p className={styles.paragraph}>
                  Initially using his powers for personal gain, a tragic turn of events led to the death of his beloved <strong>Uncle Ben</strong>, teaching Peter a harsh lesson that would define his life forever.
                </p>
              </div>
              <div className={styles.storyBeat}>
                <p className={styles.paragraph}>
                  "With great power, there must also come <strong>great responsibility</strong>." Guided by these words, Peter Parker swings through the streets of New York City as the Amazing Spider-Man.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default OriginSection
