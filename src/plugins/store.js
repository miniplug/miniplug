import partial from 'lodash-es/partial'
import Promise from 'bluebird'
import _wrapStoreProduct from '../data/storeProduct'
import _wrapInventoryProduct from '../data/inventoryProduct'
import { getId } from '../util'

export default function storePlugin () {
  return (mp) => {
    const wrapStoreProduct = partial(_wrapStoreProduct, mp)
    const wrapInventoryProduct = partial(_wrapInventoryProduct, mp)

    const getProducts = (type, category = 'all') =>
      mp.get(`store/products/${type}/${category}`).map(wrapStoreProduct)
    const getStoreAvatars = partial(getProducts, 'avatars')
    const getStoreBadges = partial(getProducts, 'badges')
    const getStoreMisc = partial(getProducts, 'misc')

    const getInventory = (type) =>
      mp.get(`store/inventory/${type}`).map(wrapInventoryProduct)
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
