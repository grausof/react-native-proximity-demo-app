import {Encoder, addExtension} from 'cbor-x';
import {error, result} from './types';

export const encoder = new Encoder();

class CborDataItem {
  cborDataItem: string;
  constructor(hex: string) {
    this.cborDataItem = hex;
  }
}
//Add support for tag 24 (CBOR data item RFC8949)
addExtension({
  Class: CborDataItem,
  tag: 24,
  encode: (obj, enc) => {
    const buffer = Buffer.from(obj.cborDataItem, 'hex');
    return enc(buffer);
  },
  decode: data => {
    const decoded = encoder.decode(data as Buffer);
    return new CborDataItem(decoded);
  },
});
//This is a CBOR element with tag 24
const cborContent = new CborDataItem('49276D20612043424F52');
const toEncode = {hello: 'world', id: 1, cborTag: cborContent};

export const decodeCbor = async () => {
  try {
    const [_, _result] = await encodeCbor();
    if (_result) {
      const decode = Buffer.from(_result, 'hex');
      let data = encoder.decode(decode);
      console.log('Decoded CBOR', data);
      return Promise.resolve(result(data));
    } else {
      return Promise.reject(error('CBOR not encoded!'));
    }
  } catch (e) {
    return Promise.reject(error(e));
  }
};

export const encodeCbor = async () => {
  try {
    var data = encoder.encode(toEncode);
    const encoded = Buffer.from(data).toString('hex');
    console.log('Encoded CBOR: ' + encoded);
    return Promise.resolve(result(encoded));
  } catch (e) {
    return Promise.reject(error(e));
  }
};
