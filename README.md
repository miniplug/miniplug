# miniplug

Small but complete Promise-based [plug.dj][] API client for Node.js.

[Installation](#installation) -
[Usage](#usage) -
[Contributing](#contributing) -
[License: MIT](#license)

## Installation

> Note: Node v4 or higher is required. Run `node -v` in your console to check
> that your Node.js version is up-to-date.

```sh
npm install --save miniplug
```

## Usage

```js
const miniplug = require('miniplug')

const mp = miniplug({ user: 'admin@plug.dj', password: 'hunter2' })
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

Full API documentation is available in [docs/API.md][].

## Contributing

Issues/PRs are appreciated!

To build the library, run:

```
npm run build
```

The built version will be placed in `index.js`.

There's not much in the way of tests yet, sorry! Should be coming soon.

## License

[MIT](./LICENSE)

[plug.dj]: https://plug.dj
[docs/API.md]: ./docs/API.md
