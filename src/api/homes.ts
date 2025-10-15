import { api } from './client'
import type { Home } from '../types/home'

export const getHomes = async () => (await api.get<Home[]>('/homes')).data
export const getHome = async (id: string | number) => (await api.get<Home>(`/homes/${id}`)).data
export const createHome = async (payload: Home) => (await api.post<Home>('/homes', payload)).data
export const updateHome = async (id: string | number, payload: Home) => (await api.put<Home>(`/homes/${id}`, payload)).data
export const deleteHome = async (id: string | number) => (await api.delete(`/homes/${id}`)).data