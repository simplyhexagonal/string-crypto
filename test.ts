import assert from 'assert';
import StringCrypto, {
  Digest,
  deriveKey,
  defaultDeriveKeyOpts,
} from './src';

const testPassword = 'test';
const testMessage = 'Hello World';

const derivedKey = deriveKey(testPassword, defaultDeriveKeyOpts).toString();

assert(derivedKey !== testPassword);
assert(derivedKey.length === 30);

let sc = new StringCrypto();

const messageEncWDefaults = sc.encryptString(testMessage, testPassword);

assert(messageEncWDefaults !== testMessage);
assert(messageEncWDefaults.length > testMessage.length);
assert(sc.decryptString(messageEncWDefaults, testPassword) === testMessage);

sc = new StringCrypto({
  salt: 's41t',
  iterations: 10,
  keylen: 128 / 8,
  digest: 'md5',
});

const messageEncWCustomOpts = sc.encryptString(testMessage, testPassword);

assert(messageEncWCustomOpts !== messageEncWDefaults);
assert(messageEncWCustomOpts.length === messageEncWDefaults.length);
assert(messageEncWCustomOpts !== testMessage);
assert(messageEncWCustomOpts.length > testMessage.length);
assert(sc.decryptString(messageEncWCustomOpts, testPassword) === testMessage);

[
  'md5',
  'sha1',
  'sha224',
  'sha256',
  'sha384',
  'sha512',
  'rmd160',
  'ripemd160'
].forEach((digest: Digest) => {
  sc = new StringCrypto({ digest });
  const messageEncWCustomDigest = sc.encryptString(testMessage, testPassword);

  assert(messageEncWCustomDigest !== testMessage);
  assert(messageEncWCustomDigest.length > testMessage.length);
  assert(sc.decryptString(messageEncWCustomDigest, testPassword) === testMessage);
});
