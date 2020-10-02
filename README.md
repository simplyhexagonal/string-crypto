# String Crypto

Small and and simple (yet secure) library to encrypt and decrypt strings using PBKDF2 for key derivation and AES (defaulted to 256-bit / SHA512).

## Like this module? :heart:

Please consider:

- [Buying me a coffee](https://www.buymeacoffee.com/jeanlescure) :coffee:
- Supporting me on [Patreon](https://www.patreon.com/jeanlescure) :trophy:
- Starring this repo on [Github](https://github.com/jeanlescure/string-crypto) :star2:

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

let encryptedString = encryptString(topSecret, password);

console.log('Encrypted String:', encryptedString);

console.log('Decrypted String:', decryptString(encryptedString, password));
```

## Options

```ts
const options = {
  salt: '2f0ijf2039j23r09j2fg45o9ng98um4o',
  iterations: 10,
  keylen: 256 / 8, // must be equivalent to 16, 24 or 32 bytes
  digest: 'sha512' as const, // one of: 'md5' | 'sha1' | 'sha224' | 'sha256' | 'sha384' | 'sha512' | 'rmd160' | 'ripemd160'
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
