/**
 * Get list by index, id or reference
 *
 * @param   {Array}             lists       The array of lists
 * @param   {string|number|*}   listRef     The index, id or reference of the list to find
 * @returns {Object}                        The found list
 */
export function getList (lists, listRef) {
  return typeof listRef === 'number'
    ? lists[listRef]
    : typeof listRef === 'string'
      ? lists.find(list => list.id === listRef)
      : listRef
}

/**
 * Get item and optionally list by item id or reference
 *
 * @param   {Array}         lists           The array of lists
 * @param   {string|object} itemRef         The id of or reference to the item to find
 * @param   {boolean}      [returnList]     An optional flg to return both list and item
 * @returns {object|{list, item}}           The found item or an object containing the parent list and found item
 */
export function getItem (lists, itemRef, returnList) {
  let list, item
  const id = typeof itemRef === 'object'
    ? itemRef.id
    : itemRef
  for (list of lists) {
    item = list.items.find(item => item.id === id)
    if (item) {
      break
    }
  }
  return returnList
    ? { list, item }
    : item
}
