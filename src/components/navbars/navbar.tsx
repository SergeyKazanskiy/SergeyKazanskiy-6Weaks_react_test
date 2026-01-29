'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLoginStore } from '@/src/auth/shared/store'
import { useThemeStore } from '@/src/theme/store'
import { useLangStore } from '@/src/i18n/store'
import { useText } from '@/src/i18n/useText'
import { NavLinks } from '@/src/utils/constants';


export function Navbar() {
  const showLogin = useLoginStore((s) => s.showLogin)
  const { toggleTheme } = useThemeStore()
  
  const { lang, setLang } = useLangStore()
  const t = useText()

  const pathname = usePathname()
  const isActive = (path: string) => pathname === path;

  return (
    <nav className="flex items-center justify-between px-6 h-14 border-b">
      {/* left */}
      <button onClick={() => setLang(lang === 'en' ? 'ru' : 'en')}>
        🌍 {lang}
      </button>

      {/* center */}
      <div className="flex gap-6">
        <Link href="/" className={`px-4 py-2 rounded transition ${isActive('/') ? 'font-bold' : ''}`}>
          {t(NavLinks.HOME)}
        </Link>
        <Link href="/docs" className={`px-4 py-2 rounded transition ${isActive('/docs') ? 'font-bold' : ''}`}>
          {t(NavLinks.DOCS)}
        </Link>
        <Link href="/about" className={`px-4 py-2 rounded transition ${isActive('/about') ? 'font-bold' : ''}`}>
          {t(NavLinks.ABOUT)}
        </Link>
      </div>

      {/* right */}
      <div className="flex gap-3">
        <button onClick={toggleTheme}>🌓</button>
        <button onClick={showLogin}>Войти</button>
      </div>
    </nav>
  )
}
