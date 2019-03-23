// Copyright 2017-2019 @polkadot/client-cli authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { Options } from 'yargs';

import chains from '@polkadot/client-chains/chains';
import { clientId } from '@polkadot/client/clientId';

const allChains = Object.keys(chains).map((chain) => `'${chain}'`);

export default ({
  'chain': {
    description: `Use the chain specified, one of ${allChains.join(', ')} or custom '<chain>.json'`,
    required: true,
    type: 'string'
  },
  'client-id': {
    default: clientId,
    description: 'The client/version identifier for the running node',
    type: 'string'
  },
  'roles': {
    choices: ['full', 'light'],
    default: ['full'],
    description: 'Sets the type of roles the node operates as',
    type: 'array'
  }
} as { [index: string]: Options });