import partial from 'lodash-es/partial'
import makeProto from '../wrap'

export default function wrapMedia (mp, playlistId, media) {
  return makeProto(media, {
    update: partial(mp.updateMedia, playlistId, media.id),
    delete: () =>
      mp.deleteMedia(playlistId, [ media.id ])
  })
}
