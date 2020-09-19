import makeProto from '../wrap.js'

export default function wrapInventoryProduct (mp, product) {
  // Rename the product.id property. The `id` property on inventory products
  // corresponds to the `name` property on store products in the plug.dj API.
  // Miniplug uses `name` for both for consistency.
  product.name = product.id
  delete product.id

  return makeProto(product, {})
}
