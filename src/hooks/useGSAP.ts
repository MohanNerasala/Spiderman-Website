import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useGSAPSection(animateFn: (ctx: gsap.Context) => void, deps: any[] = []) {
  const ref = useRef<HTMLElement>(null)
  
  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context((self) => animateFn(self as gsap.Context), ref.current)
    return () => ctx.revert()
  }, deps)
  
  return ref
}
