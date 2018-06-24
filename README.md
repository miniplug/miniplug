# miniplug

Small [plug.dj][] client for building bots and applications in Node.js, with a Promise-based API.

[Installation](#installation) -
[Usage](#usage) -
[API][docs/API.md] -
[Status](#status) -
[Contributing](#contributing) -
[License: MIT](#license)

## Installation [![(install size)](https://packagephobia.now.sh/badge?p=miniplug)](https://packagephobia.now.sh/result?p=miniplug)

> Note: Node v6 or higher is required.
> Run `node -v` in your console to check that your Node.js version is up-to-date.

```sh
npm install --save miniplug
```

## Usage

```js
const miniplug = require('miniplug')

const mp = miniplug({
  email: 'admin@plug.dj',
  password: 'hunter2'
})

// Join a room
mp.join('tastycat').then((room) => {
  mp.chat(`Hello ${room.name}! :wave:`)
})

// Add an example chat command "!id"
mp.on('chat', (message) => {
  if (/^!id/.test(message.message)) {
    message.reply(`Your user ID is ${message.uid}.`)
  }
})
```

## API

Full API documentation is available in [docs/API.md][].

For questions, visit the #coding channel in the plug.dj discord!

[![join the plug.dj discord](https://img.shields.io/badge/plug.dj-%23coding-7289DA.svg)](https://discord.gg/plugdj)

## Status

<!-- npm search uses badge count as a search metric for some godforsaken reason -->
[![Travis](https://img.shields.io/travis/miniplug/miniplug.svg)](https://travis-ci.org/miniplug/miniplug)
[![npm version](https://img.shields.io/npm/v/miniplug/next.svg)](https://npmjs.com/package/miniplug)
[![David](https://img.shields.io/david/miniplug/miniplug.svg)](https://david-dm.org/miniplug/miniplug)
![npm downloads](https://img.shields.io/npm/dt/miniplug.svg)

## Contributing

Issues/PRs are appreciated!

To build the library, run:

```bash
npm run build
```

The built version will be placed in `index.js`.

To run tests, do:

```bash
npm test
```

There's not many tests just yet, but it's good to check anyway!
This command will also check your code style using [Standard][].

Changed files will also be tested and linted automatically when you `git commit`.

## License

[![MIT](https://img.shields.io/npm/l/miniplug.svg)](./LICENSE)

[plug.dj]: https://plug.dj
[docs/API.md]: ./docs/API.md
[Standard]: https://standardjs.com/
