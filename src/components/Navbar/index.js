import "./index.css";
import React, { useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { injected } from "../../blockchain/metamaskConnector";
import toast, { Toaster } from "react-hot-toast";


const Navbar = () => {

  const selectedNetwork = 421613;

  const { active, account, library, activate, deactivate, chainId } =
    useWeb3React();

  const toHex = (num) => {
    const val = Number(num);
    return "0x" + val.toString(16);
  };

  async function disconnect() {
    try {
      deactivate();
      localStorage.setItem("isWalletConnected", "false");
      localStorage.removeItem("connector");
    } catch (ex) {
      console.log(ex);
    }
  }

  const switchNetwork = async () => {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: toHex(selectedNetwork.toString()) }],
      });
    } catch (switchError) {
      console.log(switchError);

      if (switchError.code === 4902) {
        await addNetwork(selectedNetwork.toString());
      }
    }
  };


  async function connectMetamaks() {
    try {
      if (window.ethereum && window.ethereum.networkVersion !== selectedNetwork.toString()) {
        switchNetwork();
      }

      activate(injected, undefined, true).then(
        (res) => {
          localStorage.setItem("isWalletConnected", "true");
          localStorage.setItem("connector", "injected");
        },
        (err) => {
          toast.error("Please install Metamask");
          console.log(err);
        }
      );
    } catch (ex) {
      toast.error("Please install Metamask");
      console.log(ex);
    }
  }

  function getWalletAbreviation(walletAddress) {
    if (walletAddress !== null && walletAddress !== undefined) {
      return walletAddress.slice(0, 6) + "..." + walletAddress.slice(-4);
    }
    return "";
  }

  const addNetwork = async (chainID) => {
    console.log("add network starting", chainID);
    console.log("chain oid to hex", toHex(chainID));
    //adding bsc mainnet

    console.log("bsc mainet adding");
    await window.ethereum
      .request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: "0xA4B1",
            chainName: "Arbitrum One",
            nativeCurrency: {
              name: "Ethereum",
              symbol: "ETH",
              decimals: 18,
            },
            rpcUrls: [
              "https://endpoints.omniatech.io/v1/arbitrum/one/public",
            ],
            blockExplorerUrls: ["https://arbiscan.io"],
          },
        ],
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const isWalletConnected = localStorage.getItem("isWalletConnected");
    const connector = localStorage.getItem("connector");
    if (isWalletConnected === "true" && connector === "injected") {
      activate(injected);
    }
  }, [active]);

  useEffect(() => {
    if (window.ethereum && window.ethereum.networkVersion !== selectedNetwork) {
      switchNetwork();
    }
  }, [chainId]);

  return (
    <div className='navbar-main'>
      <button className='navbar-btn' onClick={active ? disconnect : connectMetamaks}>{active ? (
        <span>
          <b> {getWalletAbreviation(account)}</b>
        </span>
      ) : (
        <span>Connect</span>
      )}</button>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default Navbar;
