declare type StringLike = string | Buffer | Uint8Array | Int8Array | Uint8ClampedArray | Int16Array | Uint16Array | Int32Array | Uint32Array | Float32Array | Float64Array | DataView;

interface DeriveKeyOpts {
    salt?: StringLike;
    iterations?: number;
    keySize?: number; // Added keySize option to specify the key size in bits
}

declare class StringCrypto {
    private _deriveKeyOptions;
    constructor(options?: DeriveKeyOpts);
    encryptString: (str: StringLike, password: StringLike) => string;
    decryptString: (encryptedStr: StringLike, password: StringLike) => string;
}
