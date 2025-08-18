'use client'
import { useEffect, useState } from 'react'
import BreathRing, { PatternKey } from '../../ui/BreathRing'
import FeedbackWidget, { type Feedback } from '../../ui/FeedbackWidget'

export default function BoxBreathingPage(){
  const [pattern,setPattern] = useState<PatternKey>('4-4-4-4')
  const [duration,setDuration] = useState(120)
  const [reduced,setReduced] = useState(false)
  const [saved,setSaved] = useState<Feedback|null>(null)

  useEffect(()=>{
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(media.matches)
    const onChange = () => setReduced(media.matches)
    media.addEventListener('change', onChange)
    return ()=> media.removeEventListener('change', onChange)
  },[])

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 space-y-8">
      <h1 className="text-3xl font-bold">Box Breathing</h1>
      <p className="text-slate-600 dark:text-slate-300">Follow the ring and the prompts. Adjust pattern and duration to your comfort.</p>

      <div className="flex flex-wrap gap-4 items-center">
        <label className="text-sm">Pattern
          <select className="ml-2 px-3 py-2 rounded-lg border bg-transparent" value={pattern} onChange={e=>setPattern(e.target.value as PatternKey)}>
            <option value="4-4-4-4">4-4-4-4 (default)</option>
            <option value="3-3-3-3">3-3-3-3</option>
            <option value="5-5-5-5">5-5-5-5</option>
            <option value="4-7-8">4-7-8</option>
          </select>
        </label>
        <label className="text-sm">Duration
          <select className="ml-2 px-3 py-2 rounded-lg border bg-transparent" value={duration} onChange={e=>setDuration(parseInt(e.target.value))}>
            <option value={120}>2 min</option>
            <option value={180}>3 min</option>
            <option value={240}>4 min</option>
          </select>
        </label>
        <label className="text-sm flex items-center gap-2"><input type="checkbox" checked={reduced} onChange={e=>setReduced(e.target.checked)}/> Reduced motion</label>
      </div>

      <BreathRing durationSec={duration} pattern={pattern} reducedMotion={reduced} />

      <section className="grid gap-4">
        <h2 className="text-xl font-semibold">How did it go?</h2>
        <FeedbackWidget onDone={(fb)=>{ setSaved(fb); try{ const arr=JSON.parse(localStorage.getItem('sessions')||'[]'); arr.push({tool:'box-breathing',ts:Date.now(),...fb}); localStorage.setItem('sessions',JSON.stringify(arr))}catch{} }} />
        {saved && (
          <p className="text-sm text-slate-600 dark:text-slate-300">Saved locally. You can clear your browser storage anytime.</p>
        )}
      </section>
    </div>
  )
}
