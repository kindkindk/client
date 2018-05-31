// Copyright 2017-2018 Jaco Greeff
// This software may be modified and distributed under the terms
// of the ISC license. See the LICENSE file for details.
// @flow

import type { Storage$Section } from '@polkadot/storage/types';
import type { BaseDb, WrapDb } from '../types';
import type { StateDb } from './types';

const storage = require('@polkadot/storage');

const createAcc = require('../db/account');
const createArrAcc = require('../db/arrayAccount');
const createArrU8a = require('../db/arrayU8a');
const createBn = require('../db/bn');
const createU8a = require('../db/u8a');
const createDb = require('../db');

const BALANCE_SIZE = 128;
const BLOCKNUM_SIZE = 64;

const consensus = (db: WrapDb, { public: { authorityAt, authorityCount, code } }: Storage$Section) => ({
  authorityAt: createAcc(db, authorityAt),
  authorityCount: createBn(db, authorityCount, 32),
  code: createU8a(db, code)
});

const council = (db: WrapDb, { public: { activeCouncil, candidacyBond, carryCount, desiredSeats, inactiveGracePeriod, presentationDuration, presentSlashPerVoter, termDuration, votingBond, votingPeriod } }: Storage$Section) => ({
  activeCouncil: createArrU8a(db, activeCouncil),
  candidacyBond: createBn(db, candidacyBond, BALANCE_SIZE),
  carryCount: createBn(db, carryCount, 32),
  desiredSeats: createBn(db, desiredSeats, 32),
  inactiveGracePeriod: createBn(db, inactiveGracePeriod, 32),
  presentationDuration: createBn(db, presentationDuration, BLOCKNUM_SIZE),
  presentSlashPerVoter: createBn(db, presentSlashPerVoter, BALANCE_SIZE),
  termDuration: createBn(db, termDuration, BLOCKNUM_SIZE),
  votingBond: createBn(db, votingBond, BALANCE_SIZE),
  votingPeriod: createBn(db, votingPeriod, BLOCKNUM_SIZE)
});

const councilVoting = (db: WrapDb, { public: { cooloffPeriod, votingPeriod } }: Storage$Section) => ({
  cooloffPeriod: createBn(db, cooloffPeriod, BLOCKNUM_SIZE),
  votingPeriod: createBn(db, votingPeriod, BLOCKNUM_SIZE)
});

const democracy = (db: WrapDb, { public: { launchPeriod, minimumDeposit, votingPeriod } }: Storage$Section) => ({
  launchPeriod: createBn(db, launchPeriod, BLOCKNUM_SIZE),
  minimumDeposit: createBn(db, minimumDeposit, BALANCE_SIZE),
  votingPeriod: createBn(db, votingPeriod, BLOCKNUM_SIZE)
});

const governance = (db: WrapDb, { public: { approvalsRatio } }: Storage$Section) => ({
  approvalsRatio: createBn(db, approvalsRatio, BLOCKNUM_SIZE)
});

const session = (db: WrapDb, { public: { length, validators } }: Storage$Section) => ({
  length: createBn(db, length, BLOCKNUM_SIZE),
  validators: createArrAcc(db, validators)
});

const staking = (db: WrapDb, { public: { bondingDuration, currentEra, freeBalanceOf, intentions, sessionsPerEra, transactionFee, validatorCount } }: Storage$Section) => ({
  bondingDuration: createBn(db, bondingDuration, BLOCKNUM_SIZE),
  currentEra: createBn(db, currentEra, BLOCKNUM_SIZE),
  freeBalanceOf: createBn(db, freeBalanceOf, BALANCE_SIZE),
  intentions: createArrAcc(db, intentions),
  sessionsPerEra: createBn(db, sessionsPerEra, BLOCKNUM_SIZE),
  transactionFee: createBn(db, transactionFee, BALANCE_SIZE),
  validatorCount: createBn(db, validatorCount, 32)
});

const system = (db: WrapDb, { public: { accountIndexOf, blockHashAt } }: Storage$Section) => ({
  accountIndexOf: createBn(db, accountIndexOf, 32),
  blockHashAt: createU8a(db, blockHashAt)
});

const timestamp = (db: WrapDb, x: Storage$Section) => ({});

module.exports = function createState (baseDb: BaseDb): StateDb {
  const db = createDb(baseDb);

  return {
    db,
    consensus: consensus(db, storage.consensus),
    council: council(db, storage.council),
    councilVoting: councilVoting(db, storage.councilVoting),
    democracy: democracy(db, storage.democracy),
    governance: governance(db, storage.governance),
    session: session(db, storage.session),
    staking: staking(db, storage.staking),
    system: system(db, storage.system),
    timestamp: timestamp(db, storage.timestamp)
  };
};