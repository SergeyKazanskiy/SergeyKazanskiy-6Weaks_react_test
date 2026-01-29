import { create } from 'zustand'
import { LoginFormModel } from './model'
import { emailService } from '../../services/email/service';
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
   
    const loginHtmL = loginEmailTemplate(model);
    emailService.send({ subject: '6weeks - Форма заповнена', html: loginHtmL });

     // имитация API вызова
    await new Promise(res => setTimeout(res, 1000))

    set({ loading: false, success: true })
    setTimeout(() => set({ success: false }), 2000)
  },

  reset() {
    set({ errors: {}, success: false })
  },
}))
