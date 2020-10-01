import { randomBytes } from 'crypto';

import { pbkdf2Sync } from 'pbkdf2';
import {
  utils,
  ModeOfOperation,
} from 'aes-js';

const {
  hex,
  utf8,
} = utils;

const {
  cbc,
} = ModeOfOperation;

const atob = (str: string): string => {
  return Buffer.from(str, 'base64').toString('binary');
};

const btoa = (str: string): string => {
  return Buffer.from(str, 'binary').toString('base64');
};

type StringLike = string | Buffer | Uint8Array | Int8Array | Uint8ClampedArray | Int16Array | Uint16Array | Int32Array | Uint32Array | Float32Array | Float64Array | DataView;

interface DeriveKeyOpts {
  salt?: StringLike;
  iterations?: number;
  keylen?: number;
  digest?: 'md5' | 'sha1' | 'sha224' | 'sha256' | 'sha384' | 'sha512' | 'rmd160' | 'ripemd160';
}

const defaultDeriveKeyOpts: DeriveKeyOpts = {
  salt: 's41t',
  iterations: 1,
  keylen: 256 / 8,
  digest: 'sha512',
};

const deriveKey = (
  password: StringLike,
  options?: DeriveKeyOpts,
) => {
  const {
    salt,
    iterations,
    keylen,
    digest,
  } = {
    ...defaultDeriveKeyOpts,
    ...options,
  };

  return pbkdf2Sync(password, salt, iterations, keylen, digest);
};

class StringCrypt {
  private _deriveKeyOptions: DeriveKeyOpts;

  constructor(options?: DeriveKeyOpts) {
    if (options) {
      this._deriveKeyOptions = options;
    }
  }

  encryptString = (str: StringLike, password: StringLike): string => {
    let base64String: string = btoa(unescape(encodeURIComponent(str.toString())));
    const mod16Len = base64String.length % 16;

    if (mod16Len !== 0) {
      base64String += '='.repeat(16 - mod16Len);
    }

    const stringBytes = utf8.toBytes(base64String);

    const derivedKey = deriveKey(password, this._deriveKeyOptions);

    const randomInitVector = randomBytes(16);

    const aesCBC = new cbc(derivedKey, randomInitVector);

    const encryptedBytes = aesCBC.encrypt(stringBytes);

    const encryptedHex = hex.fromBytes(encryptedBytes);

    const initVectorHex = hex.fromBytes(randomInitVector);

    return `${initVectorHex}:${encryptedHex}`;
  };

  decryptString = (encryptedStr: StringLike, password: StringLike): string => {
    const derivedKey = deriveKey(password, this._deriveKeyOptions);

    const encryptedParts: string[] = encryptedStr.toString().split(':');

    if (encryptedParts.length !== 2) {
      throw new Error(`Incorrect format for encrypted string: ${encryptedStr}`);
    }

    const [
      initVectorHex,
      encryptedHex,
    ] = encryptedParts;

    const randomInitVector = hex.toBytes(initVectorHex);

    const encryptedBytes = hex.toBytes(encryptedHex);

    const aesCBC = new cbc(derivedKey, randomInitVector);

    const stringBytes = aesCBC.decrypt(encryptedBytes);

    let base64String = utf8.fromBytes(stringBytes);

    return decodeURIComponent(escape(atob(base64String)));
  };
}

export default StringCrypt;
