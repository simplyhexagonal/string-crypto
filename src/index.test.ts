import assert from 'assert';
import StringCrypto from '.';

const testPassword = 'test';
const testMessage = 'Hello World';

let sc = new StringCrypto();

const derivedKey = sc.deriveKey(testPassword, StringCrypto.defaultDeriveKeyOpts).toString();

assert(derivedKey !== testPassword);
assert(derivedKey.length === 30);

const messageEncWDefaults = sc.encryptString(testMessage, testPassword);

assert(messageEncWDefaults !== testMessage);
assert(messageEncWDefaults.length > testMessage.length);
assert(sc.decryptString(messageEncWDefaults, testPassword) === testMessage);

sc = new StringCrypto({
  salt: 's41t',
  iterations: 10,
  digest: 'md5',
});

const messageEncWCustomOpts = sc.encryptString(testMessage, testPassword);

assert(messageEncWCustomOpts !== messageEncWDefaults);
assert(messageEncWCustomOpts.length === messageEncWDefaults.length);
assert(messageEncWCustomOpts !== testMessage);
assert(messageEncWCustomOpts.length > testMessage.length);
assert(sc.decryptString(messageEncWCustomOpts, testPassword) === testMessage);

[
  'blake2b512',
  'blake2s256',
  'md4',
  'md5',
  'md5-sha1',
  'mdc2',
  'ripemd160',
  'sha1',
  'sha224',
  'sha256',
  'sha3-224',
  'sha3-256',
  'sha3-384',
  'sha3-512',
  'sha384',
  'sha512',
  'sha512-224',
  'sha512-256',
  'sm3',
  'whirlpool'
].forEach((digest: Digest) => {
  sc = new StringCrypto({ digest });
  const messageEncWCustomDigest = sc.encryptString(testMessage, testPassword);

  assert(messageEncWCustomDigest !== testMessage);
  assert(messageEncWCustomDigest.length > testMessage.length);
  assert(sc.decryptString(messageEncWCustomDigest, testPassword) === testMessage);
});
