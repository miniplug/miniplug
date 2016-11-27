export default function wrapMedia (mp, playlistId, media) {
  return Object.assign(media, {
    update: (author, title) =>
      mp.updateMedia(playlistId, media.id, author, title),
    delete: () =>
      mp.deleteMedia(playlistId, [ media.id ])
  })
}
