'use client'

import { validateName, validateEmail } from '../shared/validation'
import { LoginFormModel } from '../shared/model'
import { LoginFields } from '../shared/constants'
import { LoginTexts } from '../shared/constants'
import { useLoginStore } from '../shared/store'
import { useText } from '@/src/i18n/useText'
import './login.css'


export default function LoginView() {
  const text = useText()
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
    e.currentTarget.reset()
  }

  if (success) {
    return (
      <div className="login-form">
        <h2>{text(LoginTexts.SUCCESS)}</h2>
      </div>
    )
  }

  return (
    <form className="login-form" onSubmit={submitHandler}>
      <h1>{text(LoginTexts.TITLE)}</h1>

      <label htmlFor="$name">{text(LoginTexts.NAME)}</label>
      <input id="$name" name={LoginFields.NAME} required placeholder={text(LoginTexts.NAME)}/>

      <label htmlFor="$email">{text(LoginTexts.EMAIL)}</label>
      <input id="$email" name={LoginFields.EMAIL} required placeholder={text(LoginTexts.EMAIL)}/>

      <textarea name={LoginFields.COMMENT} placeholder={text(LoginTexts.COMMENT)}/>

      <button type="submit" disabled={loading}>
        {loading ? 'Sending…' : text(LoginTexts.SUBMIT)}
      </button>

      {errors.name && <div className="login-tooltip">{errors.name}</div>}
      {errors.email && <div className="login-tooltip">{errors.email}</div>}
    </form>
  )
}
