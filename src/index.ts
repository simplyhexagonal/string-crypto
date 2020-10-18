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

class StringCrypto {
  static defaultDeriveKeyOpts: DeriveKeyOpts = {
    salt: 's41t',
    iterations: 1,
    keylen: 256 / 8,
    digest: 'sha512',
  };

  private _deriveKeyOptions: DeriveKeyOpts;

  constructor(options?: DeriveKeyOpts) {
    if (options) {
      this._deriveKeyOptions = options;
    }
  }

  deriveKey = (
    password: StringLike,
    options?: DeriveKeyOpts,
  ) => {
    const {
      salt,
      iterations,
      keylen,
      digest,
    } = {
      ...StringCrypto.defaultDeriveKeyOpts,
      ...options,
    };
  
    return pbkdf2Sync(password, salt, iterations, keylen, digest);
  };

  encryptString = (
    str: StringLike,
    password: StringLike,
  ): string => {
    let base64String: string = btoa(unescape(encodeURIComponent(str.toString())));
    const mod16Len = base64String.length % 16;

    if (mod16Len !== 0) {
      base64String += '='.repeat(16 - mod16Len);
    }

    const stringBytes = utf8.toBytes(base64String);

    const derivedKey = this.deriveKey(password, this._deriveKeyOptions);

    const randomInitVector = randomBytes(16);

    const aesCBC = new cbc(derivedKey, randomInitVector);

    const encryptedBytes = aesCBC.encrypt(stringBytes);

    const encryptedHex = hex.fromBytes(encryptedBytes);

    const initVectorHex = hex.fromBytes(randomInitVector);

    return `${initVectorHex}:${encryptedHex}`;
  };

  decryptString = (
    encryptedStr: StringLike,
    password: StringLike,
  ): string => {
    const derivedKey = this.deriveKey(password, this._deriveKeyOptions);

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

export default StringCrypto;
