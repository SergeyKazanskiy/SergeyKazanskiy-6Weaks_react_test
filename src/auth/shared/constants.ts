
export const LoginTexts = {
  TITLE: 'login.title',
  NAME: 'login.name',
  EMAIL: 'login.email',
  PASSWORD: 'login.password',
  COMMENT: 'login.comment',
  SUBMIT: 'login.submit',
  SUCCESS: 'login.success',
} as const

export const LoginFields = {
  NAME: 'name',
  EMAIL: 'email',
  PASSWORD: 'password',
  COMMENT: 'comment',
} as const


export const NAME_REGEX = /^[a-zA-Zа-яА-ЯёЁ\s]+$/;
export const EMAIL_REGEX = /^\S+@\S+\.\S+$/;
export const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;