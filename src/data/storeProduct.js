import { partial } from 'ap'
import makeProto from '../wrap'

export default function wrapStoreProduct (mp, product) {
  return makeProto(product, {
    purchase: partial(mp.purchase, product.id)
  })
}
