# API

 - [miniplug(opts)](#mp-constructor)
 - [mp.use(plugin)](#mp-use)
 - [mp.join(room)](#mp-join)
 - [mp.room()](#mp-room)
 - [mp.getRooms(query, page, limit)](#mp-getrooms)
 - [mp.getFavorites(query, page, limit)](#mp-getfavorites)
 - [mp.createRoom(name, isPrivate)](#mp-createroom)
 - [mp.favoriteRoom(id)](#mp-favoriteroom)
 - [mp.unfavoriteRoom(id)](#mp-unfavoriteroom)
 - [mp.getRoomState()](#mp-getroomstate)
 - [mp.me()](#mp-me)
 - [mp.user(id)](#mp-user)
 - [mp.users()](#mp-users)
 - [mp.guests()](#mp-guests)
 - [mp.getMe()](#mp-getme)
 - [mp.getUser(id)](#mp-getuser)
 - [mp.getUsers(...ids)](#mp-getusers)
 - [mp.saveSettings(settings)](#mp-savesettings)
 - [mp.setAvatar(avatar)](#mp-setavatar)
 - [mp.setBadge(badge)](#mp-setbadge)
 - [mp.setBlurb(blurb)](#mp-setblurb)
 - [mp.setLanguage(lang)](#mp-setlanguage)
 - [mp.getTransactions()](#mp-gettransactions)
 - [mp.chat(message)](#mp-chat)
 - [mp.emote(message)](#mp-emote)
 - [mp.deleteChat(id)](#mp-deletechat)
 - [mp.getPlaylists()](#mp-getplaylists)
 - [mp.getActivePlaylist()](#mp-getactiveplaylist)
 - [mp.createPlaylist(name)](#mp-createplaylist)
 - [mp.deletePlaylist(id)](#mp-deleteplaylist)
 - [mp.activatePlaylist(id)](#mp-activateplaylist)
 - [mp.renamePlaylist(id, name)](#mp-renameplaylist)
 - [mp.shufflePlaylist(id)](#mp-shuffleplaylist)
 - [mp.getMedia(id)](#mp-getmedia)
 - [mp.updateMedia(pid, mid, author, title)](#mp-updatemedia)
 - [mp.moveMedia(pid, mids, before)](#mp-movemedia)
 - [mp.insertMedia(id, media, append)](#mp-insertmedia)
 - [mp.deleteMedia(pid, mids)](#mp-deletemedia)
 - [Room](#class-room)
   - [room.id](#room-id)
   - [room.name](#room-name)
   - [room.slug](#room-slug)
   - [room.join()](#room-join)
   - [room.favorite()](#room-favorite)
   - [room.unfavorite()](#room-unfavorite)
 - [User](#class-user)
   - [user.chat(text)](#user-chat)
   - [user.emote(text)](#user-emote)
   - [user.add()](#user-add)
   - [user.move(position)](#user-move)
   - [user.remove()](#user-remove)
   - [user.skip(historyId)](#user-skip)
   - [user.befriend()](#user-befriend)
   - [user.rejectRequest()](#user-rejectrequest)
   - [user.ignore()](#user-ignore)
   - [user.unignore()](#user-unignore)
   - [user.mute(duration, reason)](#user-mute)
   - [user.unmute()](#user-unmute)
   - [user.ban(duration, reason)](#user-ban)
   - [user.unban()](#user-unban)
 - [ChatMessage](#class-chatmessage)
   - [message.id](#chatmessage-id)
   - [message.message](#chatmessage-message)
   - [message.uid](#chatmessage-uid)
   - [message.un](#chatmessage-un)
   - [message.getUser()](#chatmessage-getuser)
   - [message.own()](#chatmessage-own)
   - [message.reply(text)](#chatmessage-reply)
   - [message.emote(text)](#chatmessage-emote)
   - [message.delete()](#chatmessage-delete)
 - [Playlist](#class-playlist)
   - [playlist.id](#playlist-id)
   - [playlist.name](#playlist-name)
   - [playlist.count](#playlist-count)
   - [playlist.active](#playlist-active)
   - [playlist.delete()](#playlist-delete)
   - [playlist.activate()](#playlist-activate)
   - [playlist.rename(name)](#playlist-rename)
   - [playlist.shuffle()](#playlist-shuffle)
   - [playlist.getMedia()](#playlist-getmedia)
   - [playlist.insert(media, append)](#playlist-insert)
   - [playlist.move(media, before)](#playlist-move)
 - [Media](#class-media)
   - [media.id](#media-id)
   - [media.format](#media-format)
   - [media.cid](#media-cid)
   - [media.author](#media-author)
   - [media.title](#media-title)
   - [media.duration](#media-duration)
   - [media.image](#media-image)
   - [media.update(author, title)](#media-update)
   - [media.delete()](#media-delete)
 - [Mute Durations](#muteduration)
 - [Mute Reasons](#mutereason)
 - [Ban Durations](#banduration)
 - [Ban Reasons](#banreason)
 - [Media Sources](#mediasource)
 - [REST methods](#mp-rest)

<a id="mp-constructor"></a>
## mp = miniplug(opts={})

Create a miniplug instance. Available options:

 - `opts.guest` - If true, will log in as a guest user. Defaults to false.
 - `opts.email` and `opts.password` - Login credentials. Only email/password
   login is supported at the moment.

```js
import miniplug from 'miniplug'

const mp = miniplug({ guest: true })
```

```js
const mp = miniplug({
  email: 'example@test.com',
  password: 'hunter2'
})
```

<a id="mp-use"></a>
## mp.use(plugin)

Add a plugin to enhance miniplug's functionality. Returns the miniplug instance
for chaining.

```js
import lotteryPlugin from 'miniplug-lottery'

mp.use(lotteryPlugin())
  .use((instance) => { /* Add other custom methods to `instance` */ })
```

<a id="mp-join"></a>
## mp.join(room): Promise<[Room](#class-room)>

Join a room. The parameter is the room's slug. If your room URL is
`https://plug.dj/loves-kpop`, the slug is `loves-kpop`.

```js
mp.join('loves-kpop').then(() => {
  mp.chat('Hello!')
})
```

<a id="mp-room"></a>
## mp.room(): [Room](#class-room)

Get the current room object.

```js
console.log('I am in:', mp.room().name)
```

<a id="mp-getrooms"></a>
## mp.getRooms(query='', page=0, limit=50): Promise&lt;Array&lt;[Room](#class-room)>>

List open rooms, like on the plug.dj dashboard.

`query` is a search query. `page` and `limit` can be used for pagination.

```js
mp.getRooms('reggae').then((rooms) => {
  rooms.forEach((room) => {
    console.log(room.name)
  })
})
```

<a id="mp-getfavorites"></a>
## mp.getFavorites(query='', page=0, limit=50): Promise&lt;Array&lt;[Room](#class-room)>>

List the current user's favorites.

`query` is a search query. `page` and `limit` can be used for pagination.

<a id="mp-createroom"></a>
## mp.createRoom(name, isPrivate = false): Promise<[Room](#class-room)>

Create a new room. Note that plug.dj will derive an unchangeable URL slug from
the name. This slug may collide with existing rooms.

```js
mp.createRoom('My private test room!', true).then((room) => {
  return room.favorite()
})
```

<a id="mp-favoriteroom"></a>
## mp.favoriteRoom(id): Promise

Add a room to the bot user's favorites.

```js
mp.favoriteRoom(123456).then(() => {
  console.log('Added!')
})
```

<a id="mp-unfavoriteroom"></a>
## mp.unfavoriteRoom(id): Promise

Remove a room from the bot user's favorites.

```js
mp.unfavoriteRoom(123456).then(() => {
  console.log('Removed!')
})
```

<a id="mp-getroomstate"></a>
## mp.getRoomState(): Promise<[Room](#class-room)>

Get the current room object, but fresh from the plug.dj API and not cached. This
is like an async version of [mp.room()](#mp-room). Using [mp.room()](#mp-room)
should be preferred whenever possible.

<hr>

<a id="mp-me"></a>
## mp.me(): [User](#class-user)

Get the current logged-in user. Will be `null` when logged in as a guest user.

```js
console.log('Logged in as', mp.me().username)
```

<a id="mp-user"></a>
## mp.user(id): [User](#class-user)

Synchronously get a user object from the current room. Returns `null` if the
requested user is not in the room.

```js
console.log('Some other user:', mp.user(123456).username)
```

<a id="mp-users"></a>
## mp.users(): Array<[User](#class-user)>

Synchronously get all user objects from the current room.

```js
console.log('Users:', mp.users().map((user) => user.username))
```

<a id="mp-guests"></a>
## mp.guests(): number

Get the number of guests in the current room.

<a id="mp-getme"></a>
## mp.getMe(): Promise<[User](#class-user)>

Get the current logged-in user from the plug.dj web API. [mp.me()](#mp-me)
should be used instead whenever possible.

<a id="mp-getuser"></a>
## mp.getUser(id): Promise<[User](#class-user)>

Get a user object by ID. The user does not have to be in the same room as the
bot.

<a id="mp-getusers"></a>
## mp.getUsers(...ids): Promise&lt;Array&lt;[User](#class-user)>>

Get multiple users. User IDs can be passed in an array or as separate arguments.
Up to 50 user objects can be requested at a time.

```js
mp.getUsers(123456, 654321).then((users) => {
  console.log('Found:', users)
})
```

<a id="mp-savesettings"></a>
## mp.saveSettings(settings): Promise

Save user settings. See the [PlugCommunity documentation](https://github.com/plugcommunity/documentation/blob/master/api/endpoints/users_settings.md#parameters)
for a list of available settings.

<a id="mp-setavatar"></a>
## mp.setAvatar(avatar): Promise

Set the bot user's avatar.

<a id="mp-setbadge"></a>
## mp.setBadge(badge): Promise

Set the bot user's badge.

<a id="mp-setblurb"></a>
## mp.setBlurb(blurb): Promise

Set the bot user's profile blurb / bio.

<a id="mp-setlanguage"></a>
## mp.setLanguage(lang): Promise

Set the bot user's language preference.

<a id="mp-gettransactions"></a>
## mp.getTransactions(): Promise&lt;Array>

Get the bot user's transaction history.

<hr>

<a id="mp-chat"></a>
## mp.chat(message): Promise<[ChatMessage](#class-chatmessage)>

Send a chat message. Returns a Promise that will resolve with the message once
it is sent.

```js
// Send a temporary greeting that is deleted after 5 seconds.
// Note that the bot user needs to have the appropriate staff permissions to be
// able to delete its own messages.

mp.chat('Hello!')
  .delay(5000) // Using Bluebird's .delay() method
  .then((message) => message.delete())
```

<a id="mp-emote"></a>
## mp.emote(message): Promise<[ChatMessage](#class-chatmessage)>

Send an emote chat message, like `/me` or `/em` on the plug.dj web client.

```js
mp.emote('does a little dance')
  .then((message) => { /* Resolves to the message, just like mp.chat(). */ })
```

<a id="mp-deletechat"></a>
## mp.deleteChat(id): Promise

Delete a chat message by ID.

```js
// Delete all incoming chat:
mp.on('chat', (message) => {
  mp.deleteChat(message.cid)
})
```

<hr>

<a id="mp-getplaylists"></a>
## mp.getPlaylists(): Promise&lt;Array&lt;[Playlist](#class-playlist)>>

Get all the user's playlists.

```js
// Using Bluebird's `.each()` method
mp.getPlaylists().each((playlist) => {
  console.log(`${playlist.name} (${playlist.count})`)
})
```

<a id="mp-getactiveplaylist"></a>
## mp.getActivePlaylist(): Promise&lt;[Playlist](#class-playlist)>

Get the user's active playlist.

```js
mp.getActivePlaylist().then((playlist) => {
  return playlist.insert({
    format: mp.MEDIA_SOURCE.YOUTUBE,
    cid: 'UT4zZzAtWm4',
    author: 'Ovcoco',
    title: 'Your Ghost',
    duration: 209,
    image: 'https://i.ytimg.com/vi/UT4zZzAtWm4/default.jpg'
  })
})
```

<a id="mp-createplaylist"></a>
## mp.createPlaylist(name): Promise&lt;[Playlist](#class-playlist)>

Create a new playlist.

```js
mp.createPlaylist('Test playlist').then((playlist) => {
  return Promise.all([
    playlist.insert([
      // your favourite songs
    ]),
    playlist.activate()
  ])
})
```

<a id="mp-deleteplaylist"></a>
## mp.deletePlaylist(id): Promise

Permanently delete a playlist by ID.

Alias: [`playlist.delete()`](#playlist-delete)

<a id="mp-activateplaylist"></a>
## mp.activatePlaylist(id): Promise

Set a playlist to active by ID.

Alias: [`playlist.activate()`](#playlist-activate)

<a id="mp-renameplaylist"></a>
## mp.renamePlaylist(id, name): Promise

Rename a playlist.

Alias: [`playlist.rename(name)`](#playlist-rename)

<a id="mp-shuffleplaylist"></a>
## mp.shufflePlaylist(id): Promise&lt;Array&lt;[Media](#class-media)>

Shuffle a playlist. Returns a Promise that resolves with the shuffled media
items.

Alias: [`playlist.shuffle()`](#playlist-shuffle)

<a id="mp-getmedia"></a>
## mp.getMedia(id): Promise&lt;Array&lt;[Media](#class-media)>

Get the media items in a playlist.

Alias: [`playlist.getMedia()`](#playlist-getmedia)

<a id="mp-updatemedia"></a>
## mp.updateMedia(pid, mid, author, title): Promise&lt;{author, title}>

Update the author and title tags of a media item. Returns a Promise that
resolves with the new actual author and title as used by plug.dj, with HTML
escapes.

```js
mp.updateMedia(playlist.id, media.id, 'Test Author', '& Test Title').then(({ author, title }) => {
  // author == "Test Author"
  // title == "&amp; Test Title"
})
```

Alias: [`media.update(author, title)`](#media-update)

<a id="mp-movemedia"></a>
## mp.moveMedia(pid, mids, before): Promise

Move existing media items to a different position in the playlist.

Alias: [`playlist.move()`](#playlist-move)

<a id="mp-insertmedia"></a>
## mp.insertMedia(id, media, append=true): Promise

Insert new media items into a playlist.

Alias: [`playlist.insert()`](#playlist-insert)

<a id="mp-deletemedia"></a>
## mp.deleteMedia(pid, mids): Promise&lt;Array&lt;[Media](#class-media)>

Alias: [`media.delete()`](#media-delete)

<a id="class-room"></a>
## Room

<a id="room-id"></a>
### room.id: number

The room's unique ID.

<a id="room-name"></a>
### room.name: string

The room's name.

<a id="room-slug"></a>
### room.slug: string

The room's unique URL slug.

```js
mp.chat('Visit us at https://plug.dj/' + mp.room().slug + '!')
```

<a id="room-join"></a>
### room.join(): Promise

Join this room. See [mp.join(room)](#mp-join).

```js
// Join the most populous room.
mp.getRooms().then((rooms) => {
  const room = rooms[0]
  return room.join()
})
```

<a id="room-favorite"></a>
### room.favorite(): Promise

Add this room to the bot user's favorites.

```js
// Add the top 50 most populous rooms to favorites.
mp.getRooms()
  .map((room) => room.favorite())
  .then(() => {
    console.log('Added lots of favorites')
  })
```

<a id="room-unfavorite"></a>
### room.unfavorite(): Promise

Remove this room from the bot user's favorites.

```js
// Remove the current room from favorites.
mp.room().unfavorite().then(() => {
  console.log('Removed!')
})
```

<a id="class-user"></a>
## User

<a id="user-chat"></a>
### user.chat(text): Promise<[ChatMessage](#class-chatmessage)>

Send a chat message directed at this user. Prepends `@Username` to the provided
text.

```js
mp.user(123456).chat('Hello!')
// → "@Username Hello!"
```

<a id="user-emote"></a>
### user.emote(text): Promise<[ChatMessage](#class-chatmessage)>

Send an emote chat message directed at this user.

```js
mp.user(123456).emote('Hello!')
// → "/me @Username Hello!"
```

<a id="user-add"></a>
### user.add(): Promise

Add the user to the waitlist.

<a id="user-move"></a>
### user.move(position): Promise

Move the user to a different position in the waitlist.

<a id="user-remove"></a>
### user.remove(): Promise

Remove the user from the waitlist or the DJ Booth.

<a id="user-skip"></a>
### user.skip(historyId): Promise

Skip the user. `historyId` is the ID of the currently playing track, i.e.
`mp.historyEntry().id`.

<a id="user-befriend"></a>
### user.befriend(): Promise

Send or accept a friend request to/from this user.

<a id="user-rejectrequest"></a>
### user.rejectRequest(): Promise

Reject a friend request from this user.

<a id="user-ignore"></a>
### user.ignore(): Promise

Ignore the user in chat.

<a id="user-unignore"></a>
### user.unignore(): Promise

Stop ignoring the user in chat.

<a id="user-mute"></a>
### user.mute(duration, reason): Promise

Mute the user in chat. `duration` is a [MUTE_DURATION](#muteduration). `reason`
is a [MUTE_REASON](#mutereason).

<a id="user-unmute"></a>
### user.unmute(): Promise

Unmute the user in chat.

<a id="user-ban"></a>
### user.ban(duration, reason): Promise

Ban the user from the room. `duration` is a [BAN_DURATION](#banduration).
`reason` is a [BAN_REASON](#banreason).

<a id="user-unban"></a>
### user.unban(): Promise

Unban the user from the room.

<a id="class-chatmessage"></a>
## ChatMessage

<a id="chatmessage-id"></a>
### message.id: string

Message ID.

<a id="chatmessage-message"></a>
### message.message: string

Message text contents.

<a id="chatmessage-uid"></a>
### message.uid: number

User ID of the sender of the message.

<a id="chatmessage-un"></a>
### message.un: string

Username of the sender of the message.

<a id="chatmessage-getuser"></a>
### message.getUser(): Promise<[User](#class-user)>

Get the sender of the message.

<a id="chatmessage-own"></a>
### message.own(): bool

Returns true if the message was sent by the logged-in user, or false if it was
sent by someone else.

```js
mp.chat('My own message').then((message) => {
  assert.ok(message.own() === true)
})

mp.on('chat', (message) => {
  // True if it was sent using mp.chat() or mp.emote().
  // False if it was sent by some other user.
  message.own()
})
```

<a id="chatmessage-reply"></a>
### message.reply(text): Promise<[ChatMessage](#class-chatmessage)>

Reply to the sender of the message using an @-mention.

```js
mp.on('chat', (message) => {
  if (message.message === '!myid') {
    // Sends "@Username Your user ID is 123456"
    message.reply('Your user ID is ' + message.uid)
  }
})
```

<a id="chatmessage-emote"></a>
### message.emote(text): Promise<[ChatMessage](#class-chatmessage)>

Reply to the sender of the message using an @-mention in an [emote](#mp-emote)
message.

<a id="chatmessage-delete"></a>
### message.delete(): Promise

Delete the message.

```js
mp.on('chat', (message) => {
  message.delete().then(() => {
    console.log('Deleted message from ' + message.un)
  })
})
```

<a id="class-playlist"></a>
## Playlist

<a id="playlist-id"></a>
### playlist.id: number

The playlist ID.

<a id="playlist-name"></a>
### playlist.name: string

Playlist name.

<a id="playlist-count"></a>
### playlist.count: number

The amount of media items in the playlist.

<a id="playlist-active"></a>
### playlist.active: bool

True if this is the active playlist.

<a id="playlist-delete"></a>
### playlist.delete(): Promise

Permanently delete the playlist.

<a id="playlist-activate"></a>
### playlist.activate(): Promise

Set this playlist to active.

<a id="playlist-rename"></a>
### playlist.rename(name): Promise

Rename the playlist.

<a id="playlist-shuffle"></a>
### playlist.shuffle(): Promise&lt;Array&lt;[Media](#class-media)>>

Shuffle the items in the playlist. Returns a Promise that resolves to the
shuffled media items in the playlist.

<a id="playlist-getmedia"></a>
### playlist.getMedia(): Promise&lt;Array&lt;[Media](#class-media)>>

Get the items in the playlist.

<a id="playlist-insert"></a>
### playlist.insert(media, append=true): Promise&lt;{id, count}>

Add media items to the playlist. `media` can be a [Media](#class-media) object
or ID, or an array of [Media](#class-media) objects or IDs. When `append` is
true, the medias are added to the end of the playlist. When `append` is false,
they are added to the front.

Returns a Promise that resolves to an object containing the playlist `id`, and
the new total `count` of items in the playlist.

<a id="playlist-move"></a>
### playlist.move(media, before): Promise&lt;Array&lt;[Media](#class-media)>>

Move media items in the playlist. `media` can be a [Media](#class-media) object
or ID, or an array of [Media](#class-media) objects or IDs. The items will be
moved in front of the [Media](#class-media) objects or ID given in `before`.
If `before` is -1, the items will be moved to the end of the playlist.

Returns a Promise that resolves with the Media items in the playlist after the
move was finished.

<a id="class-media"></a>
## Media

<a id="media-id"></a>
### media.id: number

The media ID on plug.dj.

<a id="media-format"></a>
### media.format: [MEDIA_SOURCE](#mediasource)

The media source. Can be `MEDIA_SOURCE.YOUTUBE` or `MEDIA_SOURCE.SOUNDCLOUD`.

<a id="media-cid"></a>
### media.cid: string

The media ID on the relevant source.

<a id="media-author"></a>
### media.author: string

The author / artist tag of the media.

<a id="media-title"></a>
### media.title: string

The title tag of the media.

<a id="media-duration"></a>
### media.duration: number

Duration in seconds of the media.

<a id="media-image"></a>
### media.image: string

A URL pointing to a thumbnail image.

<a id="media-update"></a>
### media.update(author, title): Promise&lt;{author, title}>

Update the author and title tags of a media item. Returns a Promise that
resolves with the new actual author and title as used by plug.dj, with HTML
escapes.

<a id="media-delete"></a>
### media.delete(): Promise

Delete the media from the playlist it belongs to.

<hr>

<a id="muteduration"></a>
## Mute Durations

```js
import { MUTE_DURATION } from 'miniplug'
```

### MUTE_DURATION.SHORT

15 minutes.

### MUTE_DURATION.MEDIUM

30 minutes.

### MUTE_DURATION.LONG

45 minutes.

<a id="mutereason"></a>
## Mute Reasons

```js
import { MUTE_REASON } from 'miniplug'
```

### MUTE_REASON.VIOLATING_RULES

Violating community rules.

### MUTE_REASON.VERBAL_ABUSE

Verbal abuse or harassment.

### MUTE_REASON.SPAMMING

Spamming or trolling.

### MUTE_REASON.LANGUAGE

Offensive language.

### MUTE_REASON.ATTITUDE

Negative attitude

<a id="banduration"></a>
## Ban Durations

```js
import { BAN_DURATION } from 'miniplug'
```

### BAN_DURATION.HOUR

A 1 hour ban.

### BAN_DURATION.DAY

A 1 day ban.

### BAN_DURATION.PERMA

A permanent ban.

<a id="banreason"></a>
## Ban Reasons

```js
import { BAN_REASON } from 'miniplug'
```

### BAN_REASON.SPAMMING

Spamming or trolling.

### BAN_REASON.VERBAL_ABUSE

Verbal abuse or offensive language.

### BAN_REASON.OFFENSIVE_PLAYS

Playing offensive videos/songs.

### BAN_REASON.GENRE

Repeatedly playing inappropriate genre(s).

### BAN_REASON.ATTITUDE

Negative attitude.

<a id="mediasource"></a>
## Media Sources

```js
import { MEDIA_SOURCE } from 'miniplug'
```

### MEDIA_SOURCE.YOUTUBE

Identifies a YouTube video.

### MEDIA_SOURCE.SOUNDCLOUD

Identifies a SoundCloud track.

<a id="mp-rest"></a>
## mp.get/post/put/del(url: string, data: object): Promise

> These are low-level REST methods. You most likely do not need to use them
> directly. Instead, use one of the methods described in the rest of this
> document.

Send an HTTP request to the given plug.dj API endpoint. The `url` is relative
to the plug.dj API base URL. `data` is used for the request body for POST, PUT
and DELETE requests, and as the query string for GET requests.

```js
mp.get('rooms', { q: 'k-pop' }).then(console.log)
// sends `GET https://plug.dj/_/rooms?q=k-pop`

mp.post('booth/skip', { userID: 123456, historyID: mp.historyEntry().id })
// sends `POST https://plug.dj/_/booth/skip` with a request body like:
// { "userID": 123456, "historyID": "ab0c47eb-6c92-45f8-8711-75e27977db06" }
```

# Events
