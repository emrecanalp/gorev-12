import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import HomeCard from '../components/HomeCard'
import { getHomes } from '../api/homes'
import type { Home } from '../types/home'

export default function HomeList() {
  const [data, setData] = useState<Home[]>([])
  const [q, setQ] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getHomes().then(res => setData(res)).finally(() => setLoading(false))
  }, [])

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase()
    if (!s) return data
    return data.filter(h => [h.title, h.location].some(x => x.toLowerCase().includes(s)))
  }, [q, data])

  return (
    <div className="container-page py-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Explore Homes</h1>
          <p className="text-slate-500">Find your perfect stay</p>
        </div>
        <Link to="/homes/new" className="btn-primary">+ Add Home</Link>
      </div>

      <div className="mt-6">
        <input className="input w-full md:w-80" placeholder="Search by title or location" value={q} onChange={e => setQ(e.target.value)} />
      </div>

      {loading ? (
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-64 animate-pulse rounded-2xl bg-slate-200" />
          ))}
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(h => <HomeCard key={h.id} home={h} />)}
        </div>
      )}
    </div>
  )
}