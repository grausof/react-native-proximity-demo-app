import {encoder} from './cbor';
import {error, result} from './types';

const cose = require('cose-js');

type JWK = {
  kty: string;
  crv: string;
  x: Buffer;
  y: Buffer;
  d: Buffer;
};

const staticKey: JWK = {
  kty: 'EC',
  crv: 'P-256',
  x: Buffer.from('MKBCTNIcKUSDii11ySs3526iDZ8AiTo7Tu6KPAqv7D4', 'base64'),
  y: Buffer.from('4Etl6SRW2YiLUrN5vfvVHuhp7x8PxltmWWlbbM4IFyM', 'base64'),
  d: Buffer.from('870MB6gfuTJ4HtUnUvYMyJpr5eUZNP4Bk43bVdj3eAE', 'base64'),
};

export const fromJwkToCoseHex = (jwk: JWK) => {
  const key = new Map();
  key.set(1, 2); //KID
  key.set(-1, 1); //Type (1 = EC P-256 / secp256r1)
  key.set(-2, jwk.x); // X
  key.set(-3, jwk.y); // y
  var data = encoder.encode(key);
  return Buffer.from(data).toString('hex');
};

export const createAndSignCose = async () => {
  try {
    const plaintext = 'This is a message to sign!';
    const headers = {
      p: {alg: 'ES256'},
      u: {kid: '11'},
    };
    const signer = {
      key: staticKey,
    };
    const buf2 = await cose.sign.create(headers, plaintext, signer);
    const signed = buf2.toString('hex');
    console.log('Signed message: ' + signed);
    return Promise.resolve(result(signed));
  } catch (e) {
    return Promise.reject(error(e));
  }
};

export const verifyCose = async () => {
  try {
    const [_, hex] = await createAndSignCose();
    const verifier = {
      key: staticKey,
    };
    const COSEMessage = Buffer.from(hex, 'hex');
    const buf = await cose.sign.verify(COSEMessage, verifier);
    console.log('Verified message: ' + buf);
    return Promise.resolve(result(JSON.stringify(buf)));
  } catch (e) {
    return Promise.reject(error(e));
  }
};

export const jwkToCose = async () => {
  try {
    const res = fromJwkToCoseHex(staticKey);
    return Promise.resolve(result(res));
  } catch (e) {
    return Promise.reject(error(e));
  }
};
