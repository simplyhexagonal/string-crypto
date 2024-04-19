![String Crypto logo depicting a ball of yarn being weaved by a vintage looking key](https://assets.jeanlescure.io/string-crypto-logo.svg)

# String Crypto

![Tests](https://github.com/simplyhexagonal/string-crypto/workflows/tests/badge.svg)
[![Try string-crypto on RunKit](https://badge.runkitcdn.com/string-crypto.svg)](https://npm.runkit.com/string-crypto)
[![NPM Downloads](https://img.shields.io/npm/dt/string-crypto.svg?maxAge=2592000)](https://npmjs.com/package/string-crypto)
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-2-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

Small, simple, and secure library to encrypt and decrypt strings using PBKDF2 for key derivation and AES (defaulted to 256-bit / SHA512).

This project is open to updates by its users, I ensure that PRs are relevant to the community.
In other words, if you find a bug or want a new feature, please help us by becoming one of the
[contributors](#contributors-) ✌️ ! See the [contributing section](#contributing).

# Breaking Changes in v3

- **Digest Option Removed**: The ability to specify a digest method for key derivation has been removed due to the underlying library (`crypto-js`) not supporting this functionality directly. We switched to using `crypto-js` since Node's `crypto` is [commonly breaking](https://stackoverflow.com/questions/69692842/error-message-error0308010cdigital-envelope-routinesunsupported/73287371) due to a missmatch with openssl versions.
- **Key Size Specification**: Key size can now be specified in bits as an option when encrypting or decrypting, providing users with the flexibility to define the strength of encryption according to their needs.
- **Default Salt Generation**: The default salt is now generated dynamically for each encryption operation if not specified by the user, enhancing security by preventing the use of static salts.

## Features

- Encryption and decryption of strings using PBKDF2 (for key derivation) and AES (Advanced Encryption Standard) in CBC mode.
- Dynamic generation of a secure random salt for each encryption operation when not specified.
- Customizable number of iterations for key derivation, enhancing the security against brute force attacks.
- Key size can be specified in bits, allowing for AES-128, AES-192, and AES-256 encryption strengths.
- Simplified CLI and library interfaces for straightforward usage in encrypting and decrypting strings.
- Secure random initialization vector (IV) generation for each encryption operation, ensuring ciphertext uniqueness.

## Like this module? ❤

Please consider:

- [Buying me a coffee](https://www.buymeacoffee.com/jeanlescure) ☕
- Supporting me on [Patreon](https://www.patreon.com/jeanlescure) 🏆
- Starring this repo on [Github](https://github.com/simplyhexagonal/string-crypto) 🌟

## Usage CLI

### Encrypting a String

To encrypt a string, use the `encrypt` command with the required options:

```bash
npx string-crypto encrypt --string "Your String Here" --password "YourPassword"
```

Optional parameters:

- `--salt`: Custom salt for encryption. If omitted, a random salt will be used.
- `--iterations`: Number of iterations (default is 1000).
- `--keySize`: Key size in bits (default is 256).

### Decrypting a String

To decrypt a string, use the `decrypt` command with the required options:

```bash
npx string-crypto decrypt --string "EncryptedStringHere" --password "YourPassword"
```

Optional parameters are the same as for encryption, except `--digest` is no longer available.

### Help

For more information or to see all available options, you can use the `-h` or `--help` flag:

```bash
npx string-crypto --help
```

## Usage Library

```bash
npm i string-crypto
```

```bash
pnpm i string-crypto
```

```bash
yarn add string-crypto
```

```ts
import StringCrypto from 'string-crypto';

const stringToProtect = 'What is the largest (rational) number n such that there are positive integers p, q, r such that 1 - 1/p - 1/q - 1/r = 1/n?';

const password = 'Oh-no,not-again';

const sc = new StringCrypto();

let encryptedString = sc.encryptString(stringToProtect, password);

console.log('Encrypted String:', encryptedString);

console.log('Decrypted String:', sc.decryptString(encryptedString, password));
```

## Options

```ts
const options = {
  salt: '2f0ijf2039j23r09j2fg45o9ng98um4o',
  iterations: 1000,
  keySize: 256, // Specify key size in bits
};

const sc = new StringCrypto(options);
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
