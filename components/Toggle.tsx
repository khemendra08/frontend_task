'use client'

export function Toggle({ view, onChange }: { view: 'card' | 'row', onChange: (v: 'card' | 'row') => void }) {
  return (
    <div className="space-x-2">
      <button onClick={() => onChange('card')} className={`p-2 ${view === 'card' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>Card View</button>
      <button onClick={() => onChange('row')} className={`p-2 ${view === 'row' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>Row View</button>
    </div>
  )
}