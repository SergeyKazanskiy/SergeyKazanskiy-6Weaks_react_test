'use client';

import { useText } from '@/src/i18n/useText'
import { NavLinks } from '@/src/utils/constants';


export default function Home() {
  const t = useText()

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">{t(NavLinks.ABOUT)}</h1>
        <p className="text-lg text-gray-600">
          {t('Documentation page content goes here.')}
        </p>
      </div>
    </div>
  );
}
