import { partial } from '../util'
import makeProto from '../wrap'

export default function wrapMedia (mp, playlistId, media) {
  return makeProto(media, {
    update: partial(mp.updateMedia, playlistId, media.id),
    delete: () =>
      mp.deleteMedia(playlistId, [media.id])
  })
}
