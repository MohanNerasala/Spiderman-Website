import React from 'react'
import gsap from 'gsap'
import { useGSAPSection } from '../hooks/useGSAP'
import { useIsMobile } from '../hooks/useIsMobile'
import globalStyles from './sections.module.css'
import styles from './PowersSection.module.css'

interface Power {
  id: string
  title: string
  description: string
  icon: string
}

const powers: Power[] = [
  {
    id: 'wall-crawling',
    title: 'Wall-Crawling',
    description: 'Electro-static force manipulation allows adherence to solid surfaces, enabling vertical scaling and ceiling attachment.',
    icon: '🕷️'
  },
  {
    id: 'spider-sense',
    title: 'Spider-Sense',
    description: 'Pre-cognitive danger detection system that alerts to immediate threats before they manifest.',
    icon: '⚡'
  },
  {
    id: 'web-shooting',
    title: 'Web-Shooting',
    description: 'Proprietary synthetic polymer compound dispensed through customized wrist-mounted delivery systems.',
    icon: '🕸️'
  },
  {
    id: 'super-strength',
    title: 'Super Strength',
    description: 'Proportional strength of a spider, capable of lifting up to 10 tons under optimal conditions.',
    icon: '💪'
  },
  {
    id: 'agility-reflexes',
    title: 'Agility & Reflexes',
    description: 'Equilibrium and coordination enhanced far beyond natural human limits, reaction time measured in milliseconds.',
    icon: '🌪️'
  },
  {
    id: 'healing-factor',
    title: 'Healing Factor',
    description: 'Accelerated cellular regeneration capable of recovering from extensive trauma in hours rather than weeks.',
    icon: '❤️‍🩹'
  }
]

