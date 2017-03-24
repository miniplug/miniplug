import { getId, partial } from '../util'

export default function storePlugin () {
  return (mp) => {
    const getProducts = (type, category = 'all') =>
      mp.get(`store/products/${type}/${category}`).map(mp.wrapStoreProduct)
    const getStoreAvatars = partial(getProducts, 'avatars')
    const getStoreBadges = partial(getProducts, 'badges')
    const getStoreMisc = partial(getProducts, 'misc')

    const getInventory = (type) =>
      mp.get(`store/inventory/${type}`).map(mp.wrapInventoryProduct)
    const getOwnedAvatars = partial(getInventory, 'avatars')
    const getOwnedBadges = partial(getInventory, 'badges')

    const purchase = (product) =>
      mp.post('store/purchase', { id: getId(product) }).get(0)

    const getNameChangeProductId = () =>
      getStoreMisc('username').get(0).get('id')
    const purchaseNameChange = (username) =>
      Promise.props({
        id: getNameChangeProductId(),
        username
      }).then(
        partial(mp.post, 'store/purchase/username')
      )

    Object.assign(mp, {
      getProducts,
      getStoreAvatars,
      getStoreBadges,
      getStoreMisc,
      getInventory,
      getOwnedAvatars,
      getOwnedBadges,
      purchase,
      purchaseNameChange
    })
  }
}
