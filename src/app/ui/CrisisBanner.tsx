'use client'
import { useState } from 'react'
export default function CrisisBanner(){
  const [closed,setClosed] = useState(false)
  if (closed) return null
  return (
    <div className="mt-4 rounded-xl border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950 text-red-800 dark:text-red-200 p-4 text-sm" role="note" aria-live="polite">
      <div className="flex gap-3 items-start">
        <p>
          If you’re in immediate danger, call your local emergency number. Need to talk? Search your national mental health helpline. This site is educational and doesn’t replace professional care.
        </p>
        <button onClick={()=>setClosed(true)} className="ml-auto text-red-700 dark:text-red-300 underline">Dismiss</button>
      </div>
    </div>
  )
}
