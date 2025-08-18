'use client'
import { motion } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'

export type PatternKey = '4-4-4-4' | '3-3-3-3' | '5-5-5-5' | '4-7-8'

type Phase = { label: string; seconds: number; targetScale: number }

function getPattern(p: PatternKey): Phase[] {
  switch (p){
    case '4-7-8':
      return [
        { label:'Inhale', seconds:4, targetScale:1.1 },
        { label:'Hold', seconds:7, targetScale:1.1 },
        { label:'Exhale', seconds:8, targetScale:0.7 },
      ]
    case '3-3-3-3': return [
      {label:'Inhale',seconds:3,targetScale:1.1},
      {label:'Hold',seconds:3,targetScale:1.1},
      {label:'Exhale',seconds:3,targetScale:0.7},
      {label:'Hold',seconds:3,targetScale:0.7},
    ]
    case '5-5-5-5': return [
      {label:'Inhale',seconds:5,targetScale:1.1},
      {label:'Hold',seconds:5,targetScale:1.1},
      {label:'Exhale',seconds:5,targetScale:0.7},
      {label:'Hold',seconds:5,targetScale:0.7},
    ]
    default: return [
      {label:'Inhale',seconds:4,targetScale:1.1},
      {label:'Hold',seconds:4,targetScale:1.1},
      {label:'Exhale',seconds:4,targetScale:0.7},
      {label:'Hold',seconds:4,targetScale:0.7},
    ]
  }
}

export default function BreathRing({
  durationSec = 120,
  pattern = '4-4-4-4',
  reducedMotion = false,
}:{ durationSec?: number; pattern?: PatternKey; reducedMotion?: boolean }){
  const phases = useMemo(()=>getPattern(pattern),[pattern])
  const [phaseIndex,setPhaseIndex] = useState(0)
  const [secondsLeft,setSecondsLeft] = useState(phases[0].seconds)
  const [totalLeft,setTotalLeft] = useState(durationSec)
  const raf = useRef<number>()
  const last = useRef<number>()

  useEffect(()=>{ setPhaseIndex(0); setSecondsLeft(phases[0].seconds) },[phases])
  useEffect(()=>{ setTotalLeft(durationSec) },[durationSec])

  useEffect(()=>{
    let running = true
    function tick(ts: number){
      if (!last.current) last.current = ts
      const dt = (ts - last.current)/1000
      last.current = ts
      if (!running) return
      setSecondsLeft((s)=>{
        if (s - dt <= 0){
          setPhaseIndex((i)=> (i+1) % phases.length)
          return phases[(phaseIndex+1)%phases.length].seconds
        }
        return s - dt
      })
      setTotalLeft((t)=> Math.max(0, t - dt))
      if (running && totalLeft - dt > 0){ raf.current = requestAnimationFrame(tick) }
    }
    raf.current = requestAnimationFrame(tick)
    return ()=>{ running=false; if (raf.current) cancelAnimationFrame(raf.current); last.current = undefined }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[pattern, durationSec, phaseIndex, phases])

  const current = phases[phaseIndex]

  return (
    <div className="grid place-items-center gap-6">
      <div className="text-2xl font-semibold" aria-live="polite">{current.label}</div>
      <div className="text-sm text-slate-500" aria-live="polite">{Math.ceil(secondsLeft)} s</div>
      <div className="h-48 w-48 grid place-items-center">
        {reducedMotion ? (
          <div className="h-40 w-40 rounded-full border-4 border-sky-400 grid place-items-center">
            <span className="sr-only">Breathing ring (reduced motion)</span>
          </div>
        ) : (
          <motion.div
            key={phaseIndex}
            initial={{ scale: current.label === 'Exhale' ? 1.1 : 0.7 }}
            animate={{ scale: current.targetScale }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="h-40 w-40 rounded-full border-8 border-sky-400/70 shadow-inner"
            aria-hidden
          />
        )}
      </div>
      <div className="text-xs text-slate-500">Time left: {Math.ceil(totalLeft)} s</div>
    </div>
  )
}
