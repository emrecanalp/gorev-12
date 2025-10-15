import { Link } from 'react-router-dom'
import { Users2, BedDouble, Bath, MapPin } from 'lucide-react'
import type { Home } from '../types/home'
import { formatPrice } from '../utils/format'

export default function HomeCard({ home }: { home: Home }) {
  return (
    <div className="card">
      <div className="h-48 w-full overflow-hidden">
        <img src={home.imageUrl} alt={home.title} className="h-48 w-full object-cover" />
      </div>
      <div className="p-4">
        <Link 
        to={`/homes/${home.id}`} 
        className="block text-lg font-semibold hover:underline">
          {home.title}
        </Link>
        <div className="mt-1 flex items-center gap-2 text-slate-500 text-sm">
          <MapPin className="h-4 w-4" />
          <span>{home.location}</span>
        </div>
        <div className="mt-3 flex items-center gap-5 text-slate-600 text-sm">
          <span 
          className="inline-flex items-center gap-2"><Users2 className="h-4 w-4" />{home.guests} guests</span>
          <span 
          className="inline-flex items-center gap-2"><BedDouble className="h-4 w-4" />{home.bedrooms} bed</span>
          <span 
          className="inline-flex items-center gap-2"><Bath 
          className="h-4 w-4" />{home.bathrooms} bath</span>
        </div>
        <div 
        className="mt-4 text-lg font-semibold">{formatPrice(home.pricePerNight)}<span 
        className="text-sm font-normal text-slate-500"> /night</span></div>
      </div>
    </div>
  )
}