// Copyright 2017-2018 @polkadot/client-p2p authors & contributors
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

import LibP2P from 'libp2p';
import PeerInfo from 'peer-info';
import { PeersState } from './types';

import get from './get';
import logPeer from './logPeer';

export default function onConnect (self: PeersState, node: LibP2P): void {
  node.on('peer:connect', (peerInfo: PeerInfo): boolean => {
    if (!peerInfo) {
      return false;
    }

    const peer = get(self, peerInfo);

    if (!peer) {
      return false;
    }

    logPeer(self, 'connected', peer);

    return true;
  });
}