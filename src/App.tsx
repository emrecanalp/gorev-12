import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import HomeList from './pages/HomeList'
import HomeDetail from './pages/HomeDetail'
import HomeNew from './pages/HomeNew'
import HomeEdit from './pages/HomeEdit'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeList/>} />
        <Route path="/homes/new" element={<HomeNew/>} />
        <Route path="/homes/:id" element={<HomeDetail/>} />
        <Route path="/homes/:id/edit" element={<HomeEdit/>} />
        <Route path="*" element={<Navigate to="/" replace/>} />
      </Routes>
    </BrowserRouter>
  )
}