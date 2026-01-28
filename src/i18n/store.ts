import { create } from 'zustand'
import { en } from './lang/en'
import { ru } from './lang/ru'


interface LangState {
  lang: 'ru' | 'en'
  dict: Record<string, string>

  setLang: (lang: 'ru' | 'en') => void
}

export const useLangStore = create<LangState>((set) => ({
  lang: 'ru',
  dict: ru,

  setLang: (lang: 'ru' | 'en') => set({ lang, dict: lang === 'ru' ? ru : en }),
}))

export type Lang = 'en' | 'ru'
