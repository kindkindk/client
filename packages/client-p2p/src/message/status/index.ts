// Copyright 2017-2018 @polkadot/client-p2p authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import { MessageInterface } from '../../types';
import { StatusMessage, MessageFactory } from '../types';
import { StatusEncoded } from './types';

import BN from 'bn.js';

import defaults from '../../defaults';
import base from '../base';
import rawDecode from './rawDecode';
import rawEncode from './rawEncode';

const TYPE: number = 0;

function status ({ bestHash = new Uint8Array(32), bestNumber = new BN(0), genesisHash = new Uint8Array(32), parachainId = new BN(0), roles = ['none'], validatorId = new Uint8Array(32), validatorSignature = new Uint8Array(64), version = defaults.PROTOCOL_VERSION }: StatusMessage): MessageInterface {
  const raw: StatusMessage = {
    bestHash,
    bestNumber,
    genesisHash,
    parachainId,
    roles,
    validatorId,
    validatorSignature,
    version
  };

  return base(TYPE, {
    raw,
    rawDecode: (data: StatusEncoded): StatusMessage =>
      rawDecode(raw, data),
    rawEncode: (): StatusEncoded =>
      rawEncode(raw)
  });
}

(status as MessageFactory<any>).TYPE = TYPE;

export default (status as MessageFactory<StatusMessage>);
