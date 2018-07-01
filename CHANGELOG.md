# miniplug change log

All notable changes to this project will be documented in this file.

This project adheres to [Semantic Versioning](http://semver.org/).

## 2.0.1 / 31 Jun 2018

Internal:
 * Update dependencies to avoid vulnerability warnings.

## 2.0.0 / 30 Jun 2018

Breaking changes:
 * Don't connect on initialisation by default. (#116)
 * Switch from `bluebird` to `bluebirdish`. (#115)
 * Switch from `got` to `node-fetch`. (#115)

See below for upgrade instructions.

Features:
 * Return Room instance from `.join()`. (#115)

Removed:
 * Remove `'waitlistBan'` event alias, use `'modWaitlistBan'` instead. (#115)
 * Remove `HistoryEntry#time` property alias, use `HistoryEntry#timestamp` instead. (#115)
 * Remove `HistoryEntry#dj`, use `HistoryEntry#user` instead. (#115)

### Don't connect on initialisation

> This change affects everyone.

v1.x accepted `email` and `password` options in the `miniplug()` constructor, and immediately connected to the plug.dj API and socket. This was handy but there was no clear way to handle login or connection failures. Now, this functionality has been split up, and the `.connect()` method must be used. `.connect()` returns a Promise, which you can attach `.catch()` handlers to. See its [documentation][mp.connect] for more.

```js
const mp = miniplug()
mp.connect({ email: 'test@miniplug.com', password: 'hunter2' }).catch((err) => {
  console.error('connection failed:', err.message)
  process.exit(1)
})

// Then just use it as normal.
mp.join('radiant')
```

[mp.connect]: https://github.com/miniplug/miniplug/blob/51d349a75b203e4711ebf63149868d192bd18533/docs/API.md#mp-connect

### Removed deprecated names

These properties and events were removed and will now throw an error:

 * `HistoryEntry#dj` - this was never supposed to exist, and did not exist consistently. Use `HistoryEntry#user` instead.
 * `HistoryEntry#time` - this was renamed to `HistoryEntry#timestamp` for consistency with other classes.
 * `mp.on('waitlistBan')` - the 'waitlistBan' event was renamed to 'modWaitlistBan'.

### Switch to `node-fetch`

> This change only affects you if you use the `response` property on Errors thrown by miniplug.

`node-fetch` is significantly smaller than `got`, and implements the web standard Fetch API.

Previously, `error.response` would contain a Got response object, now it contains the [`Response`][Response] object from the Fetch API.

[Response]: https://developer.mozilla.org/en-US/docs/Web/API/Response

### Switch to `bluebirdish`

> This change only affects you if you use Bluebird timeouts, cancellation, or disposers.

`bluebirdish` provides a similar API to Bluebird, but is built on native Promises. It is compatible in all features it implements, but it doesn't support a few things. In most situations, you should not have to change any code. If you were using `.timeout()`, `.cancel()`, or resource management with `Promise.using()` and `.disposer()`, that will no longer work by default. You can use `Bluebird.resolve(p)` to convert a bluebirdish Promise `p` from the miniplug API to a Bluebird Promise.

## 2.0.0-beta.1 / 26 Jun 2018

Breaking changes:
 * Remove `'waitlistBan'` event alias, use `'modWaitlistBan'` instead. (#115)
 * Remove `HistoryEntry#time` property alias, use `HistoryEntry#timestamp` instead. (#115)
 * Remove `HistoryEntry#dj`, use `HistoryEntry#user` instead. (#115)
 * Return Room instance from `.join()`. (#115)

Features:
 * Restore Node 4 support. (#115)

Bugfixes:
 * Connect as guest when `connect()` is called without argument. (#115)

## 2.0.0-beta.0 / 22 Jun 2018

Breaking changes:
 * Don't connect on initialisation by default. (#116)
 * Switch from `bluebird` to `bluebirdish`. (#115)
 * Switch from `got` to `node-fetch`. (#115)
 * Remove Node 4 from CI tests. (#115)

## 1.14.1 / 26 Jun 2018

Bugfixes:
 * Fix documentation of `join()` and `getRoomState()` methods. (45cd71d)
 * Add API header to readme so it is easier to spot. (20dfad6)

## 1.14.0 / 26 Apr 2018

Features:
 * Add `getChatHistory()`. (#113)
 * Add `isLocked()` and `isCycling()` functions. (#114)

## 1.13.4 / 17 Apr 2018

Bugfixes:
 * Remove unnecessary dependencies (async-to-gen, proxyquire). (ffb9d3f)

## 1.13.3 / 26 Feb 2018

Bugfixes:

 * roomState event would throw an error when trying to mp.wrapUser with an "undefined" user param.

## 1.13.2 / 22 Feb 2018

Bugfixes:

 * Some historyEntries would not have the #skip() method (#96)

## 1.13.0 / 04 Nov 2017

Features:

 * Add `HistoryEntry#skip`. (#83)
 * Add `disconnected` event. This can be used to implement auto-reconnect. (#77)

## 1.12.0 / 29 Sep 2017

Features:

 * Add constants for the new global user roles. (#82)

## 1.11.0 / 19 Sep 2017

This update addresses plug.dj's role ID change, please upgrade ASAP!

Features:

 * Implement `gift` event. (ffbdbcc3e300c26c91ba86ec38df713853bb369a)
 * Update role IDs. (#78)
   See https://blog.plug.dj/2017/09/roles-revamp/.
 * Implement `MaintenanceError`. (#59)

Bugfixes:

 * Remove `cycle` property from `modAddDj` event. (#74 by @Burkes)
 * Handle ghost users everywhere. (#74 by @Burkes)

## 1.10.0 / 14 Jul 2017

Features:

 * Include source files in published package. (fdb3255cf964b6898725b7730b0512bfa1033411)
 * Add `sub` event. (23994650853c0ebc8bfbd91d7db45a40526c4807)
 * Update user object on `earn` events. (ad65c808e49bab78bce493610059054d62608846)
 * Auto-disconnect when socket is idle for too long. (#64)
 * Implement waitlist bans endpoints. (#66)

Bugfixes:

 * Only set Error#response property if it is not yet set. (14ef2506036d9971747bb89c431ce279868fdff9)

Internal:

 * ci: Add Node 8. (533893eb990a03b6636daa75a88a375b0471083c)

## 1.9.0 / 22 Jun 2017

This release adds a few new features, increasing plug.dj API coverage.

Features:

 * Added `gifted` event. (#49 by @cosmetify)
 * Added `ban` event. (#51 by @cosmetify)
 * Make a good sync guess for user objects in chat messages. `message.user` will now be defined in most cases. (4cd5fd52d253c8ddd726940429bacdce58beb7e8)
 * Add `userByName`. (#50)
 * Use an http agent with the `keepAlive` option to speed up REST requests. (#57, #58)

## 1.8.1 / 18 May 2017

Bugfixes:

 * Port booth `user` property fix from v1.7.1 (ae75b4d3b8821922b158bc7e1c56cc416421d867)

## 1.8.0 / 18 May 2017

Thanks to @Cosmetify, who has been implementing a bunch of the websocket events for this release :pray:

Features:

 * Added `modAddDj`, `modMoveDj`, `modRemoveDj` events. (#36 by @cosmetify)
 * Added `modBan` event. (#38 by @cosmetify)
 * Added `modMute` event. (#41 by @cosmetify)
 * Added `earn` event. (#42 by @cosmetify)
 * Added `modSkip` event. (#44 by @cosmetify)
 * Added `skip` event. (#45 by @cosmetify) 
 * Added `modStaff` event. (#46 by @cosmetify)
 * Throw custom error classes for some types of plug.dj HTTP API responses. (#39) 
 * Rename the `HistoryEntry.time` property to `timestamp` -- `time` will still be available as an alias until v2.x. (579098fe4beb94f1a1a7c6d4f617151149ba7ebe)

## 1.7.1 / 14 May 2017

Bugfixes:

 * Fix `user` property on booth entries. (439fbb98b9f716aa16890a5629d7318bbff0b906)

## 1.7.0 / 22 Apr 2017

Features:

 * Add `getMyRooms()` method. (472dc3abd39c7f3fe1b72448203fa55a414285d8)
 * Add room property setters. (d58e30225b245a9837b436de96c65284c2a4b99f)
 * Add 'systemMessage', 'systemUpdate', and maintenance events. (4c775d15798d3a84c19382c3307fb5f678bd44b8, 1fbf7513c94fa3f7466ecba2256a276455b7ab0b, ea0c798127fceafdbd2c254a6a33c81aa9c05926)
 * Expose `wrap*` object wrapper functions. (0c2c70b7676744dc51407b88a2c5e028d1b80045)
 * Emit `userUpdate` events for `role` updates. (55e8f57f12229561da4243225e574ebb7b4d1add)
 * Include sourcemaps in published build. (fc310fe60c35d88258febd58846c184a804f6eca)

## 1.6.2 / 13 Apr 2017

Features:

 * Implement the `playlistCycle` event. (534a1aa987fe5bc93432fe7c399c70080635c26b)

Bugfixes:

 * Return user objects for ghost users in the `vote` event. (#33 by @Burkes)
 * Fix updating waitlist when it is empty after an advance. (#34, e61edcce828b7098895ed0e49eb7371cee7f817c)
 * Fix `dj()`, `historyEntry()`, `media()` returning outdated values when the booth is empty. (4a60f21b8517a7d35fc55b2f105f668809ef928f)
 * Fix getting the current user from the `user()` method. (#35, 69e55e431b3c6907ed29d201d6a6b59752cf3f54)

Special thanks to @Burkes for the PR and to @maxqui26 for several bug reports regarding empty DJ booths!

## 1.6.1 / 30 Mar 2017

Bugfixes:

 * Emit a `waitlistUpdate` event when advancing. (fe39328bd143a87c460cf0d18e6764850fe626dc)
 * Increase default maxEventListeners for miniplug event emitters. (834a88cdcdc17cec7d6880eba27070b9055e3b9a, 04f97ca000954bcb8ef42d15d7ccbd1b18b96c38)

## 1.6.0 / 20 Mar 2017

Features:

 * Add the `chatDelete` event. (ba4fed2f28aa42271222a7c5881ca2c3dbcd1b4e)
 * Add the `waitlistCycle` event. (30c563782954860ac2ef13491313623b5ae15bfd, 47bb47b22e1bac9c59ab9d9fefa15f1de9db8ebc)
 * Add `waitlistLock` and `waitlistClear` events. (0700a799abe67924e22410fb452abf217b89f3d6)
 * Add the `userUpdate` event. (282c39796bc9a4b09e95ed60d9585120ff5e2205)
 * Include documentation in the npm package. (f072d88216d882f49447d36d7edc2401ce35c62b)

Bugfixes:

 * Fix a few cases where miniplug could return a native Promise instead of a Bluebird one. (95e50487d466a21ae2a3d489341d7e120d8cba71)

Internal:

 * Remove or inline some dependencies. (0e350d51a7153f4d9a0323a1c3fd37921b0037eb, 3bb43d4b6dfb651fa9e5e7c8203b1c763a2af3a7, b00b5e4ce8d66152e951a217977bb518b770ca02)

Also:

 * There's now a basic test setup using Tape and Nock, so future versions of miniplug may actually be tested!
 * Thanks to @cosmetify for spotting and fixing a mistake in the connection example in the readme!

## 1.5.1 / 09 Mar 2017

Bugfixes:

 * Fix subsequent HTTP/chat requests after one fails (195583af5a2520c8ed5dc784d3e329183501b0a7)

## 1.5.0 / 04 Mar 2017

Features:

 * Add friendRequest/friendAccept events. (f9ed4de8bafa849f886c6786dca7aafc145d6d78, 8bcd47a093dd34ade8aae76fc06277979963ade3)
 * Add `User#hasPermission` and `User#hasGlobalPermission` functions. (6c6c73c6d3cf059d39b98dc915da7b81951e6b29)
 * Add `Room#getHost`. (98b32cf198c0dac018a10d86751ae6464355f285)

Docs:

 * Suggest async-to-gen for lightweight async functions compilation. (2e37de481451e674c8146d3d847fdf82dc4adbb9)

Internal:

 * Replace lodash with smaller specialised modules. (259ae143c60bd549cfb3980c3066fbfa7f31ad26)

## 1.4.0 / 12 Feb 2017

Features:

 * Add `mp.getRoomHistory`, `mp.getUserHistory`, and `user.getHistory` methods.

## 1.3.3 / 24 Jan 2017

Bugfixes:

 * Return User objects for ghost users in `waitlist()`. (#24 by @Burkes)

## 1.3.2 / 23 Jan 2017

Bugfixes:

 * Fix Media prop in history entries. (d9549a5a002c25e054e1b4bd1a377ff444fcb403)

## 1.3.1 / 21 Jan 2017

Bugfixes:

 * Fix error in initialising vote plugin. (cbef52612e7d802dfa48d701c501e2c1511ec37e)

## 1.3.0 / 21 Jan 2017

Features:

 * Implement methods for profile Notifications. (https://github.com/goto-bus-stop/miniplug/commit/d651c0e691608ff6ab1c31a2690bcce2e2411652)
 * Implement Waitlist methods and state. (961bab7406d571dd31dadf8b912e7dc7540047c9)
 * Implement booth voting. (7a34a6197f57d7d1b075c58e0cf3865bf2f73a0b)
 * Add History methods. (3c28c71aaa2777abf14e69cf1a31cef5c070f444)
 * Process room property update events. (f176c6b6622ce0c08306a10afbeb0d8ddef74662)
 * Set "score" as a plain property on HistoryEntry objects. (e0c5192b45b741488af2ad4a9c1782094084e2cf)

Bugfixes:

 * Fix rooms object. (7d36ec59bc1a6c80f1169c61620fd2f2dfd64fd5)
 * Prevent room `favorite` method being overridden by boolean property from plug.dj. (15f10ce1b4573001efccfc5ec71af8099999d5df)
 * Don't decrement guest count below zero. (b4670c434a23a6ab86cf391aed8ae49650cd4203)

## 1.2.0 / 01 Jan 2017

Features:

 * Added `validateRoomName` and `validateUsername` methods.
 * Add `.mention()` method to User objects, returning a string that can be used to mention the user in chat.

## 1.1.0 / 03 Dec 2016

Features:

 * Added Store and Inventory routes. (9827e47d2932250666d78491ae4ca697677fa671)
 * Methods on miniplug objects (users, rooms, etc) are no longer own properties but now exist on the prototype. (ab69ef962c2bd89e9a04c9cdeca4735adb571386)

## 1.0.2 / 02 Dec 2016

Internal:

 * Upgrade [plug-socket](https://github.com/goto-bus-stop/plug-socket) dependency.

## 1.0.1 / 01 Dec 2016

Bugfixes:

 * Fix error when dealing with guest users. (c62242d5e9a8c3216d106d6a68af5f96e2909c06)

## 1.0.0 / 01 Dec 2016

Initial release.
