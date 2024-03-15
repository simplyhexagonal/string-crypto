const StringCrypto = require('string-crypto');

const topSecret = 'What is the largest (rational) number n such that there are positive integers p, q, r such that 1 - 1/p - 1/q - 1/r = 1/n?';

const password = 'Oh-no,not-again';

// Instantiate StringCrypto with default settings.
const scDefault = new StringCrypto();

let encryptedString = scDefault.encryptString(topSecret, password);

console.log('Encrypted String:', encryptedString);

console.log('Decrypted String:', scDefault.decryptString(encryptedString, password));

// Instantiate StringCrypto with custom settings for increased security.
const scCustom = new StringCrypto({
  salt: '2f0ijf2039j23r09j2fg45o9ng98um4o',
  iterations: 10000, // Increased iterations for better security
  keySize: 256 / 32, // Specifying keySize for clarity, though it's the default value
});

encryptedString = scCustom.encryptString(topSecret, password);

console.log('Safer Encrypted String:', encryptedString);

console.log('Safer Decrypted String:', scCustom.decryptString(encryptedString, password));
