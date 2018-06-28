const uuidv1 = require('uuid/v1')

export function makeItem (title, description, date, id = null) {
  id = id || uuidv1()
  return { id, title, description, date }
}

export function makeList (title, items = []) {
  const id = uuidv1()
  return { id, title, items }
}
