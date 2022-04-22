import React, { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import MoralisDappContext from "./context";

function MoralisDappProvider({ children }) {
  const { web3, Moralis, user } = useMoralis();
  const [walletAddress, setWalletAddress] = useState();
  const [chainId, setChainId] = useState();
  const [contractABI, setContractABI] = useState(`{
  "anonymous": false,
  "inputs": [
    {
      "indexed": true,
      "internalType": "uint256",
      "name": "itemId",
      "type": "uint256"
    },
    {
      "indexed": true,
      "internalType": "address",
      "name": "nftContract",
      "type": "address"
    },
    {
      "indexed": true,
      "internalType": "uint256",
      "name": "tokenId",
      "type": "uint256"
    },
    {
      "indexed": false,
      "internalType": "address",
      "name": "seller",
      "type": "address"
    },
    {
      "indexed": false,
      "internalType": "address",
      "name": "owner",
      "type": "address"
    },
    {
      "indexed": false,
      "internalType": "uint256",
      "name": "price",
      "type": "uint256"
    },
    {
      "indexed": false,
      "internalType": "bool",
      "name": "sold",
      "type": "bool"
    }
  ],
  "name": "MarketItemCreated",
  "type": "event"
}`); //Smart Contract ABI here
  const [marketAddress, setMarketAddress] = useState(
    "0x5D0cf3177b80463cAC411eE483CCb0D2bDf47Fe2"
  ); //Smart Contract Address Here

  useEffect(() => {
    Moralis.onChainChanged(function (chain) {
      setChainId(chain);
    });

    Moralis.onAccountsChanged(function (address) {
      setWalletAddress(address[0]);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setChainId(web3.givenProvider?.chainId));
  useEffect(() => {
    if (user?.get("ethAddress")) {
      setWalletAddress(user?.get("ethAddress"));
    } else {
      setWalletAddress(web3.givenProvider?.selectedAddress);
    }
  }, [web3, user]);

  return (
    <MoralisDappContext.Provider
      value={{
        walletAddress,
        chainId,
        marketAddress,
        setMarketAddress,
        contractABI,
        setContractABI,
      }}
    >
      {children}
    </MoralisDappContext.Provider>
  );
}

function useMoralisDapp() {
  const context = React.useContext(MoralisDappContext);
  if (context === undefined) {
    throw new Error("useMoralisDapp must be used within a MoralisDappProvider");
  }
  return context;
}

export { MoralisDappProvider, useMoralisDapp };
