import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getHome, deleteHome } from '../api/homes'
import type { Home } from '../types/home'
import { Users2, BedDouble, Bath, MapPin, Pencil, Trash2 } from 'lucide-react'
import { formatPrice } from '../utils/format'

export default function HomeDetail() {
  const { id } = useParams()
  const nav = useNavigate()
  const [home, setHome] = useState<Home | null>(null)

  useEffect(() => {
    if (id) getHome(id).then(setHome)
  }, [id])

  const onDelete = async () => {
    if (!id) return
    if (confirm('Delete this home?')) {
      await deleteHome(id)
      nav('/')
    }
  }

  if (!home) return <div className="container-page py-10">Loading...</div>

  return (
    <div className="container-page py-8">
      <Link to="/" className="text-slate-500 hover:underline">← Back to listings</Link>

      <div className="card mt-4">
        <img src={home.imageUrl} alt={home.title} className="h-80 w-full object-cover" />
        <div className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold">{home.title}</h2>
              <div className="mt-1 flex items-center gap-2 text-slate-500 text-sm">
                <MapPin className="h-4 w-4" /><span>{home.location}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Link to={`/homes/${home.id}/edit`} className="btn-secondary"><Pencil className="h-4 w-4 mr-2"/>Edit</Link>
              <button onClick={onDelete} className="btn-secondary"><Trash2 className="h-4 w-4 mr-2"/>Delete</button>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-6 text-slate-600">
            <span className="inline-flex items-center gap-2"><Users2 className="h-4 w-4" />{home.guests} Guests</span>
            <span className="inline-flex items-center gap-2"><BedDouble className="h-4 w-4" />{home.bedrooms} Bedrooms</span>
            <span className="inline-flex items-center gap-2"><Bath className="h-4 w-4" />{home.bathrooms} Bathrooms</span>
          </div>

          <div className="mt-6">
            <h3 className="font-semibold mb-1">About this place</h3>
            <p className="text-slate-600">{home.description}</p>
          </div>

          <div className="mt-6">
            <h3 className="font-semibold mb-2">Amenities</h3>
            <div className="flex flex-wrap gap-2">
              {home.amenities.map((a, i) => (
                <span key={i} className="badge">{a}</span>
              ))}
            </div>
          </div>

          <div className="mt-8 flex items-center justify-between">
            <div className="text-2xl font-semibold">{formatPrice(home.pricePerNight)}<span className="text-sm font-normal text-slate-500"> /night</span></div>
            <button className="btn-primary">Reserve</button>
          </div>
        </div>
      </div>
    </div>
  )
}