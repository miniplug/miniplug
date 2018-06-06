# miniplug contribution guidelines

Issues/PRs are appreciated!

## Reporting a bug

If the bug is a crash, please include a stack trace! Please also include a
small example that shows the bug, if possible.

## Working on documentation

The main documentation for miniplug is in [`docs/API.md`][api]. Ideally each
function should have a brief example demonstrating use in a simple way.

Documentation isn't really rigidly ordered, so just add things in a place where
it seems to make sense, close to similar existing functionality.

## Working on code

To build the library, run:

```bash
npm run build
```

The built version will be placed in `index.js`.

To run tests, do:

```bash
npm test
```

There's not that many tests, but it's good to check anyway!
This command will also check your code style using [Standard][].

Changed files will also be tested and linted automatically when you `git commit`.

## When fixing a bug

Wait for at least one approval review on the PR, then squash+merge it. If the
bug is really bad and the fix is simple you can also just merge it.

## When adding a feature

[Update the docs](#working-on-documentation) too in `docs/API.md`.

Wait for at least one approval review on the PR, then squash+merge it.

## Releases

Small releases are nice, it's ok if a release has just 1 new commit. I do
releases using [`np`](https://github.com/sindresorhus/np).

```bash
npm install --global np
```

Before doing a release, update the CHANGELOG.md file and commit it. List commit
hashes or PR #numbers with each change. Then run `np patch` or `np minor`
depending on the kind of changes, if there's a new feature use `np minor` else
`np patch`. Trying not to do breaking changes if we can help it, so folks don't
have to update their bots to get new features and bugfixes.

```bash
$ vim CHANGELOG.md
# write some new stuff
$ git add CHANGELOG.md
$ git commit -m 'v1.13.0 changelog'
$ np minor
```

Then open up the [Github releases page](https://github.com/miniplug/miniplug/releases)
and copy-paste the most recent CHANGELOG.md entry into it. An easy way to do
that is by copying from the [raw CHANGELOG.md](https://raw.githubusercontent.com/miniplug/miniplug/master/CHANGELOG.md).

[api]: https://github.com/miniplug/miniplug/tree/master/docs/API.md
