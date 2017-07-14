import { partial } from '../util'
import wrapMessage from '../data/chat'
import wrapHistoryEntry from '../data/historyEntry'
import wrapInventoryProduct from '../data/inventoryProduct'
import wrapMedia from '../data/media'
import wrapNotification from '../data/notification'
import wrapPlaylist from '../data/playlist'
import wrapRoom from '../data/room'
import wrapStoreProduct from '../data/storeProduct'
import wrapUser from '../data/user'
import wrapWaitlist from '../data/waitlist'
import wrapWaitlistBan from '../data/waitlistBan'

export default function dataModelPlugin () {
  return (mp) => {
    Object.assign(mp, {
      wrapMessage: partial(wrapMessage, mp),
      wrapHistoryEntry: partial(wrapHistoryEntry, mp),
      wrapInventoryProduct: partial(wrapInventoryProduct, mp),
      wrapMedia: partial(wrapMedia, mp),
      wrapNotification: partial(wrapNotification, mp),
      wrapPlaylist: partial(wrapPlaylist, mp),
      wrapRoom: partial(wrapRoom, mp),
      wrapStoreProduct: partial(wrapStoreProduct, mp),
      wrapUser: partial(wrapUser, mp),
      wrapWaitlist: partial(wrapWaitlist, mp),
      wrapWaitlistBan: partial(wrapWaitlistBan, mp)
    })
  }
}
