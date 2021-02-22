var StringCrypto = require('string-crypto');

const topSecret = 'What is the largest (rational) number n such that there are positive integers p, q, r such that 1 - 1/p - 1/q - 1/r = 1/n?';

const password = 'Oh-no,not-again';

const {
  encryptString,
  decryptString,
} = new StringCrypto();

let encryptedString = encryptString(topSecret, password);

console.log('Encrypted String:', encryptedString);

console.log('Decrypted String:', decryptString(encryptedString, password));

const {
  encryptString: saferEncrypt,
  decryptString: saferDecrypt,
} = new StringCrypto({
  salt: '2f0ijf2039j23r09j2fg45o9ng98um4o',
  iterations: 10,
  digest: 'sha3-512',
});

encryptedString = saferEncrypt(topSecret, password);

console.log('Safer Encrypted String:', encryptedString);

console.log('Safer Decrypted String:', saferDecrypt(encryptedString, password));
