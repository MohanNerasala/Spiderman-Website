import React from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { useGSAPSection } from '../hooks/useGSAP'
import globalStyles from './sections.module.css'
import styles from './ArsenalSection.module.css'

interface ArsenalItem {
  id: string
  name: string
  specs: { label: string; value: string }[]
  alignment: 'left' | 'right'
}

const arsenalItems: ArsenalItem[] = [
  {
    id: 'web-shooters',
    name: 'Web-Shooters',
    alignment: 'left',
    specs: [
      { label: 'Tensile Strength', value: '120 lbs per sq mm' },
      { label: 'Range', value: '60+ feet' },
      { label: 'Cartridge Capacity', value: '300 PSI' },
      { label: 'Trigger Pressure', value: '65 lbs' }
    ]
  },
  {
    id: 'spider-suit',
    name: 'Spider-Suit',
    alignment: 'right',
    specs: [
      { label: 'Material', value: 'Spandex / Kevlar Weave' },
      { label: 'Eye Lenses', value: 'Polarized, Auto-Focus' },
      { label: 'Thermal Resistance', value: 'Up to 800°F' },
      { label: 'Weight', value: '2.4 lbs' }
    ]
  },
  {
    id: 'web-cartridges',
    name: 'Fluid Cartridges',
    alignment: 'left',
    specs: [
      { label: 'State', value: 'Pressurized Liquid' },
      { label: 'Expansion Rate', value: '1000x volume' },
      { label: 'Dissolve Time', value: '1-2 Hours' },
      { label: 'Composition', value: 'Classified Polymer' }
    ]
  }
]

const ArsenalSection: React.FC = () => {
  const containerRef = useGSAPSection(() => {
    const isMobile = window.innerWidth < 768
    const items = gsap.utils.toArray<HTMLElement>('.' + styles.itemContainer)
    
    items.forEach((item) => {
      ScrollTrigger.create({
        trigger: item,
        start: 'center center',
        end: '+=100%',
        pin: true,
        scrub: 1,
        pinSpacing: true,
      })

      const block = item.querySelector('.' + styles.itemBlock)
      const specs = item.querySelectorAll('.' + styles.specItem)

      if (block) {
        if (isMobile) {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: item,
              start: 'top 80%',
              end: 'center center',
              scrub: 1
            }
          })
          tl.fromTo(block,
            { opacity: 0, y: 50, scale: 0.95 },
            { opacity: 1, y: 0, scale: 1, duration: 0.5 }
          ).fromTo(specs,
            { opacity: 0, x: -20 },
            { opacity: 1, x: 0, stagger: 0.1, duration: 0.5 },
            "-=0.3"
          )
        } else {
          gsap.fromTo(block, 
            { opacity: 0, scale: 0.9 }, 
            { 
              opacity: 1, 
              scale: 1, 
              duration: 0.5,
              scrollTrigger: {
                trigger: item,
                start: 'top 60%',
                end: 'center center',
                scrub: 1
              }
            }
          )
        }
      }
    })
  })

  return (
    <section ref={containerRef} className={globalStyles.section} style={{ padding: 0 }}>
      {/* Absolute label that stays at top of section */}
      <div style={{ position: 'absolute', top: '6rem', left: '0', width: '100%', zIndex: 10 }}>
        <div className={globalStyles.container}>
          <h2 className={globalStyles.sectionLabel}>GEAR & WEAPONS</h2>
        </div>
      </div>

      {arsenalItems.map((item) => (
        <div key={item.id} className={styles.itemContainer}>
          <div className={`${styles.itemBlock} ${item.alignment === 'left' ? styles.alignLeft : styles.alignRight}`}>
            <div className={styles.scanlineOverlay}></div>
            <h3 className={styles.title}>{item.name}</h3>
            <div className={styles.accentLine}></div>
            
            <ul className={styles.specsList}>
              {item.specs.map((spec, i) => (
                <li key={i} className={styles.specItem}>
                  <span className={styles.specLabel}>{spec.label}</span>
                  <span className={styles.specValue}>{spec.value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </section>
  )
}

export default ArsenalSection
