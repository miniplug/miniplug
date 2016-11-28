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
 - [Room](#class-room)
   - [room.id](#room-id)
   - [room.name](#room-name)
   - [room.slug](#room-slug)
   - [room.join()](#room-join)
   - [room.favorite()](#room-favorite)
   - [room.unfavorite()](#room-unfavorite)
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
