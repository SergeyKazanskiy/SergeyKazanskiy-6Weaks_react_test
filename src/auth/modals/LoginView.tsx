'use client'

import { validateName, validateEmail } from '../shared/validation'
import { LoginFormModel } from '../shared/model'
import { LoginFields } from '../shared/constants'
import { LoginTexts } from '../shared/constants'
import { useLoginStore } from '../shared/store'
import { useText } from '@/src/i18n/useText'
import styles from '../shared/styles.module.css'


export function LoginView({ onClose }: { onClose: () => void }) {
  const t = useText()
  const { loading, success, errors } = useLoginStore()
  const { setErrors, submit } = useLoginStore()

  async function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)

    const model: LoginFormModel = {
      name: String(formData.get(LoginFields.NAME) ?? ''),
      email: String(formData.get(LoginFields.EMAIL) ?? ''),
      comment: String(formData.get(LoginFields.COMMENT) ?? ''),
    }

    const nameValidation = validateName(model.name)
    const emailValidation = validateEmail(model.email)

    if (nameValidation.hasError || emailValidation.hasError) {
      setErrors({
        name: nameValidation.errorMessage,
        email: emailValidation.errorMessage,
      })
      return
    }

    await submit(model)
    setTimeout(onClose, 2000)
  }

  if (success) {
    return (
      <div className={styles.loginForm}>
        <h2>{t(LoginTexts.SUCCESS)}</h2>
      </div>
    )
  }

  return (
    <form className={styles.loginForm} onSubmit={submitHandler}>
      <div className="flex justify-between items-center" onClick={onClose}>
        <h2 className='text-2xl'>{t(LoginTexts.TITLE)}</h2>
        <button className='text-2xl' type="button" onClick={onClose}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>
      

      <label htmlFor="$name">{t(LoginTexts.NAME)}</label>
      <input id="$name" name={LoginFields.NAME} required placeholder={t(LoginTexts.NAME)}/>

      <label htmlFor="$email">{t(LoginTexts.EMAIL)}</label>
      <input id="$email" name={LoginFields.EMAIL} required placeholder={t(LoginTexts.EMAIL)}/>

      <textarea name={LoginFields.COMMENT} placeholder={t(LoginTexts.COMMENT)}/>

      <button type="submit" disabled={loading}>
        {loading ? 'Sending…' : t(LoginTexts.SUBMIT)}
      </button>

      {errors.name && <div className={styles.loginTooltip}>{errors.name}</div>}
      {errors.email && <div className={styles.loginTooltip}>{errors.email}</div>}
    </form>
  )
}
