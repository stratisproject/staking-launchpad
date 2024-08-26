import { useEffect, useState } from 'react';
import {
  InjectedConnector,
  InjectedConnector as MetamaskConnector,
} from '@web3-react/injected-connector';
import { useWeb3React } from '@web3-react/core';
import { web3ReactInterface } from './index';
import {
  IS_MAINNET,
  NETWORK_NAME,
  TESTNET_LAUNCHPAD_NAME,
} from '../../utils/envVars';

export enum NetworkChainId {
  'Mainnet' = 1,
  'Ropsten' = 3,
  'Strax' = 105105,
  'Sepolia' = 11155111,
  'Zhejiang' = 1337803,
  'Holesky' = 17000,
  'Auroria' = 205205,
}

export const NetworkChainIdDict: { [id: string]: number } = {
  Mainnet: 1,
  Ropsten: 3,
  Strax: 105105,
  Sepolia: 11155111,
  Zhejiang: 1337803,
  Holesky: 17000,
  Auroria: 205205,
};

/*
  for UI purposes, all networks are "supported", but an error message
 is displayed when the user is not connected to the "allowed" network
 */

const supportedNetworks = [
  NetworkChainId.Mainnet,
  NetworkChainId.Ropsten,
  NetworkChainId.Strax,
  NetworkChainId.Sepolia,
  NetworkChainId.Zhejiang,
  NetworkChainId.Holesky,
  NetworkChainId.Auroria,
];

enum Testnet {
  'Ropsten',
  'Strax',
  'Sepolia',
  'Zhejiang',
  'Holesky',
  'Auroria',
}

enum Mainnet {
  'Strax',
}

export const NetworkNameToChainId: { [key: string]: NetworkChainId } = {
  Mainnet: NetworkChainId.Mainnet,
  Ropsten: NetworkChainId.Ropsten,
  Strax: NetworkChainId.Strax,
  Auroria: NetworkChainId.Auroria,
  Zhejiang: NetworkChainId.Zhejiang,
  Holesky: NetworkChainId.Holesky,
};

export const TARGET_NETWORK_CHAIN_ID = IS_MAINNET
  ? NetworkChainId.Strax
  : NetworkNameToChainId[TESTNET_LAUNCHPAD_NAME];

export const IS_GOERLI = TARGET_NETWORK_CHAIN_ID === NetworkChainId.Strax;

export const AllowedNetworks = IS_MAINNET ? Mainnet : Testnet;

export const AllowedELNetworks = [NETWORK_NAME];
export const metamask: InjectedConnector = new MetamaskConnector({
  supportedChainIds: supportedNetworks,
});

// sets up initial call to MM
export function useMetamaskEagerConnect(): boolean {
  const {
    activate: connectTo,
    active: isMetamaskConnected,
  }: web3ReactInterface = useWeb3React();
  const [attempted, setAttempted] = useState(false);

  useEffect(() => {
    const attemptConnection = async () => {
      const isAuthorized: boolean = await metamask.isAuthorized();
      if (isAuthorized) {
        connectTo(metamask, undefined, true).catch(() => setAttempted(true));
      } else {
        setAttempted(true);
      }
    };
    attemptConnection();
  }, [connectTo]);

  useEffect(() => {
    if (!attempted && isMetamaskConnected) setAttempted(true);
  }, [attempted, isMetamaskConnected]);

  return attempted;
}

export function useMetamaskListener(suppress: boolean = false) {
  const { active, error, activate: connectTo } = useWeb3React();

  useEffect((): any => {
    const { ethereum } = window as any;

    if (ethereum && ethereum.on && !active && !error && !suppress) {
      const connectToMetamask = () => connectTo(metamask);

      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length > 0) {
          connectToMetamask();
        }
      };

      ethereum.on('connect', connectToMetamask);
      ethereum.on('chainChanged', connectToMetamask);
      ethereum.on('accountsChanged', handleAccountsChanged);
      ethereum.on('networkChanged', connectToMetamask);

      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListener('connect', connectToMetamask);
          ethereum.removeListener('chainChanged', connectToMetamask);
          ethereum.removeListener('accountsChanged', handleAccountsChanged);
          ethereum.removeListener('networkChanged', connectToMetamask);
        }
      };
    }
  }, [active, error, suppress, connectTo]);
}
