#!/usr/bin/env node

const { Command } = require('./commander.js');
const StringCrypto = require('../dist/index.js'); // Adjust the path as necessary

const { version } = require('../package.json');

const program = new Command();

program
  .name('string-crypto')
  .description('CLI tool for encrypting and decrypting strings using string-crypto library')
  .version(version);

program
  .command('encrypt')
  .description('Encrypt a string')
  .option('-s, --string <string>', 'String to encrypt')
  .option('-p, --password <password>', 'Password for encryption')
  .option('--salt <salt>', 'Salt for the encryption', '')
  .option('--iterations <iterations>', 'Number of iterations', StringCrypto.defaultDeriveKeyOpts.iterations.toString())
  .option('--keySize <keySize>', 'Key size in bits', (256 / 32).toString()) // Defaulting to 256 bits
  .action((options) => {
    const scOptions = {
      iterations: parseInt(options.iterations, 10),
      keySize: parseInt(options.keySize, 10) * 32, // Converting words to bits for user input
    };
    if (options.salt) {
      scOptions.salt = options.salt;
    }
    const sc = new StringCrypto(scOptions);
    const encryptedString = sc.encryptString(options.string, options.password);
    console.log(encryptedString);
    if (!options.salt) {
      console.log('WARNING: No salt was provided. The following random salt was used for encryption:');
      console.log(StringCrypto.defaultDeriveKeyOpts.salt);
    }
  });

program
  .command('decrypt')
  .description('Decrypt an encrypted string')
  .option('-s, --string <string>', 'String to decrypt')
  .option('-p, --password <password>', 'Password for decryption')
  .option('--salt <salt>', 'Salt for the decryption', '')
  .option('--iterations <iterations>', 'Number of iterations', StringCrypto.defaultDeriveKeyOpts.iterations.toString())
  .option('--keySize <keySize>', 'Key size in bits', (256 / 32).toString()) // Defaulting to 256 bits
  .action((options) => {
    const scOptions = {
      iterations: parseInt(options.iterations, 10),
      keySize: parseInt(options.keySize, 10) * 32, // Converting words to bits for user input
    };
    if (options.salt) {
      scOptions.salt = options.salt;
    }
    const sc = new StringCrypto(scOptions);
    const decryptedString = sc.decryptString(options.string, options.password);
    console.log(decryptedString);
  });

program.parse(process.argv);
