'use client'
import { useEffect, useMemo, useState } from 'react'

const STEPS = [
  { key:'see',  label:'Name 5 things you can see',    count:5 },
  { key:'touch',label:'Name 4 things you can touch',  count:4 },
  { key:'hear', label:'Name 3 things you can hear',   count:3 },
  { key:'smell',label:'Name 2 things you can smell',  count:2 },
  { key:'taste',label:'Name 1 thing you can taste (optional)', count:1, optional:true },
] as const

type Entry = { text: string; done: boolean }

export default function Grounding(){
  const [stepIdx,setStepIdx] = useState(0)
  const step = STEPS[stepIdx]
  const [entries,setEntries] = useState<Entry[]>(()=>Array.from({length: step.count},()=>({text:'',done:false})))
  const progress = useMemo(()=> (stepIdx/STEPS.length*100),[stepIdx])

  useEffect(()=>{ setEntries(Array.from({length: step.count},()=>({text:'',done:false}))) },[stepIdx])

  const filled = entries.filter(e=>e.done || e.text.trim().length>0).length

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 space-y-8">
      <h1 className="text-3xl font-bold">Grounding 5‑4‑3‑2‑1</h1>
      <div className="w-full h-2 rounded bg-slate-200 dark:bg-slate-800"><div className="h-full bg-emerald-500 rounded" style={{width:`${progress}%`}}/></div>
      <section className="space-y-4">
        <h2 className="text-xl font-semibold" aria-live="polite">{step.label}</h2>
        <div className="grid gap-3">
          {entries.map((e,idx)=> (
            <div key={idx} className="flex items-center gap-3">
              <input className="flex-1 px-3 py-2 rounded-lg border bg-transparent" placeholder={`Item ${idx+1}`} value={e.text} onChange={ev=>{
                const v=ev.target.value; setEntries(prev=> prev.map((x,i)=> i===idx?{...x,text:v,done:v.trim().length>0}:x))
              }} />
              <input type="checkbox" aria-label={`Done ${idx+1}`} checked={e.done || e.text.trim().length>0} onChange={ev=> setEntries(prev=> prev.map((x,i)=> i===idx?{...x,done:ev.target.checked}:x)) } />
            </div>
          ))}
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 rounded-lg bg-slate-200 dark:bg-slate-800" disabled={stepIdx===0} onClick={()=>setStepIdx(i=>Math.max(0,i-1))}>Back</button>
          <button className="px-4 py-2 rounded-lg bg-emerald-600 text-white disabled:opacity-50" disabled={filled < (step.optional?0:step.count)} onClick={()=> setStepIdx(i=> Math.min(STEPS.length-1,i+1))}>
            {stepIdx===STEPS.length-1? 'Finish' : 'Next'}
          </button>
        </div>
      </section>

      {stepIdx===STEPS.length-1 && (
        <section className="space-y-4">
          <h3 className="text-lg font-semibold">How anxious do you feel now? (0–10)</h3>
          <input type="range" min={0} max={10} defaultValue={3} className="w-full" onChange={(e)=>{
            try{ const arr=JSON.parse(localStorage.getItem('sessions')||'[]'); arr.push({tool:'grounding',ts:Date.now(),post:parseInt(e.target.value)}); localStorage.setItem('sessions',JSON.stringify(arr)) }catch{}
          }} />
          <p className="text-sm text-slate-500">Saved locally.</p>
        </section>
      )}
    </div>
  )
}
