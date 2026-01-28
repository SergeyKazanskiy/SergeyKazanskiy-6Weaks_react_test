// проверка имени: не пустое, только буквы
export function validateName(name: string): string | null {
    if (!name.trim()) return 'Имя не может быть пустым'
    if (!/^[a-zA-Zа-яА-ЯёЁ\s]+$/.test(name)) return 'Имя должно содержать только буквы'
    return null
  }
  
  // проверка email
  export function validateEmail(email: string): string | null {
    if (!email.trim()) return 'Email не может быть пустым'
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!re.test(email)) return 'Некорректный формат email'
    return null
  }
  