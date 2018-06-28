const uuidv1 = require('uuid/v1')
const format = require('date-fns/format')

export function makeItem (title, description, date, id = null) {
  id = id || uuidv1()
  if (date instanceof Date) {
    date = format(date, 'YYYY-MM-DD')
  }
  return { id, title, description, date }
}

export function makeList (title, items = []) {
  const id = uuidv1()
  return { id, title, items }
}
