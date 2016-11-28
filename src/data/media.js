import partial from 'lodash.partial'

export default function wrapMedia (mp, playlistId, media) {
  return Object.assign(media, {
    update: partial(mp.updateMedia, playlistId, media.id),
    delete: () =>
      mp.deleteMedia(playlistId, [ media.id ])
  })
}
