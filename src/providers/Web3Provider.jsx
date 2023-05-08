import React, { createContext, useContext, useState, useEffect } from "react";
import { formatEther } from "ethers";
import { useSnackbar } from "./SnackbarProvider";
import { ETHEREUM_MAIN_CHAIN, wallets } from "../constants";

export const Web3Context = createContext({});

export const Web3Provider = ({ children }) => {
  const [currentChain, setChain] = useState(null);
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);
  const [wallet, setWallet] = useState(null);
  const [provider, setProvider] = useState(null);

  const { showError } = useSnackbar();

  const handleConnect = async (wallet) => {
    if (window.ethereum) {
      let provider = window.ethereum;

      if (provider?.providers?.length) {
        if (wallet === wallets.metaMask) {
          provider = provider?.providers?.find((p) => p.isMetaMask);
        } else if (wallet === wallets.coinbase) {
          provider = provider?.providers?.find((p) => p.isCoinbaseWallet);
        }
      }

      setProvider(provider);
      setWallet(wallet);

      try {
        const chain = await provider.request({
          method: "eth_chainId",
        });

        if (chain !== ETHEREUM_MAIN_CHAIN) {
          showError(
            `Please switch to Ethereum Mainnet and try connecting to ${wallet} again.`
          );
          return;
        }

        const accounts = await provider.request({
          method: "eth_requestAccounts",
        });

        setChain(chain);
        await handleAccountChange(accounts[0]);
      } catch (err) {
        showError(`There was a problem connecting to ${wallet}`);
      }
    } else {
      showError(`Please install ${wallet} extension.`);
    }
  };

  const handleAccountChange = async (newAccount) => {
    setAccount(newAccount);
  };

  const getAccountBalance = async (newAccount) => {
    try {
      const balance = await provider.request({
        method: "eth_getBalance",
        params: [newAccount.toString(), "latest"],
      });
      setBalance(formatEther(balance));
    } catch (err) {
      showError(`There was a problem connecting to your account`);
    }
  };

  useEffect(() => {
    if (currentChain === ETHEREUM_MAIN_CHAIN) {
      getAccountBalance(account);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account]);

  useEffect(() => {
    if (wallet && provider) {
      provider.on("accountsChanged", (accounts) => {
        handleAccountChange(accounts[0]);
      });

      provider.on("chainChanged", (chainId) => {
        if (chainId !== ETHEREUM_MAIN_CHAIN) {
          showError(`Please switch to Ethereum Main network`);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wallet, provider]);

  return (
    <Web3Context.Provider
      value={{
        account,
        currentChain,
        balance,
        setWallet,
        handleConnect,
        handleAccountChange,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

export const useWeb3ProvderContext = () => useContext(Web3Context);
