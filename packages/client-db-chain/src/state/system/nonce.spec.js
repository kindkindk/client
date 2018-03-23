// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.

const hexToU8a = require('@polkadot/util/hex/toU8a');
const u8aToHex = require('@polkadot/util/u8a/toHex');
const keyring = require('@polkadot/util-keyring/testing')();

const index = require('../index');

describe('nonce', () => {
  let system;

  beforeEach(() => {
    const store = {
      '0xc7f790aa4fc95a8813b0d5734a8c195b': hexToU8a('0x0100000000000000')
    };

    system = index({
      get: (key) => store[u8aToHex(key)] || new Uint8Array([]),
      set: (key, value) => {
        store[u8aToHex(key)] = value;
      }
    }).system;
  });

  describe('get', () => {
    it('returns nonce', () => {
      expect(
        system.nonce.get(keyring.one.publicKey()).toNumber()
      ).toEqual(1);
    });

    it('returns zero nonces', () => {
      expect(
        system.nonce.get(keyring.alice.publicKey()).toNumber()
      ).toEqual(0);
    });
  });

  describe('set', () => {
    it('sets a nonce', () => {
      system.nonce.set(keyring.alice.publicKey(), 666);

      expect(
        system.nonce.get(keyring.alice.publicKey()).toNumber()
      ).toEqual(666);
    });
  });
});