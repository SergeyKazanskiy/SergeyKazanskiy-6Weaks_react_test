import { NAME_REGEX, EMAIL_REGEX } from './constants';


//Validate name
export function validateName(name: string): { hasError: boolean, errorMessage: string } {
  let hasError = false
  let errorMessage = ''

  if (!name.trim()) return {hasError: true, errorMessage:'Имя не может быть пустым'}
  if (!NAME_REGEX.test(name)) return {hasError: true, errorMessage:'Имя должно содержать только буквы'}
  return {hasError, errorMessage}
}

//Validate email
export function validateEmail(email: string): { hasError: boolean, errorMessage: string } {
  let hasError = false
  let errorMessage = ''

  if (!email.trim()) return {hasError: true, errorMessage:'Имя не может быть пустым'}
  if (!EMAIL_REGEX.test(email)) return {hasError: true, errorMessage:'Некорректный формат email'}
  return {hasError, errorMessage}
}
  