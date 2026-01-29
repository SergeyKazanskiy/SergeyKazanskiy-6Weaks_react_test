import { useLangStore, Lang } from './store'
import { en } from './lang/en'
import { ru } from './lang/ru'


const dictionary: Record<Lang, Record<string, string>> = { en, ru }

export function useText() {
  const lang = useLangStore(s => s.lang)

  return (key: string): string => {
    return dictionary[lang]?.[key] ?? key
  }
}
