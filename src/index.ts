import {
  randomBytes,
  pbkdf2Sync,
  createCipheriv,
  createDecipheriv,
} from 'crypto';

const KEYLEN = 256 / 8; // Because we use aes-256-gcm

class StringCrypto {
  static defaultDeriveKeyOpts: DeriveKeyOpts = {
    salt: 's41t',
    iterations: 1,
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
      digest,
    } = Object.assign(
      {},
      StringCrypto.defaultDeriveKeyOpts,
      options,
    );

    return pbkdf2Sync(password, salt, iterations, KEYLEN, digest);
  };

  encryptString = (
    str: StringLike,
    password: StringLike,
  ): string => {
    const derivedKey = this.deriveKey(password, this._deriveKeyOptions);

    const randomInitVector = randomBytes(16);

    const aesCBC = createCipheriv('aes-256-gcm', derivedKey, randomInitVector);

    let encryptedBase64 = aesCBC.update(str.toString(), 'utf8', 'base64');
    encryptedBase64 += aesCBC.final('base64');

    const encryptedHex = Buffer.from(encryptedBase64).toString('hex');

    const initVectorHex = randomInitVector.toString('hex');

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

    const randomInitVector = Buffer.from(initVectorHex, 'hex');

    const encryptedBase64 = Buffer.from(encryptedHex, 'hex').toString();

    const aesCBC = createDecipheriv('aes-256-gcm', derivedKey, randomInitVector);

    let decrypted = aesCBC.update(encryptedBase64, 'base64');

    return decrypted.toString();
  };
}

export default StringCrypto;
