import React from 'react'
import gsap from 'gsap'
import { useGSAPSection } from '../hooks/useGSAP'
import globalStyles from './sections.module.css'
import styles from './StatsSection.module.css'

interface StatData {
  id: string
  label: string
  endValue: number
  unit: string
}

const stats: StatData[] = [
  { id: 'strength', label: 'Maximum Lifting Capacity', endValue: 10, unit: 'TONS' },
  { id: 'speed', label: 'Terminal Velocity', endValue: 200, unit: 'MPH' },
  { id: 'web-range', label: 'Effective Web-Line Range', endValue: 60, unit: 'FT' },
  { id: 'reflexes', label: 'Nerve Conduction Velocity', endValue: 40, unit: 'MS' }
]

const StatsSection: React.FC = () => {
  const containerRef = useGSAPSection(() => {
    const items = gsap.utils.toArray<HTMLElement>('.' + styles.statItem)
    const counters = gsap.utils.toArray<HTMLElement>('.' + styles.statValue)
    
    // Create a master timeline for the entire section
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 75%',
        once: true
      }
    })

    // 1. Animate the cards dropping in
    tl.fromTo(items, 
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out' }
    )
    
    // 2. Animate the counters counting up simultaneously
    counters.forEach((counter) => {
      const targetValue = parseFloat(counter.getAttribute('data-target') || '0')
      
      tl.to(counter, {
        innerHTML: targetValue,
        duration: 2,
        ease: 'power2.out',
        snap: { innerHTML: 1 }
      }, '<0.2') // Start slightly after the cards begin dropping
    })
  })

  return (
    <section ref={containerRef} className={globalStyles.section}>
      <div className={globalStyles.container}>
        <h2 className={globalStyles.sectionLabel}>PERFORMANCE DATA</h2>
        
        <div className={styles.hudContainer}>
          <div className={styles.cornerTopRight}></div>
          <div className={styles.cornerBottomLeft}></div>
          <div className={styles.scanlineOverlay}></div>
          
          <div className={styles.grid}>
            {stats.map((stat) => (
              <div key={stat.id} className={styles.statItem}>
                <div className={styles.statValueContainer}>
                  <span className={styles.statValue} data-target={stat.endValue}>0</span>
                  <span className={styles.statUnit}>{stat.unit}</span>
                </div>
                <span className={styles.statLabel}>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default StatsSection
