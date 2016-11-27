import partial from 'lodash.partial'
import wrapMedia from './media'

export default function wrapPlaylist (mp, playlist) {
  // let cachedMedia
  return Object.assign(playlist, {
    delete: partial(mp.deletePlaylist, playlist.id),
    activate: partial(mp.activatePlaylist, playlist.id),
    rename: partial(mp.renamePlaylist, playlist.id),
    shuffle: partial(mp.shufflePlaylist, playlist.id),

    getMedia: () =>
      mp.getMedia(playlist.id)
        .map(partial(wrapMedia, mp, playlist.id))
        .tap(media => {
          // cachedMedia = media
        }),
    insert: (media, append = true) =>
      mp.insertMedia(playlist.id, media, append)
  })
}
