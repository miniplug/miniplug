import { partial } from '../util.js'
import makeProto from '../wrap.js'

export default function wrapStoreProduct (mp, product) {
  return makeProto(product, {
    purchase: partial(mp.purchase, product.id)
  })
}
