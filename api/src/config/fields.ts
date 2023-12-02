
export const fieldTypes = [
  'textfield',
  'date',
  'email',
  // 'legal',
  'textarea',
  'link',
  // 'statement',
  'dropdown',
  'rating',
  'radio',
  'hidden',
  'yes_no',
  'number',
]

export const matchType = {
  color: /^#([A-F0-9]{6}|[A-F0-9]{3})$/i,
  // eslint-disable-next-line max-len
  url: /((([A-Z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Z0-9.-]+|(?:www.|[-;:&=+$,\w]+@)[A-Z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[\w]*))?)/i,
  email: /.+@.+\..+/,
  slug: /^[a-z0-9_]+$/,
}

export const validatePassword = (password: string): true | string => {
  if (password.length < 4) {
    return 'password is too short'
  }

  return true
}
