import { partial } from 'ap'
import _wrapPlaylist from '../data/playlist'
import _wrapMedia from '../data/media'
import { getId, getIds } from '../util'

export default function playlistsPlugin () {
  return (mp) => {
    const wrapPlaylist = partial(_wrapPlaylist, mp)
    const wrapMedia = partial(_wrapMedia, mp)

    Object.assign(mp, {
      getPlaylists: () =>
        mp.get('playlists').map(wrapPlaylist),
      getActivePlaylist: () =>
        mp.get('playlists')
          .filter((playlist) => playlist.active)
          .get(0).then(wrapPlaylist),
      createPlaylist: (name/*, initialMedia */) =>
        mp.post('playlists', { name: name }),
      deletePlaylist: (pid) =>
        mp.del(`playlists/${pid}`),
      activatePlaylist: (pid) =>
        mp.put(`playlists/${pid}/activate`),
      renamePlaylist: (pid, name) =>
        mp.put(`playlists/${pid}/rename`, { name: name }),
      shufflePlaylist: (pid) =>
        mp.put(`playlists/${pid}/shuffle`),

      getMedia: (pid) =>
        mp.get(`playlists/${pid}/media`).map(partial(wrapMedia, pid)),
      updateMedia: (pid, mid, author, title) =>
        mp.put(`playlists/${pid}/media/update`, {
          id: mid,
          author: author,
          title: title
        }).get(0),
      moveMedia: (pid, mids, before) =>
        mp.put(`playlists/${pid}/media/move`, {
          ids: getIds(mids),
          beforeID: getId(before)
        }),
      insertMedia: (pid, media, append = true) =>
        mp.post(`playlists/${pid}/media/insert`, {
          media: media,
          append: append
        }),
      deleteMedia: (pid, mids) =>
        mp.post(`playlists/${pid}/media/delete`, {
          ids: getIds(mids)
        })
    })
  }
}
