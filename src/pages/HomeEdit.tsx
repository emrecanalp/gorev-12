import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import HomeForm from '../components/HomeForm'
import { getHome, updateHome } from '../api/homes'
import type { Home } from '../types/home'

export default function HomeEdit() {
  const { id } = useParams()
  const nav = useNavigate()
  const [initial, setInitial] = useState<Home | undefined>()

  useEffect(() => { if (id) getHome(id).then(setInitial) }, [id])

  const onSubmit = async (payload: Home) => {
    if (!id) return
    await updateHome(id, payload)
    nav(`/homes/${id}`)
  }

  if (!initial) return <div className="container-page py-8">Loading...</div>

  return (
    <div className="container-page py-8">
      <a href={`/homes/${id}`} className="text-slate-500 hover:underline">← Back to detail</a>
      <h1 className="mt-2 text-3xl font-bold">Edit Home</h1>
      <div className="card mt-4 p-6">
        <HomeForm initial={initial} onSubmit={onSubmit} submittingLabel="Save Changes" />
      </div>
    </div>
  )
}