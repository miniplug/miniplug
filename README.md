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
# or `yarn add miniplug` with Yarn.
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

Full API documentation is available in [docs/API.md][].

## Contributing

Issues/PRs are appreciated!

To build the library, run:

```bash
npm run build
# or `yarn build` with Yarn.
```

The built version will be placed in `index.js`.

To run tests, do:

```bash
npm test
# or `yarn test` with Yarn.
```

There's not many tests just yet, but it's good to check anyway! This command
will also check your code style using [Standard][].

## License

[MIT](./LICENSE)

[plug.dj]: https://plug.dj
[docs/API.md]: ./docs/API.md
[Standard]: https://standardjs.com/
