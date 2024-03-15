import assert from 'assert';
import StringCrypto from '.'; // Ensure this path matches the actual file location

const testPassword = 'test';
const testMessage = 'Hello World';

let sc = new StringCrypto();

// Testing with default options
const messageEncWDefaults = sc.encryptString(testMessage, testPassword);
assert(messageEncWDefaults !== testMessage, 'Encrypted message should not match the original message');
assert(messageEncWDefaults.includes(':'), 'Encrypted message should include a separator for IV');
assert(sc.decryptString(messageEncWDefaults, testPassword) === testMessage, 'Decrypted message should match the original message');

// Testing with custom options
const customOptions = {
  salt: 's41t',
  iterations: 10,
  keySize: 256 / 32, // Explicitly specifying keySize for clarity, though it's the same as the default
};
sc = new StringCrypto(customOptions);

const messageEncWCustomOpts = sc.encryptString(testMessage, testPassword);
assert(messageEncWCustomOpts !== messageEncWDefaults, 'Encrypted message with custom options should differ from the default');
assert(messageEncWCustomOpts !== testMessage, 'Encrypted message should not match the original message');
assert(sc.decryptString(messageEncWCustomOpts, testPassword) === testMessage, 'Decrypted message should match the original message');

console.log('All tests passed.');
