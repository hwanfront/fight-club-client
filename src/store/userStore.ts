import { User } from '@/features/auth/types/auth'
import { create } from 'zustand'

interface UserState {
  isLoading: boolean
  isLoggedIn: boolean
  user: User | null
  login: (user: User) => void
  logout: () => void
  setLoading: (loading: boolean) => void
}

export const useUserStore = create<UserState>()(set => ({
  user: null,
  isLoading: true,
  isLoggedIn: false,
  login: user => set({ user, isLoggedIn: true, isLoading: false }),
  logout: () => set({ user: null, isLoggedIn: false, isLoading: false }),
  setLoading: isLoading => set({ isLoading }),
}))
