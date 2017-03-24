import { partial } from '../util'
import makeProto from '../wrap'

export default function wrapPlaylist (mp, playlist) {
  return makeProto(playlist, {
    delete: partial(mp.deletePlaylist, playlist.id),
    activate: partial(mp.activatePlaylist, playlist.id),
    rename: partial(mp.renamePlaylist, playlist.id),
    shuffle: partial(mp.shufflePlaylist, playlist.id),

    getMedia: () =>
      mp.getMedia(playlist.id)
        .map(partial(mp.wrapMedia, playlist.id))
        .tap(media => {
          // cachedMedia = media
        }),
    insert: (media, append = true) =>
      mp.insertMedia(playlist.id, media, append),
    move: (media, before) =>
      mp.moveMedia(playlist.id, media, before)
  })
}
