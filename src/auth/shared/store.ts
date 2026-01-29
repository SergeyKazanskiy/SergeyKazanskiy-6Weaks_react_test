import { create } from 'zustand'
import { LoginFormModel } from './model'
import { emailClient } from '../../services/email/service';
import { loginEmailTemplate } from '../../services/email/templates';


interface LoginState {
  loginShown: boolean
  loading: boolean
  success: boolean
  errors: Partial<Record<keyof LoginFormModel, string>>

  showLogin: () => void
  hideLogin: () => void
  setErrors: (errors: Partial<Record<keyof LoginFormModel, string>>) => void
  submit(model: LoginFormModel): Promise<void>
  reset(): void
}

export const useLoginStore = create<LoginState>((set) => ({
  loginShown: false,
  loading: false,
  success: false,
  errors: {},

  showLogin() {
    set({ loginShown: true })
  },

  hideLogin() {
    set({ loginShown: false })
  },
  
  setErrors(errors) {
    set({ errors })
  },

  async submit(model) {
    set({ loading: true, errors: {} })
   
    try {
      const html = loginEmailTemplate(model)
      await emailClient.send({ subject: '6weeks — Форма заполнена', html})
      set({ success: true })
    } catch (e) {
      set({ errors: { email: 'Failed to send email' } })
    } finally {
      set({ loading: false })
    }

     // имитация API вызова
    //await new Promise(res => setTimeout(res, 1000))

    //set({ loading: false, success: true })
    setTimeout(() => set({ success: false, errors: {} }), 3000)
  },

  reset() {
    set({ errors: {}, success: false })
  },
}))
