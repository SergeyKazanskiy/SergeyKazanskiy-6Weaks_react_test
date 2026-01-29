'use client'

import { useLoginStore } from '@/src/auth/shared/store'
import { LoginView } from '@/src/auth/modals/LoginView'

export default function LoginModal() {
  const { loginShown, hideLogin } = useLoginStore()
  if (!loginShown) return null

  return (
    <div className="fixed inset-0 flex justify-center items-center">
      <LoginView onClose={hideLogin}/>
    </div>
  )
}
