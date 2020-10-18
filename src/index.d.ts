declare type StringLike = string | Buffer | Uint8Array | Int8Array | Uint8ClampedArray | Int16Array | Uint16Array | Int32Array | Uint32Array | Float32Array | Float64Array | DataView;
declare type Digest = 'md5' | 'sha1' | 'sha224' | 'sha256' | 'sha384' | 'sha512' | 'rmd160' | 'ripemd160';
interface DeriveKeyOpts {
    salt?: StringLike;
    iterations?: number;
    keylen?: number;
    digest?: Digest;
}
declare class StringCrypto {
    private _deriveKeyOptions;
    constructor(options?: DeriveKeyOpts);
    encryptString: (str: StringLike, password: StringLike) => string;
    decryptString: (encryptedStr: StringLike, password: StringLike) => string;
}
