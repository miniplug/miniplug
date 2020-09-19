import { partial } from '../util.js'
import wrapMessage from '../data/chat.js'
import wrapHistoryEntry from '../data/historyEntry.js'
import wrapInventoryProduct from '../data/inventoryProduct.js'
import wrapMedia from '../data/media.js'
import wrapNotification from '../data/notification.js'
import wrapPlaylist from '../data/playlist.js'
import wrapRoom from '../data/room.js'
import wrapStoreProduct from '../data/storeProduct.js'
import wrapUser from '../data/user.js'
import wrapWaitlist from '../data/waitlist.js'
import wrapWaitlistBan from '../data/waitlistBan.js'

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
