import {encodeCbor, decodeCbor} from './cbor';
import {jwkToCose, createAndSignCose, verifyCose} from './cose';

const scenarios = {
  encodeCbor,
  decodeCbor,
  jwkToCose,
  createAndSignCose,
  verifyCose,
};

export default scenarios;
export type {ScenarioRunner} from './types';
