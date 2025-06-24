import { toChecksumAddress, stripHexPrefix } from 'ethereumjs-util';

import { DepositKeyInterface } from '../store/reducers';
import { FORBIDDEN_WITHDRAWAL_ADDRESSES, ETH_WITHDRAWAL_PREFIX } from './envVars';
import { bufferHex } from './SSZ';

// @ts-ignore
const FORBIDDEN_WITHDRAWAL_CREDENTIALS = FORBIDDEN_WITHDRAWAL_ADDRESSES.map(a => Buffer.concat([ETH_WITHDRAWAL_PREFIX, bufferHex(stripHexPrefix(toChecksumAddress(a)))]))

export function verifyWithdrawalCredentials(depositDatum: DepositKeyInterface): boolean {
  const withdrawalCredentialsBuffer = bufferHex(depositDatum.withdrawal_credentials)

  // @ts-ignore
  return FORBIDDEN_WITHDRAWAL_CREDENTIALS.every(fwc => fwc.compare(withdrawalCredentialsBuffer) !== 0)
}