export const getId = (item, idProp = 'id') =>
  typeof item === 'object' ? item[idProp] : item

export const getIds = (items) => {
  const arr = Array.isArray(medias) ? medias : [ medias ]
  return arr.map(getId)
}

export const parseDate = (timestamp) =>
  new Date(`${timestamp} UTC`)
