import CryptoJS from 'crypto-js';

interface DeriveKeyOpts {
  salt: string;
  iterations: number;
  keySize?: number; // Key size in words, not bytes
}

class StringCrypto {
  static defaultDeriveKeyOpts: DeriveKeyOpts = {
    salt: CryptoJS.lib.WordArray.random(128 / 8).toString(CryptoJS.enc.Hex),
    iterations: 1000, // It's recommended to use a higher number of iterations for PBKDF2
    keySize: 256 / 32, // CryptoJS uses words (1 word = 32 bits), and AES-256 requires a 256-bit key
  };

  private _deriveKeyOptions: DeriveKeyOpts;

  constructor(options?: DeriveKeyOpts) {
    this._deriveKeyOptions = {
      ...StringCrypto.defaultDeriveKeyOpts,
      ...options,
    };
  }

  deriveKey = (
    password: string,
    options?: DeriveKeyOpts,
  ): CryptoJS.lib.WordArray => {
    const opts = {
      ...this._deriveKeyOptions,
      ...options,
    };
    const key = CryptoJS.PBKDF2(password, CryptoJS.enc.Hex.parse(opts.salt), {
      keySize: opts.keySize,
      iterations: opts.iterations,
    });
    return key;
  };

  encryptString = (
    str: string,
    password: string,
  ): string => {
    const derivedKey = this.deriveKey(password);
    const iv = CryptoJS.lib.WordArray.random(128 / 8);
    const encrypted = CryptoJS.AES.encrypt(str, derivedKey, {
      mode: CryptoJS.mode.CBC,
      iv: iv,
    });

    // Concatenate IV and ciphertext for the complete encrypted string
    const encryptedStr = iv.toString(CryptoJS.enc.Hex) + ':' + encrypted.toString();
    return encryptedStr;
  };

  decryptString = (
    encryptedStr: string,
    password: string,
  ): string => {
    const parts = encryptedStr.split(':');
    const iv = CryptoJS.enc.Hex.parse(parts[0]);
    const ciphertext = parts[1];
    const derivedKey = this.deriveKey(password);

    const decrypted = CryptoJS.AES.decrypt(ciphertext, derivedKey, {
      mode: CryptoJS.mode.CBC,
      iv: iv,
    });

    const decryptedStr = decrypted.toString(CryptoJS.enc.Utf8);
    return decryptedStr;
  };
}

export default StringCrypto;
