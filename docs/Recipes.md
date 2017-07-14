# Recipes

> A collection of short examples using Miniplug to accomplish common tasks.

  - [Self-deleting messages](#self-deleting-messages)
  - [Lockskip](#lockskip)
  - [Async Functions](#async-functions)
  - [Extending Objects](#extending-objects)

## Self-deleting messages

Moderation bots often delete their own messages after a while to avoid
cluttering everybody's chat.

[`mp.chat`](./API.md#mp-chat) returns a [Bluebird][] promise for the chat
message. Bluebird provides the `delay` and `call` methods, which can be used to
call the `delete` method on the message after some time:

```js
mp.chat('Meh limit: 5')
  .delay(5000) // Wait 5 seconds
  .call('delete')
```

## Lockskip

A lockskip skips the current DJ, but puts them back in front of the waitlist
so they can play again soon.

```js
const dj = mp.dj()
const entry = mp.historyEntry()

// Skip the DJ, then move them back to spot #2 on the waitlist.
const lockskipPosition = 2
dj.skip(entry.id).then(() => {
  return dj.move(lockskipPosition)
})
```

## Async Functions

Async functions are a new JavaScript feature that aims to make Promise-based
code a lot easier to read. The code in the [Lockskip](#lockskip) recipe looks
like this with async functions:

```js
async function lockskip () {
  // Skip the DJ, then move them back to spot #2 on the waitlist.
  const lockskipPosition = 2
  await dj.skip(entry.id)
  await dj.move(lockskipPosition)
}
```

Async functions are available by default starting in Node.js v7.6. If you're
using miniplug with an earlier Node.js version, you can use the [async-to-gen][]
module like below:

```js
require('async-to-gen/register')
require('./bot')
```

This will compile async functions in your code to more widely compatible
JavaScript before running it.

## Extending Objects

Miniplug uses `wrapObject` methods to instantiate objects of various types.
Extending these methods can be useful if you are writing a custom plugin. A good
way to extend wrapper methods is to use function composition, using the
[compose-function][] module for example.

```js
import compose from 'compose-function'

function afkPlugin () {
  return (mp) => {
    function decorateUser (user) {
      // Make sure to return the modified user object!
      return Object.assign(user, {
        // Add a `removeAfk` method to user objects, that will remove the user
        // from the waitlist and tell them why they've been removed.
        removeAfk: () =>
          user.remove().then(() => {
            return user.send(
              'You have been AFK for too long. ' +
              'You have been removed from the waitlist.'
            )
          })
      })
    }

    // mp.wrapUser will now first call the old method, and pass the result to
    // `decorateUser`.
    mp.wrapUser = compose(decorateUser, mp.wrapUser)

    // So now you can do:
    mp.me().removeAfk()
  }
}
```

The wrapper methods are:

 - `wrapMessage`, for [ChatMessage](./API.md#class-chatmessage)s
 - `wrapHistoryEntry`, for [HistoryEntrie](./API.md#class-historyentry)s
 - `wrapInventoryProduct`, for [InventoryProduct](./API.md#class-inventoryproduct)s
 - `wrapMedia`, for [Media](./API.md#class-media)
 - `wrapNotification`, for [Notification](./API.md#class-notification)s
 - `wrapPlaylist`, for [Playlist](./API.md#class-playlist)s
 - `wrapRoom`, for [Room](./API.md#class-room)s
 - `wrapStoreProduct`, for [StoreProduct](./API.md#class-storeproduct)s
 - `wrapUser`, for [User](./API.md#class-user)s
 - `wrapWaitlist`, for the [Waitlist](./API.md#class-waitlist)
 - `wrapWaitlistBan`, for [WaitlistBan](./API.md#class-waitlistban)s

[Bluebird]: http://bluebirdjs.com
[async-to-gen]: https://github.com/leebyron/async-to-gen
[compose-function]: https://npmjs.com/package/compose-function
