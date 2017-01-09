# Recipes

> A collection of short examples using Miniplug to accomplish common tasks.

  - [Self-deleting messages](#self-deleting-messages)
  - [Lockskip](#lockskip)

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

[Bluebird]: http://bluebirdjs.com
