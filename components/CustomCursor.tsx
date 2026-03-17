'use client'
import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const mouse = useRef({ x: 0, y: 0 })
  const ring = useRef({ x: 0, y: 0 })
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY }
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + 'px'
        cursorRef.current.style.top = e.clientY + 'px'
      }
    }

    const animate = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.12
      ring.current.y += (mouse.current.y - ring.current.y) * 0.12
      if (ringRef.current) {
        ringRef.current.style.left = ring.current.x + 'px'
        ringRef.current.style.top = ring.current.y + 'px'
      }
      rafRef.current = requestAnimationFrame(animate)
    }
    animate()

    const onEnter = () => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = 'translate(-50%,-50%) scale(2)'
      }
      if (ringRef.current) {
        ringRef.current.style.width = '56px'
        ringRef.current.style.height = '56px'
        ringRef.current.style.opacity = '0.3'
      }
    }
    const onLeave = () => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = 'translate(-50%,-50%) scale(1)'
      }
      if (ringRef.current) {
        ringRef.current.style.width = '36px'
        ringRef.current.style.height = '36px'
        ringRef.current.style.opacity = '0.6'
      }
    }

    document.addEventListener('mousemove', onMove)

    const addListeners = () => {
      document.querySelectorAll('a, button').forEach(el => {
        el.addEventListener('mouseenter', onEnter)
        el.addEventListener('mouseleave', onLeave)
      })
    }
    addListeners()

    const mutObs = new MutationObserver(addListeners)
    mutObs.observe(document.body, { childList: true, subtree: true })

    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafRef.current)
      mutObs.disconnect()
    }
  }, [])

  return (
    <>
      <div
        ref={cursorRef}
        style={{
          width: 12, height: 12,
          background: 'var(--gold)',
          borderRadius: '50%',
          position: 'fixed',
          top: 0, left: 0,
          pointerEvents: 'none',
          zIndex: 9999,
          transform: 'translate(-50%, -50%)',
          transition: 'transform 0.15s ease, width 0.2s, height 0.2s',
          mixBlendMode: 'multiply',
        }}
      />
      <div
        ref={ringRef}
        style={{
          width: 36, height: 36,
          border: '1.5px solid var(--gold)',
          borderRadius: '50%',
          position: 'fixed',
          top: 0, left: 0,
          pointerEvents: 'none',
          zIndex: 9998,
          transform: 'translate(-50%, -50%)',
          transition: 'width 0.3s, height 0.3s, opacity 0.3s',
          opacity: 0.6,
        }}
      />
    </>
  )
}
