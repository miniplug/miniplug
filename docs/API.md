# API

 - [Introduction](#introduction)

---

 - [miniplug(opts)](#mp-constructor)
 - [mp.use(plugin)](#mp-use)
 - [mp.join(room)](#mp-join)
 - [mp.room()](#mp-room)
 - [mp.getRooms(query, page, limit)](#mp-getrooms)
 - [mp.getFavorites(query, page, limit)](#mp-getfavorites)
 - [mp.getMyRooms()](#mp-getmyrooms)
 - [mp.validateRoomName(name)](#mp-validateroomname)
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
 - [mp.score()](#mp-score)
 - [mp.vote(direction)](#mp-vote)
 - [mp.woot()](#mp-woot)
 - [mp.meh()](#mp-meh)
 - [mp.dj()](#mp-dj)
 - [mp.waitlist()](#mp-waitlist)
 - [mp.joinWaitlist()](#mp-joinwaitlist)
 - [mp.leaveWaitlist()](#mp-leavewaitlist)
 - [mp.setCycle(cycle)](#mp-setcycle)
 - [mp.enableCycle()](#mp-enablecycle)
 - [mp.disableCycle()](#mp-disablecycle)
 - [mp.setLock(lock)](#mp-setlock)
 - [mp.lockWaitlist()](#mp-lockwaitlist)
 - [mp.unlockWaitlist()](#mp-unlockwaitlist)
 - [mp.addDJ(uid)](#mp-adddj)
 - [mp.moveDJ(uid, position)](#mp-movedj)
 - [mp.removeDJ(uid)](#mp-removedj)
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
 - [mp.getProducts(type, category)](#mp-getproducts)
 - [mp.getStoreAvatars(category)](#mp-getstoreavatars)
 - [mp.getStoreBadges(category)](#mp-getstorebadges)
 - [mp.getStoreMisc(category)](#mp-getstoremisc)
 - [mp.getInventory(type)](#mp-getinventory)
 - [mp.getOwnedAvatars()](#mp-getownedavatars)
 - [mp.getOwnedBadges()](#mp-getownedbadges)
 - [mp.purchase(product)](#mp-purchase)
 - [mp.validateUsername(name)](#mp-validateusername)
 - [mp.purchaseNameChange(username)](#mp-purchasenamechange)
 - [mp.notifications()](#mp-notifications)
 - [mp.getNotifications()](#mp-notifications)
 - [mp.acknowledgeNotification(id)](#mp-notifications)
 - [Room](#class-room)
   - [room.id](#room-id)
   - [room.name](#room-name)
   - [room.slug](#room-slug)
   - [room.join()](#room-join)
   - [room.getHost()](#room-gethost)
   - [room.favorite()](#room-favorite)
   - [room.unfavorite()](#room-unfavorite)
 - [User](#class-user)
   - [user.id](#user-id)
   - [user.username](#user-username)
   - [user.role](#user-role)
   - [user.gRole](#user-grole)
   - [user.hasPermission(role)](#user-haspermission)
   - [user.hasGlobalPermission(role)](#user-hasglobalpermission)
   - [user.chat(text)](#user-chat)
   - [user.emote(text)](#user-emote)
   - [user.mention()](#user-mention)
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
 - [Waitlist](#class-waitlist)
   - [waitlist.contains(user)](#waitlist-contains)
   - [waitlist.positionOf(user)](#waitlist-positionof)
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
 - [HistoryEntry](#class-historyentry)
   - [entry.id](#historyentry-id)
   - [entry.media](#historyentry-media)
   - [entry.room](#historyentry-room)
   - [entry.user](#historyentry-user)
   - [entry.timestamp](#historyentry-timestamp)
   - [entry.score](#historyentry-score)
   - [entry.getUser()](#historyentry-getuser)
 - [StoreProduct](#class-storeproduct)
   - [product.type](#storeproduct-type)
   - [product.category](#storeproduct-category)
   - [product.id](#storeproduct-id)
   - [product.name](#storeproduct-name)
   - [product.level](#storeproduct-level)
   - [product.pp](#storeproduct-pp)
   - [product.sub](#storeproduct-sub)
   - [product.cash](#storeproduct-cash)
   - [product.purchase()](#storeproduct-purchase)
 - [InventoryProduct](#class-inventoryproduct)
   - [product.type](#inventoryproduct-type)
   - [product.category](#inventoryproduct-category)
   - [product.id](#inventoryproduct-id)
 - [Notification](#class-notification)
   - [notification.id](#notification-id)
   - [notification.action](#notification-action)
   - [notification.timestamp](#notification-timestamp)
   - [notification.value](#notification-value)
   - [notification.level](#notification-level)
   - [notification.message](#notification-message)
   - [notification.from](#notification-from)
   - [notification.amount](#notification-amount)
   - [notification.acknowledge()](#notification-acknowledge)
 - [User Roles](#role)
 - [Mute Durations](#muteduration)
 - [Mute Reasons](#mutereason)
 - [Ban Durations](#banduration)
 - [Ban Reasons](#banreason)
 - [Media Sources](#mediasource)
 - [Product Categories](#productcategories)
 - [REST methods](#mp-rest)
 - [Events](#events)
 - [Errors](#errors)

## Introduction

The miniplug API is heavily Promise-based. Most methods return Promises.

miniplug uses the [Bluebird][] library. That means that Promises returned by
miniplug have all the useful methods from Bluebird, too. See its
[API reference][Bluebird API] for a list.

Promises work really well with JavaScript [async functions][]. Async functions
are not available in most engines yet. You can compile async functions to
generator functions, which are widely supported, using [async-to-gen][], or
using [Babel][] with the [babel-plugin-transform-async-to-generator][async-to-generator]
transform. If you do not want a build step, you can use the [Bluebird .coroutine][coroutine]
method to write similar-looking code with generator functions.

Some miniplug methods don't return Promises, but return their result
immediately. By convention, miniplug method names that are nouns (such as
`room()`, or `user()`) return immediately. Method names that are verbs (like
`getRooms()`, or `getUser()`) return Promises, and usually fetch new data from
the plug.dj API.

[Bluebird]: http://bluebirdjs.com
[Bluebird API]: http://bluebirdjs.com/docs/api-reference.html
[async functions]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
[Babel]: https://babeljs.io
[async-to-gen]: https://github.com/leebyron/async-to-gen
[async-to-generator]: https://babeljs.io/docs/plugins/transform-async-to-generator/
[coroutine]: http://bluebirdjs.com/docs/api/promise.coroutine.html

<a id="mp-constructor"></a>
## mp = miniplug(opts={})

Create a miniplug instance. Available options:

 - `opts.guest` - If true, will log in as a guest user. Defaults to false.
 - `opts.email` and `opts.password` - Login credentials. Only email/password
   login is supported at the moment.

```js
const miniplug = require('miniplug')

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
const lotteryPlugin = require('miniplug-lottery')

mp.use(lotteryPlugin())
  .use((instance) => { /* Add other custom methods to `instance` */ })
```

<a id="mp-join"></a>
## mp.join(room): Promise&lt;[Room](#class-room)>

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

<a id="mp-getmyrooms"></a>
## mp.getMyRooms(): Promise&lt;Array&lt;[Room](#class-room)>>

List the rooms created by the current user.

```js
console.log('Your rooms:')
mp.getMyRooms().each((room) => {
  console.log(`https://plug.dj/${room.slug}: ${room.name}`)
})
```

<a id="mp-validateroomname"></a>
## mp.validateRoomName(name): Promise&lt;{slug: string}>

Check if a room name is valid and available. Returns a Promise that resolves
with an object containing the room's `slug` if the name is valid and available,
and rejects if the name is invalid or unavailable.

```js
mp.validateRoomName('Tastycat')
  .then((o) => console.log('Room is available with slug:', o.slug))
  .catch((err) => console.log(err.message))
```

<a id="mp-createroom"></a>
## mp.createRoom(name, isPrivate = false): Promise&lt;[Room](#class-room)>

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
## mp.getRoomState(): Promise&lt;[Room](#class-room)>

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
## mp.users(): Array&lt;[User](#class-user)>

Synchronously get all user objects from the current room.

```js
console.log('Users:', mp.users().map((user) => user.username))
```

<a id="mp-guests"></a>
## mp.guests(): number

Get the number of guests in the current room.

<a id="mp-getme"></a>
## mp.getMe(): Promise&lt;[User](#class-user)>

Get the current logged-in user from the plug.dj web API. [mp.me()](#mp-me)
should be used instead whenever possible.

<a id="mp-getuser"></a>
## mp.getUser(id): Promise&lt;[User](#class-user)>

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

<a id="mp-score"></a>
## mp.score(): {positive, negative, grabs, listeners}

Get the score for the currently playing media.

Returns an object with properties:

  - `positive` - Amount of woots.
  - `negative` - Amount of mehs.
  - `grabs` - Amount of grabs.
  - `listeners` - Amount of listeners.

```js
const score = mp.score()
mp.chat(`Score: ${score.positive} woots - ${score.negative} mehs - ${score.grabs} grabs`)
```

<a id="mp-vote"></a>
## mp.vote(direction): Promise

Vote on the currently playing media.

`direction` is 1 for woot, -1 for meh.

```js
const direction = Math.random() < 0.5 ? -1 : 1
mp.vote(direction)
```

<a id="mp-woot"></a>
## mp.woot(): Promise

Woot the currently playing media.

```js
mp.woot().then(() => {
  mp.chat('Great track! Wooted!')
})
```

<a id="mp-meh"></a>
## mp.meh(): Promise

Meh the currently playing media.

```js
mp.meh().then(() => {
  mp.chat('Ew, I don\'t like this. :(')
})
```

<hr>

<a id="mp-dj"></a>
## mp.dj(): [User](#class-user)

Get the current DJ. Returns `null` if there is no DJ.

```js
mp.dj().chat('Nice play!')
// → "@Username Nice play!"
```

<a id="mp-waitlist"></a>
## mp.waitlist(): [Waitlist](#class-waitlist)

Get the current waitlist. A [Waitlist](#class-waitlist) object is a JavaScript
array containing [User](#class-user) objects, so the typical JavaScript array
methods can be used:

```js
mp.waitlist().forEach((user, position) => {
  console.log(`#${position + 1} - ${user.username}`)
})
```

There are also some additional methods:

```js
// By user ID
mp.waitlist().contains(762534)
// or by user object.
mp.waitlist().contains(mp.me())

mp.waitlist().positionOf(mp.me())
```

<a id="mp-joinwaitlist"></a>
## mp.joinWaitlist(): Promise

Join the waitlist.

<a id="mp-leavewaitlist"></a>
## mp.leaveWaitlist(): Promise

Leave the waitlist.

<a id="mp-setcycle"></a>
## mp.setCycle(cycle): Promise

Change whether the waitlist should cycle.

```js
// Disable waitlist cycle when there are 20 or more DJs.
mp.on('waitlistUpdate', (waitlist) => {
  if (waitlist.length < 20) {
    mp.setCycle(true)
  } else {
    mp.setCycle(false)
  }
})
```

<a id="mp-enablecycle"></a>
## mp.enableCycle(): Promise

Enable waitlist cycle. Shorthand to <code>[setCycle](#mp-setcycle)(true)</code>.

<a id="mp-disablecycle"></a>
## mp.disableCycle(): Promise

Disable waitlist cycle. Shorthand to <code>[setCycle](#mp-setcycle)(false)</code>.

<a id="mp-setlock"></a>
## mp.setLock(lock): Promise

Change whether normal users can join the waitlist. If the waitlist is locked,
only Resident DJs and up can join.

```js
mp.setLock(true).then(() => {
  mp.chat('Sorry! Only staff can join the waitlist at the moment.')
})
```

<a id="mp-lockwaitlist"></a>
## mp.lockWaitlist(): Promise

Lock the waitlist, preventing users from joining.
Shorthand to <code>[setLock](#mp-setlock)(true)</code>.

<a id="mp-unlockwaitlist"></a>
## mp.unlockWaitlist(): Promise

Unlock the waitlist, allowing everyone to join.
Shorthand to <code>[setLock](#mp-setlock)(false)</code>.

<a id="mp-adddj"></a>
## mp.addDJ(uid): Promise

Add a user to the end of the waitlist. `uid` is the user's ID.

<a id="mp-movedj"></a>
## mp.moveDJ(uid, position): Promise

Move a user in the waitlist.  `uid` is the user's ID. `position` is the target
position, starting at 0.

```js
// Add a user to position #2 in the waitlist.
mp.addDJ(123456).then(() => {
  return mp.moveDJ(123456, 1)
})
```

<a id="mp-removedj"></a>
## mp.removeDJ(uid): Promise

Remove a user from the waitlist. `uid` is the user's ID.

```js
const user = mp.user(123456)
mp.removeDJ(user.id).then(() => {
  return user.chat('I removed you from the waitlist. Sorry! 🙈')
})
```

<hr>

<a id="mp-chat"></a>
## mp.chat(message): Promise&lt;[ChatMessage](#class-chatmessage)>

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
## mp.emote(message): Promise&lt;[ChatMessage](#class-chatmessage)>

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

<hr>

<a id="mp-getproducts"></a>
## mp.getProducts(type, category='all'): Promise&lt;[StoreProduct](#class-storeproduct)>

Get the product listing from a store category. `type` is one of 'avatars',
'badges' or 'misc'. `category` selects a specific category, like a page in the
store. See [Product Categories](#productcategories) for an overview of available
categories for each product type.

```js
const randomItem = require('random-item')
mp.getProducts('avatars', 'island').then((products) => {
  return randomItem(products).purchase()
})
```

<a id="mp-getstoreavatars"></a>
## mp.getStoreAvatars(category='all'): Promise&lt;[StoreProduct](#class-storeproduct)>

Get the avatars store listing. Shorthand to `getProducts('avatars', category)`.

<a id="mp-getstorebadges"></a>
## mp.getStoreBadges(category='all'): Promise&lt;[StoreProduct](#class-storeproduct)>

Get the badges store listing. Shorthand to `getProducts('badges', category)`.

<a id="mp-getstoremisc"></a>
## mp.getStoreMisc(category='all'): Promise&lt;[StoreProduct](#class-storeproduct)>

Get the miscellaneous store listing. Shorthand to `getProducts('misc', category)`.

<a id="mp-getinventory"></a>
## mp.getInventory(type): Promise&lt;[InventoryProduct](#class-inventoryproduct)>

Get the products purchased by the user.

<a id="mp-getownedavatars"></a>
## mp.getOwnedAvatars(): Promise&lt;[InventoryProduct](#class-inventoryproduct)>

Get the avatars purchased by the user.

<a id="mp-getownedbadges"></a>
## mp.getOwnedBadges(): Promise&lt;[InventoryProduct](#class-inventoryproduct)>

Get the badges purchased by the user.

<a id="mp-purchase"></a>
## mp.purchase(product): Promise

Purchase an avatar or a badge. `product` is a product ID, or a
[StoreProduct](#class-storeproduct).

<a id="mp-validateusername"></a>
## mp.validateUsername(name): Promise&lt;{slug: string}>

Check if a user name is valid and available. Returns a Promise that resolves
with an object containing the new profile `slug` if the name is valid and
available, and rejects if the name is invalid or unavailable.

```js
mp.validateUsername('Burkes')
  .then((o) => console.log('Username is available with slug:', o.slug))
  .catch((err) => console.log(err.message))
```

<a id="mp-purchasenamechange"></a>
## mp.purchaseNameChange(username): Promise

Purchase a name change.

<hr>

<a id="mp-notifications"></a>
## mp.notifications(): Array&lt;[Notification](#class-notification)>

Get a list of current notifications.

```js
// Acknowledge all notifications.
const promises = mp.notifications().map((notif) => {
  return notif.acknowledge()
})

// Wait for all acknowledgements to go through.
Promise.all(promises).then(() => {
  console.log('All clear!')
})
```

<a id="mp-notifications"></a>
## mp.getNotifications(): Promise&lt;Array&lt;[Notification](#class-notification)>>

Get current notifications from the plug.dj Web API. Normally
[mp.notifications()](#mp-notifications) should be preferred instead, because
it's instant.

<a id="mp-notifications"></a>
## mp.acknowledgeNotification(id): Promise

Acknowledge and remove a notification. `id` is the numeric unique ID of the
notification.

<hr>

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

<a id="room-gethost"></a>
### room.getHost(): Promise&lt;[User](#class-user)>

Get this room's host.

```js
// Attempt to befriend the host of the most populated room.
mp.getRooms().get(0).then((room) => {
  return room.getHost()
}).then((host) => {
  return host.befriend()
})

// To get the host from the current room, use:
mp.room().getHost().then((host) => {
  // Do whatever
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

<a id="user-id"></a>
### user.id: number

User ID.

<a id="user-username"></a>
### user.username: string

Username.

<a id="user-role"></a>
### user.role: [ROLE](#role)

The user's role in the current room. One of

 - `ROLE.NONE`,
 - `ROLE.DJ`,
 - `ROLE.BOUNCER`,
 - `ROLE.MANAGER`,
 - `ROLE.COHOST`,
 - `ROLE.HOST`.

<a id="user-grole"></a>
### user.gRole: [ROLE](#role)

The user's global role. One of

 - `ROLE.NONE`,
 - `ROLE.AMBASSADOR`,
 - `ROLE.ADMIN`.

<a id="user-haspermission"></a>
### user.hasPermission(role: [ROLE](#role)): bool

Check if the user has a role in the current room.

This function checks if either one of the role in the current room, or the
global role is equal to or higher than the given role.

**Parameters**

 - `role` - The permission to check for.

```js
const { ROLE } = require('miniplug')
mp.me().hasPermission(ROLE.NONE) // → true
mp.me().hasPermission(ROLE.BOUNCER) // depends on your role in the current room
```

<a id="user-hasglobalpermission"></a>
### user.hasGlobalPermission(role: [ROLE](#role)): bool

Check if the user has the given global role. Returns `true` if the user's global
role is equal to or higher than the given role.

**Parameters**

 - `role` - The role to check for.

```js
const { ROLE } = require('miniplug')
mp.me().hasGlobalPermission(ROLE.NONE) // → true
mp.me().hasGlobalPermission(ROLE.AMBASSADOR)
```

<a id="user-chat"></a>
### user.chat(text): Promise&lt;[ChatMessage](#class-chatmessage)>

Send a chat message directed at this user. Prepends `@Username` to the provided
text.

```js
mp.user(123456).chat('Hello!')
// → "@Username Hello!"
```

<a id="user-emote"></a>
### user.emote(text): Promise&lt;[ChatMessage](#class-chatmessage)>

Send an emote chat message directed at this user.

```js
mp.user(123456).emote('Hello!')
// → "/me @Username Hello!"
```

<a id="user-mention"></a>
### user.mention(): string

Get a string to mention the user in the chat.

```js
const mentionStr = mp.user(123456).mention()
// → "@Username"
```

This function is also used when stringifying a user object, for example when
embedding it in a template string:

```js
const message = `Hello ${mp.user(123456)}!`
// → "Hello @Username!"
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

<a id="class-waitlist"></a>
## Waitlist

Waitlist objects are JavaScript arrays of [User](#class-user) objects. Like
JavaScript arrays, Waitlist objects are zero-indexed, so the user on top of the
waitlist (#1 on plug.dj) is `waitlist[0]`.

```js
// Notify users when they're about to play.
mp.on('advance', () => {
  const waitlist = mp.waitlist()
  if (waitlist.length >= 1) {
    waitlist[0].chat('You\'re up next!')
  }
})
```

Because Waitlist objects are JavaScript arrays, all the usual JavaScript array
methods can be used. Note that most native JavaScript array methods return plain
JavaScript arrays, and _not_ Waitlist objects.

```js
const firstTen = mp.waitlist().slice(0, 10)
// firstTen is NOT a Waitlist object--just an array of the first ten users.
```

<a id="waitlist-contains"></a>
### waitlist.contains(user): bool

Check if a user is in the waitlist. `user` is a [User](#class-user) object or a
user ID.

```js
if (mp.waitlist().contains(123456)) {
  mp.user(123456).chat('You\'re in the waitlist, Hermione!')
}
```

This is similar to the `Array#includes` method of JavaScript arrays. However,
`includes` only checks that exactly the given object is in the array, whereas
`contains` checks whether an object representing the same user as the given
object or ID is in the array.

<a id="waitlist-positionof"></a>
### waitlist.positionOf(user): number

Returns the position of a user in the waitlist. `user` is a [User](#class-user)
object or a user ID. Returns -1 if the given user is not in the waitlist.

This is similar to the `Array#indexOf` method of JavaScript arrays. The same
differences apply as with <code>[waitlist.contains](#waitlist-contains)</code>.

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
### message.getUser(): Promise&lt;[User](#class-user)>

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
### message.reply(text): Promise&lt;[ChatMessage](#class-chatmessage)>

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
### message.emote(text): Promise&lt;[ChatMessage](#class-chatmessage)>

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

<a id="class-historyentry"></a>
## HistoryEntry

<a id="historyentry-id"></a>
### entry.id: string

The unique ID of the history entry.

<a id="historyentry-media"></a>
### entry.media: [Media](#class-media)

The media that was played.

<a id="historyentry-room"></a>
### entry.room: [Room](#class-room)

The room where the history entry was played. Note that this `.room` object only
contains three of the Room class properties:

 - `entry.room.name` - The name of the room;
 - `entry.room.slug` - The URL slug of the room;
 - `entry.room.private` - Whether the room is private.

There is not currently a way to load a full Room object if you need more
information. This will hopefully be added in a future update.

<a id="historyentry-user"></a>
### entry.user: [User](#class-user)

The user that played this song. Note that this `.user` object only contains two
of the User class properties:

 - `entry.user.id` - The user's ID. This allows you to use most User class
   methods.
 - `entry.user.username` - The user's name.

If you need anything else, use the [entry.getUser()](#historyentry-getuser)
method to load a full User object.

<a id="historyentry-time"></a>
<a id="historyentry-timestamp"></a>
### entry.timestamp: Date

Timestamp at which the history entry was played.

<a id="historyentry-score"></a>
### entry.score: {positive, negative, grabs, listeners}

An object describing audience response to the song. Contains four properties,
all numbers:

 - `entry.score.positive` - The amount of woots.
 - `entry.score.negative` - The amount of mehs.
 - `entry.score.grabs` - The amount of grabs.
 - `entry.score.listeners` - The amount of people in the room at the time the
   song was played.

<a id="historyentry-getuser"></a>
### entry.getUser(): Promise&lt;[User](#class-user)>

Get the full user object of the user who played this song.

<a id="class-storeproduct"></a>
## StoreProduct

<a id="storeproduct-type"></a>
### product.type: string

The product type: 'avatars', 'badges', or 'misc'.

<a id="storeproduct-category"></a>
### product.category: string

The product category, i.e. the page on which it appears in the store. See
[Product Categories](#productcategories).

<a id="storeproduct-id"></a>
### product.id: number

The product ID.

<a id="storeproduct-name"></a>
### product.name: string

The product name. This is _not_ a human-readable name. Examples include
"classic01" and "admin-o01".

<a id="storeproduct-level"></a>
### product.level: number

The minimum level the user has to have to unlock the product.

<a id="storeproduct-pp"></a>
### product.pp: number?

The price of the product in plug points. If the product cannot be purchased with
points, this property will not exist (i.e. be `undefined`).

<a id="storeproduct-sub"></a>
### product.sub: number?

`1` if the product is for Subscribers only. Subscriber-only products are
automatically added to the inventories of subscribed users. If the product is
not automatically available to subscribers, this property will not exist
(i.e. be `undefined`).

Note that `1` is a "truthy" value and `undefined` is falsy, so a simple `if`
statement can be used to check if a product is subscriber-only:

```js
mp.getStoreAvatars().each((avatar) => {
  let description = `Avatar: ${avatar.name}`
  if ('pp' in avatar) {
    description += ` - Points: ${avatar.pp}`
  }
  if ('cash' in avatar) {
    description += ` - $${avatar.cash}`
  }
  if (avatar.sub) {
    description += ' - Free for Subscribers'
  }
  console.log(description)
})
```

<a id="storeproduct-cash"></a>
### product.cash: number?

The price of the product in US dollars. If the product cannot be purchased with
real money, this property will not exist (i.e. be `undefined`).

<a id="storeproduct-purchase"></a>
### product.purchase(): Promise

Purchase the product. Only works for products that can be purchased with points.

<a id="class-inventoryproduct"></a>
## InventoryProduct

<a id="inventoryproduct-type"></a>
### product.type: string

The product type: 'avatars', 'badges', or 'misc'.

<a id="inventoryproduct-category"></a>
### product.category: string

The product category, i.e. the page on which it appears in the user's inventory.
See [Product Categories](#productcategories).

<a id="inventoryproduct-id"></a>
### product.name: string

The internal product name.

<hr>

<a id="class-notification"></a>
## Notification

A plug.dj service notification. These are the notifications listed on your user
profile under My Profile » Notifications.

<a id="notification-id"></a>
## notification.id: number

Unique ID of the notification.

<a id="notification-action"></a>
## notification.action: string

Type of notification.
This determines what the [Notification](#class-notification)'s
[`value`](#notification-value) stands for. Miniplug parses the `value` for some
notification types.

 - `levelUp` - The user leveled up. `level` is the new level.
 - `custom` - A custom notification sent by plug.dj. `message` contains the
   notification message. Note that the message can contain HTML.
 - `gift` - The user received a gift. `from` contains the username of the
   sender, and `amount` contains the amount of PP that was gifted.
 - `boostExpired` - An XP boost purchased by the user has expired. Obsolete,
   since plug.dj doesn't sell XP boosts anymore.

<a id="notification-timestamp"></a>
## notification.timestamp: Date

Date and time when the notification came in.

<a id="notification-value"></a>
## notification.value: string

Raw value of the notification. This can mean different things for different
actions. It's best to use one of the other properties documented below if you
can.

See [`notification.action`](#notification-action).

<a id="notification-level"></a>
## notification.level: number

The user's new level after leveling up. Only present when the notification
`action` is `levelUp`.

<a id="notification-message"></a>
## notification.message: string

HTML message contents of a plug.dj announcement notification. Only present when
the notification `action` is `custom`.

<a id="notification-from"></a>
## notification.from: string

Nickname of the sender of a gift. Only present when the notification `action` is
`gift`.

<a id="notification-amount"></a>
## notification.amount: number

Amount of PP in a gift. Only present when the notification `action` is `gift`.

<a id="notification-acknowledge"></a>
## notification.acknowledge(): Promise

Acknowledge and remove the notification.

<hr>

<a id="role"></a>
## User Roles

```js
const { ROLE } = require('miniplug')
```

### ROLE.NONE

A normal user.

### ROLE.DJ

A Resident DJ in the current room.

### ROLE.BOUNCER

A Bouncer in the current room.

### ROLE.MANAGER

A Manager in the current room.

### ROLE.COHOST

A Cohost in the current room.

### ROLE.HOST

The current room's host.

### ROLE.AMBASSADOR

A plug.dj Brand Ambassador.

### ROLE.ADMIN

A plug.dj site admin.

<a id="muteduration"></a>
## Mute Durations

```js
const { MUTE_DURATION } = require('miniplug')
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
const { MUTE_REASON } = require('miniplug')
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
const { BAN_DURATION } = require('miniplug')
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
const { BAN_REASON } = require('miniplug')
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
const { MEDIA_SOURCE } = require('miniplug')
```

### MEDIA_SOURCE.YOUTUBE

Identifies a YouTube video.

### MEDIA_SOURCE.SOUNDCLOUD

Identifies a SoundCloud track.

<a id="productcategories"></a>
## Product Categories

Note: These listings were last updated on 03 December 2016. It's not guaranteed
to be 100% correct. If you spot a mistake or a missing category, please send a
PR!

### Avatars

 - 'classic'
 - 'hiphop'
 - 'rave'
 - 'base'
 - 'country'
 - '80s'
 - 'rock'
 - '2014hw'
 - 'robot'
 - 'zoo'
 - 'warrior'
 - 'dragon'
 - '2014winter'
 - 'sea'
 - 'island'
 - 'diner'
 - 'beach'
 - 'nyc'

### Badges

 - 'b-original'
 - 'b-sea'
 - 'b-island'
 - 'b-rave'
 - 'b-base'
 - 'b-food'
 - 'b-diner'
 - 'b-country'
 - 'b-robot'
 - 'b-zoo'
 - 'b-hiphop'
 - 'b-80s'
 - 'b-warrior'
 - 'b-beach'
 - 'b-nyc'

### Misc

 - 'username'
 - 'boost' is obsolete, but used to contain XP boost items in the past.

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

<a id="events"></a>
# Events

 - [advance](#event-advance)
 - [chat](#event-chat)
 - [chatDelete](#event-chatdelete)
 - [earn](#event-earn)
 - [friendAccept](#event-friendaccept)
 - [friendRequest](#event-friendrequest)
 - [gifted](#event-gifted)
 - [grab](#event-grab)
 - [guestJoin](#event-guestjoin)
 - [guestLeave](#event-guestleave)
 - [modAddDj](#event-modadddj)
 - [modBan](#event-modban)
 - [modMoveDj](#event-modmovedj)
 - [modMute](#event-modmute)
 - [modRemoveDj](#event-modremovedj)
 - [modSkip](#event-modskip)
 - [modStaff](#event-modstaff)
 - [roomUpdate](#event-roomupdate)
 - [roomNameUpdate](#event-roomnameupdate)
 - [roomDescriptionUpdate](#event-roomdescriptionupdate)
 - [roomWelcomeUpdate](#event-roomwelcomeupdate)
 - [roomMinChatLevelUpdate](#event-roomminchatlevelupdate)
 - [skip](#event-skip)
 - [userJoin](#event-userjoin)
 - [userLeave](#event-userleave)
 - [userUpdate](#event-userupdate)
 - [vote](#event-vote)
 - [waitlistClear](#event-waitlistclear)
 - [waitlistCycle](#event-waitlistcycle)
 - [waitlistLock](#event-waitlistlock)
 - [waitlistUpdate](#event-waitlistupdate)

<a id="event-advance"></a>
## 'advance'

Fired when the DJ booth advances, and the next song starts playing.

**Parameters**

 - `next` - The new [HistoryEntry](#class-historyentry), or `null` if there is
   no new DJ.
 - `previous` - The previous [HistoryEntry](#class-historyentry), or `null` if
   there was no DJ earlier.

```js
mp.on('advance', (next, previous) => {
  if (previous) {
    console.log('Last song:', previous.media.author, '-', previous.media.title)
  }
  if (next) {
    console.log('Next song:', next.media.author, '-', next.media.title)
  }
})
```

<a id="event-chat"></a>
## 'chat'

Fired when a chat message is received.

**Parameters**

 - `message` - The incoming [ChatMessage](#class-chatmessage).

```js
mp.on('chat', (message) => {
  if (/^!whoami/.test(message.message)) {
    message.reply(`You are ${message.un}, #${message.uid}.`)
  }
})
```

<a id="event-chatdelete"></a>
## 'chatDelete'

Fired when a chat message is deleted.

**Parameters**

 - `del` - An object with two properties:
   - `cid` - The ID of the chat message that is being deleted.
   - `user` - The [User](#class-user) that deleted the message.

```js
mp.on('chatDelete', (del) => {
  console.info(`${del.user.username} deleted message #${del.cid}.`)
})
```

<a id="event-earn"></a>
## 'earn'

Fired when xp/pp is added to your account.

**Parameters**

 - `xp` - The new xp amount.
 - `pp` - The new pp amount.
 - `level` - The current level, or new level on level up.

```js
mp.on('earn', (data) => {
  console.info(`I now have ${data.xp} xp, ${data.pp} pp, and am level ${data.level}.`)
})
```

<a id="event-friendaccept"></a>
## 'friendAccept'

Fired when a user accepts a friend request.

**Parameters**

 - `user` - The [User](#class-user) that accepted the request.

```js
mp.on('friendAccept', (user) => {
  mp.chat(`Thanks ${user}, for accepting my friend request!`)
})
```

<a id="event-friendrequest"></a>
## 'friendRequest'

Fired when a user sends you a friend request. The [User](#class-user) methods
[.befriend](#user-befriend) and [.rejectRequest](#user-rejectrequest) can be
used to respond to the request.

**Parameters**

 - `user` - The [User](#class-user) that sent the request.

```js
mp.on('friendRequest', (user) => {
  if (user.level < 5) {
    user.befriend()
  } else {
    user.chat('I only befriend users whose level is below 5, sorry.')
    user.rejectRequest()
  }
})
```

<a id="event-gifted"></a>
## 'gifted'

Fired when a user sends another user a gift.

**Parameters**

 - `sender` - The name of the user who sent the gift.
 - `recipient` - The name of the user who received the gift.

```js
mp.on('gifted', (data) => {
  console.log(`${data.sender} sent ${data.recipient} a gift!`)
})
```

<a id="event-grab"></a>
## 'grab'

Fired when a user grabs the current song.

**Parameters**

 - `user` - The [User](#class-user) who grabbed the song.

```js
mp.on('grab', (user) => {
  const media = mp.media()
  console.log(user.mention(), 'grabbed', media.author, '-', media.title)
})
```

<a id="event-guestjoin"></a>
## 'guestJoin'

Fired when a guest joins the room. Does not receive any parameters.

```js
mp.on('guestJoin', () => {
  console.log('A wild guest appeared!')
})
```

<a id="event-guestleave"></a>
## 'guestLeave'

Fired when a guest leaves the room. Does not receive any parameters.

```js
mp.on('guestLeave', () => {
  console.log('A guest left the room.')
})
```

<a id="#event-modadddj"></a>
## 'modAddDj'

Fired when a moderator adds a user to the waitlist.

**Parameters**

 - `moderator` - The staff [User](#class-user) who added the user to the waitlist.
 - `username` - The name of the user that was added.
 - `cycle` - Weather the waitlist should cycle (true/false)

```js
mp.on('modAddDj', (data) => {
  console.log(`Moderator ${data.moderator.username} has added ${data.username} to the waitlist.`)
})
```

<a id="#event-modban"></a>
## 'modBan'

Fired when a moderator bans a user.

**Parameters**

 - `moderator` - The staff [User](#class-user) who banned the user.
 - `username` - The name of the user that was banned.
 - `duration` - The duration of time the ban lasts for

```js
mp.on('modBan', (data) => {
  var duration = '';

  switch (data.duration) {
    case 'h': duration = 'for an hour'; break;
    case 'd': duration = 'for a day'; break;
    case 'f': duration = 'forever'; break;
  }

  console.log(`Moderator ${data.moderator.username} has banned ${data.username} ${duration}.`)
})
```

<a id="#event-modmovedj"></a>
## 'modMoveDj'

Fired when a moderator moves the position of a user in the waitlist.

**Parameters**

 - `moderator` - The staff [User](#class-user) who moved the user in the waitlist.
 - `username` - The name of the user that was moved.
 - `movedFrom` - The position the user was at.
 - `movedTo` - The position the user was moved to.

 ```js
mp.on('modMoveDj', (data) => {
  // movedFrom and movedTo are both 0 indexed
  console.log(`${data.moderator.username} has moved ${data.username} from position ${data.movedFrom + 1} to position ${data.movedTo + 1}`)
})
```

<a id="#event-modmute"></a>
## 'modMute'

Fired when a moderator mutes a user.

**Parameters**

 - `moderator` - The staff [User](#class-user) who muted the user.
 - `username` - The [User](#class-user) object of the user who was muted.
 - `reason` - The reason for the mute.
 - `duration` - The length of time the mute lasts for.

 ```js
mp.on('modMute', (data) => {
  var length = '', reason = '', msg = `${data.moderator.username} `;

  switch (data.duration) {
    case 'o': length = 'unmuted'; break;
    case 's': length = '15'; break;
    case 'm': length = '30'; break;
    case 'l': length = '45'; break;
  }

  switch (data.reason) {
    case 1: reason = 'violating community rules'; break;
    case 2: reason = 'verbal abuse or harassment'; break;
    case 3: reason = 'spamming or trolling'; break;
    case 4: reason = 'offensive language'; break;
    case 5: reason = 'negative attitude'; break;
  }

  if (data.duration == 'o')
    msg += `unmuted ${data.user.username}`
  else
    msg += `muted ${data.user.username} (${length} mins) for ${reason}`

  console.log(msg)
})
```

<a id="#event-modremovedj"></a>
## 'modRemoveDj'

Fired when a moderator removes a user from the waitlist.

**Parameters**

 - `moderator` - The staff [User](#class-user) who removed the user from the waitlist.
 - `username` - The name of the user that was removed.
 - `inBooth` - Weather the user was in the booth/djing (true/false)

 ```js
mp.on('modRemoveDj', (data) => {
  console.log(`${data.moderator.username} has removed ${data.username} from the ${data.inBooth ? 'booth' : 'waitlist'}`)
})
```

<a id="#event-modskip"></a>
## 'modSkip'

Fired when a moderator skips the current song playing.

**Parameters**

 - `moderator` - The staff [User](#class-user) who skipped the song.

 ```js
mp.on('modSkip', (moderator) => {
  console.log(`${moderator.username} has skipped the current DJ`)
})
```

<a id="#event-modstaff"></a>
## 'modStaff'

Fired when a user is promoted or demoted.

**Parameters**

 - `moderator` - The staff [User](#class-user) who promoted/demoted the user.
 - `user` - The [User](#class-user) who was promoted/demoted.
 - `role` - The role of the user who was promoted/demoted.

 ```js
mp.on('modStaff', (data) => {
  var role = ''

  if (data.role === 1)
    role = 'Resident DJ'
  else if (data.role === 2)
    role = 'Bouncer'
  else if (data.role === 3)
    role = 'Manager'
  else if (data.role === 4)
    role = 'Co-Host'
  else if (data.role === 5)
    role = 'Host'

  if (data.role == 0)
    console.log(`${data.moderator.username} removed ${data.user.username} from the staff.`)
  else
    console.log(`${data.moderator.username} set ${data.user.username} as a ${role}.`)
})
```

<a id="event-roomupdate"></a>
## 'roomUpdate'

Fired when an attribute of the current room updates.

**Parameters**

 - `change` - Object containing the new attribute/value pair. For example, if
   the welcome message was changed, the object may contain
   `{ welcome: 'Hello!' }`.
 - `user` - The staff [User](#class-user) who made the change.

```js
const roomProperties = mp.room().toJSON()

mp.on('roomUpdate', (change) => {
  Object.assign(roomProperties, change)
})
```

<a id="event-roomnameupdate"></a>
## 'roomNameUpdate'

Fired when the room name was changed.

**Parameters**

 - `name` - The new room name.
 - `user` - The staff [User](#class-user) who made the change.

```js
mp.on('roomNameUpdate', (name, user) => {
  console.log(user.mention(), 'changed the room name to', name)
})
```

<a id="event-roomdescriptionupdate"></a>
## 'roomDescriptionUpdate'

Fired when the room description was changed.

**Parameters**

 - `description` - The new room description.
 - `user` - The staff [User](#class-user) who made the change.

```js
mp.on('roomDescriptionUpdate', (description, user) => {
  console.log(user.mention(), 'changed the room description to:')
  console.log(description)
})
```

<a id="event-roomwelcomeupdate"></a>
## 'roomWelcomeUpdate'

Fired when the room welcome message was changed.

**Parameters**

 - `welcome` - The new welcome message.
 - `user` - The staff [User](#class-user) who made the change.

```js
mp.on('roomWelcomeUpdate', (welcome, user) => {
  console.log(user.mention(), 'changed the welcome message.')
  console.log('New users will now see', welcome)
})
```

<a id="event-roomminchatlevelupdate"></a>
## 'roomMinChatLevelUpdate'

Fired when the room's minimum chat level changes.

**Parameters**

 - `minChatLevel` - The new minimum chat level.
 - `user` - The staff [User](#class-user) who made the change.

```js
mp.on('roomMinChatLevelUpdate', (level, user) => {
  console.log(user.mention(), 'changed the minimum chat level to', level)
})
```

<a id="event-skip"></a>
## 'skip'

Fired when a user skips their own play.

**Parameters**

 - `user` - The [User](#class-user) object of the user who skipped.

```js
mp.on('skip', (user) => {
  console.log(`${user.username} has decided to skip.`)
})
```

<a id="event-userjoin"></a>
## 'userJoin'

Fired when a user joins the room.

**Parameters**

 - `user` - The [User](#class-user) object of the new user.

```js
mp.on('userJoin', (user) => {
  user.send('Welcome!')
})
```

<a id="event-userleave"></a>
## 'userLeave'

Fired when a user leaves the room.

**Parameters**

 - `user` - The [User](#class-user) object of the leaving user.

```js
const { BAN_DURATION, BAN_REASON } = require('miniplug')
mp.on('userLeave', (user) => {
  // Alright then. GOOD BYE AND NEVER COME BACK!! 😠💢
  user.ban(BAN_DURATION.PERMANENT, BAN_REASON.ATTITUDE)
})
```

<a id="event-userupdate"></a>
## 'userUpdate'

Fired when a user object was updated.

**Parameters**

 - `user` - The [User](#class-user) object that is being updated.
 - `prevProps` - An object containing the old values of the properties that have
   changed.

```js
const { BAN_DURATION, BAN_REASON } = require('miniplug')
const { pick, keys } = require('lodash')

mp.on('userUpdate', (user, prevProps) => {
  const updatedPropsOnly = pick(user, keys(prevProps))

  console.log(`Updated ${user.mention()}:`)
  console.log(prevProps, '→', updatedPropsOnly)
})
```

<a id="event-vote"></a>
## 'vote'

Fired when a user woots or mehs a song.

**Parameters**

 - `data` - An object with two properties:
   - `user` - The [User](#class-user) who voted.
   - `vote` - The direction of the vote: `1` for a woot, `-1` for a meh.

```js
mp.on('vote', (data) => {
  if (data.vote === 1) {
    console.log(data.user.mention(), 'wooted this track!')
  } else if (data.vote === -1) {
    console.log(data.user.mention(), 'meh\'d this track…')
  }
})
```

<a id="event-waitlistclear"></a>
## 'waitlistClear'

Fired when the waitlist is cleared.

**Parameters**

 - `update` - An object with the following properties:
   - `user` - The [User](#class-user) that cleared the waitlist.

```js
mp.on('waitlistClear', (update) => {
  console.info(`${update.user.mention()} cleared the waitlist!`)
})
```

<a id="event-waitlistcycle"></a>
## 'waitlistCycle'

Fired when the waitlist cycle status changes.

**Parameters**

 - `update` - An object with two properties:
   - `shouldCycle` - Whether the waitlist should cycle.
   - `user` - The [User](#class-user) that changed this setting.

```js
mp.on('waitlistCycle', (update) => {
  console.info(`Waitlist cycling is now ${update.shouldCycle ? 'enabled' : 'disabled'}!`)
})
```

<a id="event-waitlistlock"></a>
## 'waitlistLock'

Fired when the waitlist lock status changes.

**Parameters**

 - `update` - An object with the following properties:
   - `locked` - A boolean indicating the new waitlist locked status.
   - `cleared` - True if the waitlist was also cleared.
   - `user` - The [User](#class-user) that changed this setting.

```js
mp.on('waitlistLock', (update) => {
  let verb = 'unlocked'
  if (update.cleared) verb = 'cleared'
  else if (update.locked) verb = 'locked'

  console.info(`${update.user.mention()} ${verb} the waitlist.`)
})
```

<a id="event-waitlistupdate"></a>
## 'waitlistUpdate'

Fired when the waitlist changes.

**Parameters**

 - `next` - The new [Waitlist](#class-waitlist).
 - `previous` - The previous [Waitlist](#class-waitlist).

```js
mp.on('waitlistUpdate', (next, previous) => {
  const me = mp.me()

  // Notify the next DJ that it is almost their turn.
  if (next.length > 0) {
    next[0].send('You are next!')
  }

  // Both parameters are full Waitlist objects.
  console.log('I moved from', previous.positionOf(me), 'to', next.positionOf(me))
})
```

<a id="errors"></a>
# Errors

Miniplug wraps errors from the plug.dj API in custom error classes.
Specific types of errors can be caught using Bluebird's `catch` function:

```js
const miniplug = require('miniplug')

const mp = miniplug({ /* credentials */ })
mp.purchaseNameChange('Test Name')
  .catch(miniplug.NotEnoughPPError, (err) => {
    console.error('You do not have enough Plug Points to change your name.')
  })
```

All error objects have the following properties:

 - `message` - A human-readable string describing the reason for the error.
 - `status` - A status code from plug.dj.
 - `response` - The HTTP response object from [got](https://github.com/sindresorhus/got#goturl-options).
 - `cause` - The error that was wrapped, usually one from [got](https://github.com/sindresorhus/got#errors).

<a id="error-requesterror"></a>
## RequestError

A generic error that indicates that you have tried to do something impossible.

<a id="error-badloginerror"></a>
## BadLoginError

The username/password combination was incorrect.

<a id="error-notauthorizederror"></a>
## NotAuthorizedError

The bot account does not have permission to do this thing. Perhaps because the
thing requires you to be logged in, or to be a certain rank in the room.

<a id="error-notfounderror"></a>
## NotFoundError

The thing you are looking for does not exist.

<a id="error-novalidplaylisterror"></a>
## NoValidPlaylistError

The user to be added to the waitlist does not have a valid playlist.

<a id="error-notenoughpperror"></a>
## NotEnoughPPError

The bot account does not have enough Plug Points to purchase this thing.
