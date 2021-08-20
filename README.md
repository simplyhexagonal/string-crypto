![String Crypto logo depicting a ball of yarn being weaved by a vintage looking key](https://assets.jeanlescure.io/string-crypto-logo.svg)

# String Crypto

![Tests](https://github.com/jeanlescure/string-crypto/workflows/tests/badge.svg)
[![Try string-crypto on RunKit](https://badge.runkitcdn.com/string-crypto.svg)](https://npm.runkit.com/string-crypto)
[![NPM Downloads](https://img.shields.io/npm/dt/string-crypto.svg?maxAge=2592000)](https://npmjs.com/package/string-crypto)
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-2-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

Small and and simple (yet secure) library to encrypt and decrypt strings using PBKDF2 for key derivation and AES (defaulted to 256-bit / SHA512).

This project is open to updates by its users, I ensure that PRs are relevant to the community.
In other words, if you find a bug or want a new feature, please help us by becoming one of the
[contributors](#contributors-) ✌️ ! See the [contributing section](#contributing).

## v2 Breaking Changes

- 🚨 This new version is unable to decrypt strings encrypted by v1!

I've refactored out the usage of external libraries. These libraries used extra steps that only added
unnecessary computational overhead with no cryptographic advantages.

These extra steps did cause enough byte differences as to make strings encrypted with v1 unable to be
decrypted by v2.

- The `keylen` option has been removed and is now managed automagically by Node's `crypto` native
module, depending on the chosen key digest.

## v2 New Features

String Crypto v2 allows for 12 more key digests, for a total of 20:

- blake2b512
- blake2s256
- md4
- md5
- md5-sha1
- mdc2
- ripemd160
- sha1
- sha224
- sha256
- sha3-224
- sha3-256
- sha3-384
- sha3-512
- sha384
- sha512
- sha512-224
- sha512-256
- sm3
- whirlpool

## Like this module? ❤

Please consider:

- [Buying me a coffee](https://www.buymeacoffee.com/jeanlescure) ☕
- Supporting me on [Patreon](https://www.patreon.com/jeanlescure) 🏆
- Starring this repo on [Github](https://github.com/jeanlescure/string-crypto) 🌟

## Usage

```
yarn add string-crypto
```

```ts
import StringCrypto from 'string-crypto';

const stringToProtect = 'What is the largest (rational) number n such that there are positive integers p, q, r such that 1 - 1/p - 1/q - 1/r = 1/n?';

const password = 'Oh-no,not-again';

const {
  encryptString,
  decryptString,
} = new StringCrypto();

let encryptedString = encryptString(stringToProtect, password);

console.log('Encrypted String:', encryptedString);

console.log('Decrypted String:', decryptString(encryptedString, password));
```

## Options

```ts
const options = {
  salt: '2f0ijf2039j23r09j2fg45o9ng98um4o',
  iterations: 10,
  digest: 'sha512' as const, // one of: 'blake2b512' | 'blake2s256' | 'md4' | 'md5' | 'md5-sha1' | 'mdc2' | 'ripemd160' | 'sha1' | 'sha224' | 'sha256' | 'sha3-224' | 'sha3-256' | 'sha3-384' | 'sha3-512' | 'sha384' | 'sha512' | 'sha512-224' | 'sha512-256' | 'sm3' | 'whirlpool';
};

const {
  encryptString: saferEncrypt,
  decryptString: saferDecrypt,
} = new StringCrypto(options);
```

## Development and build scripts

I chose Rollup to handle the transpiling, compression, and any other transformations needed to get
your Typescript code running as quickly and performant as possible.

This repo uses `runkit.js` to validate code sanity. Why? Because [www.npmjs.com](https://www.npmjs.com/)
uses [Runkit](https://runkit.com/home) to allow potential users to play with your module, live on
their browser, which is one of the best ways to convince someone to use your modules in their code.
Runkit will look for the `runkit.js` by default and display that as the initial playground for the
user, so by making it the default validation method during development, this encourages proper
communication with the users of your code.

**Development**

```
yarn dev
```

Uses [concurrently]() to run Rollup in watch mode (which means it will transpile to `dist` when you
save changes to your code), as well as Nodemon to listen for changes in the `dist` directory and
re-run the `runkit.js` as you modify your source! This includes running node with the `--inspect`
flag so you can inspect your code using [Google Chrome Dev Tools](https://nodejs.org/en/docs/guides/debugging-getting-started/)
(by opening `chrome://inspect` in your browser), you're welcome ;)

**Build**

```
yarn build
```

This command will build the `dist/index.js`, uglified and tree-shaken so it loads/runs faster.

It also generates a source map and a `dist/index.d.ts` type file for Typescript importing convenience.

## Contributing

Yes, thank you! This plugin is community-driven, most of its features are from different authors.
Please update the docs and tests and add your name to the `package.json` file.

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):
<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://jeanlescure.cr"><img src="https://avatars2.githubusercontent.com/u/3330339?v=4" width="100px;" alt=""/><br /><sub><b>Jean Lescure</b></sub></a><br /><a href="#maintenance-jeanlescure" title="Maintenance">🚧</a> <a href="https://github.com/jeanlescure/string-crypto/commits?author=jeanlescure" title="Code">💻</a> <a href="#userTesting-jeanlescure" title="User Testing">📓</a> <a href="https://github.com/jeanlescure/string-crypto/commits?author=jeanlescure" title="Tests">⚠️</a> <a href="#example-jeanlescure" title="Examples">💡</a> <a href="https://github.com/jeanlescure/string-crypto/commits?author=jeanlescure" title="Documentation">📖</a></td>
    <td align="center"><a href="https://dianalu.design"><img src="https://avatars2.githubusercontent.com/u/1036995?v=4" width="100px;" alt=""/><br /><sub><b>Diana Lescure</b></sub></a><br /><a href="https://github.com/jeanlescure/string-crypto/commits?author=DiLescure" title="Documentation">📖</a> <a href="https://github.com/jeanlescure/string-crypto/pulls?q=is%3Apr+reviewed-by%3ADiLescure" title="Reviewed Pull Requests">👀</a> <a href="#design-DiLescure" title="Design">🎨</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->
