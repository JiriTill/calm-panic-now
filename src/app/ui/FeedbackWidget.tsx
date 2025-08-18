'use client'
import { useState } from 'react'
export type Feedback = { pre?: number; post?: number; note?: string }
export default function FeedbackWidget({onDone}:{ onDone?: (fb:Feedback)=>void }){
  const [pre,setPre] = useState<number|undefined>()
  const [post,setPost] = useState<number|undefined>()
  const [note,setNote] = useState('')
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium">How anxious do you feel right now? (0–10)</label>
        <input type="range" min={0} max={10} value={pre ?? 5} onChange={e=>setPre(parseInt(e.target.value))} className="w-full"/>
        <div className="text-xs mt-1">{pre ?? 5}</div>
      </div>
      <div>
        <label className="block text-sm font-medium">After the exercise, rate again</label>
        <input type="range" min={0} max={10} value={post ?? 3} onChange={e=>setPost(parseInt(e.target.value))} className="w-full"/>
        <div className="text-xs mt-1">{post ?? 3}</div>
      </div>
      <div>
        <label className="block text-sm font-medium">Optional note</label>
        <input value={note} onChange={e=>setNote(e.target.value)} className="w-full px-3 py-2 rounded-lg border bg-transparent" placeholder="What helped?"/>
      </div>
      <button className="px-4 py-2 rounded-lg bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900" onClick={()=>onDone?.({pre,post,note})}>Save locally</button>
    </div>
  )
}
