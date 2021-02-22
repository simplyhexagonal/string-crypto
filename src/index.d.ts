declare type StringLike = string | Buffer | Uint8Array | Int8Array | Uint8ClampedArray | Int16Array | Uint16Array | Int32Array | Uint32Array | Float32Array | Float64Array | DataView;
declare type Digest = 'blake2b512' | 'blake2s256' | 'md4' | 'md5' | 'md5-sha1' | 'mdc2' | 'ripemd160' | 'sha1' | 'sha224' | 'sha256' | 'sha3-224' | 'sha3-256' | 'sha3-384' | 'sha3-512' | 'sha384' | 'sha512' | 'sha512-224' | 'sha512-256' | 'sm3' | 'whirlpool';
interface DeriveKeyOpts {
    salt?: StringLike;
    iterations?: number;
    digest?: Digest;
}
declare class StringCrypto {
    private _deriveKeyOptions;
    constructor(options?: DeriveKeyOpts);
    encryptString: (str: StringLike, password: StringLike) => string;
    decryptString: (encryptedStr: StringLike, password: StringLike) => string;
}
