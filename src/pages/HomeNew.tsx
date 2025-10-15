import { useNavigate } from 'react-router-dom'
import HomeForm from '../components/HomeForm'
import { createHome } from '../api/homes'
import type { Home } from '../types/home'

export default function HomeNew() {
  const nav = useNavigate()
  const onSubmit = async (payload: Home) => {
    await createHome(payload)
    nav('/')
  }
  return (
    <div className="container-page py-8">
      <a href="/" className="text-slate-500 hover:underline">← Back to listings</a>
      <h1 className="mt-2 text-3xl font-bold">Add New Home</h1>
      <div className="card mt-4 p-6">
        <HomeForm onSubmit={onSubmit} submittingLabel="Create Home" />
      </div>
    </div>
  )
}