const PowersSection: React.FC = () => {
  const isMobile = useIsMobile()
  const offsetX = 250
  const offsetY = 160

  const mobileX = 0

  const finalPositions = isMobile
    ? [
        { x: mobileX, y: 130 }, // 0: Right (Wall-Crawling)
        { x: mobileX, y: 230 }, // 1: Left (Spider-Sense) - pulled down slightly
        { x: mobileX, y: 294 }, // 2: Right (Web-Shooting) - kept at 130 + 82*2
        { x: mobileX, y: 380 }, // 3: Left (Super Strength) - pulled closer
        { x: mobileX, y: 458 }, // 4: Right (Agility & Reflexes) - kept at 130 + 82*4
        { x: mobileX, y: 520 }, // 5: Left (Healing Factor) - pulled closer
      ]
    : [
        { x: -offsetX, y: -offsetY }, // Top Left
        { x: -offsetX - 40, y: 0 },   // Mid Left
        { x: -offsetX, y: offsetY },  // Bottom Left
        { x: offsetX, y: -offsetY },  // Top Right
        { x: offsetX + 40, y: 0 },    // Mid Right
        { x: offsetX, y: offsetY },   // Bottom Right
      ]

  const containerRef = useGSAPSection(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'center center',
        end: '+=350%', // Perfect scrolling duration
        pin: true,
        scrub: 1.5, // 1.5 adds a beautiful smoothing delay to the scrub
      }
    })

    const nodes = gsap.utils.toArray('.' + styles.powerNode) as HTMLElement[]
    const lines = gsap.utils.toArray('.' + styles.webLine) as SVGLineElement[]
    const icons = gsap.utils.toArray('.' + styles.powerIcon) as HTMLElement[]
    const contents = gsap.utils.toArray('.' + styles.powerContent) as HTMLElement[]
    const spiderLogo = document.querySelector('.' + styles.spiderLogo)
    const spidermanText = document.querySelector('.' + styles.spidermanText)

    // INITIAL SETUP
    // Node is 0x0, so setting x,y places it exactly at the coordinate
    gsap.set(nodes, { x: (i) => finalPositions[i].x, y: (i) => finalPositions[i].y })
    
    // Icon centered on the 0x0 node
    gsap.set(icons, { scale: 0, opacity: 0, xPercent: -50, yPercent: -50 })
    
    // Content folded
    contents.forEach((content, i) => {
      const isLeft = isMobile ? (i % 2 !== 0) : (i < 3)
      if (isMobile) {
        gsap.set(content, {
          rotationY: isLeft ? -90 : 90,
          opacity: 0,
          transformOrigin: isLeft ? 'right center' : 'left center',
          xPercent: 0,
          yPercent: -50
        })
      } else {
        gsap.set(content, { 
          rotationY: isLeft ? -90 : 90, 
          opacity: 0, 
          transformOrigin: isLeft ? 'right center' : 'left center',
          yPercent: -50 
        })
      }
    })
    
    // Set SVG lines length dynamically for the drawing effect
    lines.forEach(line => {
      const length = line.getTotalLength()
      gsap.set(line, { strokeDasharray: length, strokeDashoffset: length })
    })

    // ANIMATION CHOREOGRAPHY

    // 1. Web lines shoot out from center
    tl.to(lines, {
      strokeDashoffset: 0,
      duration: 1.5,
      stagger: 0.15,
      ease: 'power2.inOut'
    }, 0)

    // 2. Nodes light up exactly as lines hit them
    tl.to(icons, {
      scale: 1,
      opacity: 1,
      duration: 0.8,
      stagger: 0.15,
      ease: 'back.out(2)'
    }, 0.5)

    // 3. The Activation Pulse
    const activationTime = 2.0

    // Center Avatar ignites
    tl.to(spiderLogo, {
      scale: 1.4,
      color: 'rgba(232, 25, 44, 1)',
      filter: 'drop-shadow(0 0 40px rgba(232,25,44,1))',
      duration: 1,
      ease: 'elastic.out(1, 0.4)'
    }, activationTime)

    // Title glitches in
    tl.to(spidermanText, {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 1,
      ease: 'elastic.out(1, 0.5)'
    }, activationTime + 0.2)

    // 4. A shockwave triggers
    tl.to(spiderLogo, {
      scale: 1,
      duration: 0.8,
      ease: 'power2.inOut'
    }, activationTime + 1)

    // 5. Data Panels fold open
    tl.to(contents, {
      rotationY: 0,
      rotationX: 0,
      opacity: 1,
      duration: 1,
      stagger: 0.1,
      ease: 'expo.out'
    }, activationTime + 1.2)

    // Web lines pulse
    tl.to(lines, {
      stroke: 'rgba(232, 25, 44, 0.6)',
      filter: 'drop-shadow(0 0 8px rgba(232,25,44,0.8))',
      duration: 0.5,
      ease: 'power2.out'
    }, activationTime)

    // 4. Holographic cards unfold horizontally
    tl.to(contents, {
      rotationY: 0,
      opacity: 1,
      duration: 1.2,
      stagger: 0.1,
      ease: 'expo.out'
    }, activationTime + 0.3)
  }, [isMobile])

  return (
    <section ref={containerRef} className={styles.pinSection}>
      <div className={styles.sectionLabelContainer}>
        <div className={globalStyles.container}>
          <h2 className={globalStyles.sectionLabel}>ABILITIES</h2>
        </div>
      </div>
      
      <div className={styles.animationContainer}>
        
        {/* The Web Canvas */}
        <svg className={styles.webCanvas}>
          {finalPositions.map((pos, i) => (
            <line
              key={`line-${i}`}
              className={styles.webLine}
              x1={isMobile ? 0 : 0} y1={isMobile ? 80 : 0}
              x2={pos.x} y2={pos.y}
            />
          ))}
        </svg>

        {/* Central Avatar */}
        <div className={styles.avatarContainer}>
          <svg viewBox="0 0 100 100" className={styles.spiderLogo}>
            <ellipse cx="50" cy="40" rx="8" ry="12" />
            <ellipse cx="50" cy="65" rx="12" ry="20" />
            <path d="M 45 35 Q 25 10 5 25" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M 45 40 Q 20 25 5 45" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M 42 60 Q 20 65 10 90" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M 45 70 Q 30 90 20 100" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M 55 35 Q 75 10 95 25" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M 55 40 Q 80 25 95 45" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M 58 60 Q 80 65 90 90" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M 55 70 Q 70 90 80 100" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" />
          </svg>
          <h2 className={styles.spidermanText}>SPIDER-MAN</h2>
        </div>

        {/* Static Positioned Nodes */}
        {powers.map((power, i) => (
          <div key={power.id} className={styles.powerNode}>
            <div className={styles.powerIcon}>{power.icon}</div>
            <div className={`${styles.powerContent} ${isMobile ? (i % 2 !== 0 ? styles.contentLeft : styles.contentRight) : (i < 3 ? styles.contentLeft : styles.contentRight)}`}>
              <h3>{power.title}</h3>
              <p>{power.description}</p>
            </div>
          </div>
        ))}

      </div>
    </section>
  )
}

export default PowersSection
