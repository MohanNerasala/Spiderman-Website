import React, { useRef } from 'react'
import gsap from 'gsap'
import { useGSAPSection } from '../hooks/useGSAP'
import { useIsMobile } from '../hooks/useIsMobile'
import globalStyles from './sections.module.css'
import styles from './TimelineSection.module.css'

interface TimelineEvent {
  year: string
  title: string
  description: string
}

const timelineEvents: TimelineEvent[] = [
  { year: '2002', title: 'The First Bite', description: 'A fateful field trip to Columbia University genetics laboratory changes everything.' },
  { year: '2004', title: 'First Suit', description: 'Transitioning from makeshift wrestling gear to the iconic red and blue spandex.' },
  { year: '2005', title: 'Uncle Ben', description: 'A tragic loss that forged the defining principle of great power and responsibility.' },
  { year: '2008', title: 'First Villain', description: 'The Green Goblin emerges, challenging Peter to push beyond his limits.' },
  { year: '2016', title: 'Avengers Join', description: 'Recruited by Tony Stark, stepping into a much larger universe of heroes.' },
  { year: '2021', title: 'Multiverse', description: 'Reality fractures, uniting different iterations of the web-slinger across dimensions.' }
]

const TimelineSection: React.FC = () => {
  const lineRef = useRef<SVGPathElement>(null)
  const isMobile = useIsMobile()

  const containerRef = useGSAPSection(() => {
    // Animate the line drawing
    if (lineRef.current) {
      const length = lineRef.current.getTotalLength()
      gsap.set(lineRef.current, { strokeDasharray: length, strokeDashoffset: length })
      
      gsap.to(lineRef.current, {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 50%',
          end: 'bottom 80%',
          scrub: 1
        }
      })
    }

    // Animate each node
    const nodes = gsap.utils.toArray<HTMLElement>('.' + styles.node)
    nodes.forEach((node) => {
      const content = node.querySelector('.' + styles.nodeContent)
      const point = node.querySelector('.' + styles.nodePoint)
      const connector = node.querySelector('.' + styles.connector)

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: node,
          start: 'top 75%',
          once: true
        }
      })

      if (point) {
        tl.to(point, { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(1.7)' })
      }
      if (connector) {
        tl.to(connector, { width: window.innerWidth > 768 ? '15%' : '20px', duration: 0.3, ease: 'power2.out' }, '-=0.1')
      }
      if (content) {
        tl.to(content, { x: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }, '-=0.1')
      }
    })
  }, [isMobile])

  return (
    <section ref={containerRef} className={globalStyles.section}>
      <div className={globalStyles.container}>
        <h2 className={globalStyles.sectionLabel}>CHRONOLOGY</h2>
        
        <div className={styles.timelineContainer}>
          <div className={styles.centerLineContainer}>
            <svg width="100%" height="100%" preserveAspectRatio="none">
              <path 
                ref={lineRef}
                d="M 1 0 L 1 10000" 
                className={styles.centerLine}
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </div>

          {timelineEvents.map((event, index) => {
            const isLeft = index % 2 === 0
            return (
               <div key={index} className={`${styles.node} ${isLeft ? styles.nodeLeft : styles.nodeRight}`}>
                <div className={styles.connector}></div>
                <div className={styles.nodePoint}></div>
                <div className={styles.nodeContent}>
                  <div className={styles.year}>{event.year}</div>
                  <h3 className={styles.title}>{event.title}</h3>
                  <p className={styles.description}>{event.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default TimelineSection
