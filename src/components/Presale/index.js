import "./index.css";
import { useWeb3React } from "@web3-react/core";
import toast, { Toaster } from "react-hot-toast";
import React, { useEffect, useState } from "react";
import TokenSaleAbi from "../../blockchain/abi/TokenSale.json";
import TokenAbi from "../../blockchain/abi/TokenAbi.json";
//import { TokenSale } from "../../blockchain/address";
import { formatEther } from "ethers";


const TokenSaleAddress = "0x68030893740F1abD7716d030816588528B6b5225"
const TokenAddress = "0xddcd1D04501f145a25160F85734Add4BBa521c55"

const Presale = () => {

  const { active, account, library, activate, deactivate, chainId } =
    useWeb3React();

  const [tokensPerEth, setTokensPerEth] = useState(0)
  const [endTime, setEndTime] = useState(0)
  const [remainingTime, setRemainingTime] = useState(0)
  const [totalEth, setTotalEth] = useState(0)
  const [tokenBalances, setTokenBalances] = useState(0)
  const [tokenBalance, setTokenBalance] = useState(0)

  let presaleContract;
  let tokenContract;

  if (account && library) {
    presaleContract = new library.eth.Contract(
      TokenSaleAbi,
      TokenSaleAddress
    ).methods;

    tokenContract = new library.eth.Contract(
      TokenAbi,
      TokenAddress
    ).methods;
  }

  const getTokensPerEth = async () => {
    presaleContract
      .getTokensPerEth()
      .call()
      .then((res) => {
        console.log("res", res);
        setTokensPerEth(res);
      });
  };

  const getEndTime = async () => {
    presaleContract
      .endTime()
      .call()
      .then((res) => {
        console.log("res", res);
        setEndTime(res);
        calculateRemainingTime();
      });
  };

  const getTotalEthRaised = async () => {
    presaleContract
      .totalEthRaised()
      .call()
      .then((res) => {
        console.log("res", res);
        setTotalEth(res);
      });
  };

  const getTokenBalances = async () => {
    presaleContract
      .tokenBalances(account)
      .call()
      .then((res) => {
        console.log("res", res);
        setTokenBalances(res);
      });
  };

  const getTokenBalance = async () => {
    tokenContract
      .balanceOf(account)
      .call()
      .then((res) => {
        console.log("res", res);
        setTokenBalance(res);
      });
  }

  const calculateRemainingTime = () => {
    const now = new Date().getTime();
    const distance = endTime - now;
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    setRemainingTime(`${days}d ${hours}h ${minutes}m ${seconds}s`);
  };

  useEffect(() => {
    if (account && library) {
      getTokensPerEth();
      getEndTime();
      getTotalEthRaised();
      getTokenBalances();
      getTokenBalance();
    }
  }, [account, library]);


  return (
    <div className='presale-main'>
      <div className='presale-title'>
        <h1>Presale 🐝</h1>
      </div>
      <div className='presale-card'>
        <div className='presale-card-left'>
          <div className='presale-card-left-top'>
            <div className='presale-card-left-top-1'>
              <div className='presale-card-left-top-1-title'>
                Total ETH Raised
              </div>
              <div className='presale-card-left-top-1-content'>{totalEth} ETH</div>
            </div>
            <div className='presale-card-left-top-2'>
              <div className='presale-card-left-top-2-title'>Pending Honey</div>
              <div className='presale-card-left-top-2-content'>
                {tokenBalances}
              </div>
            </div>
          </div>

          <div className='presale-card-left-top'>
            <div className='presale-card-left-top-1'>
              <div className='presale-card-left-top-1-title'>Ends In</div>
              <div className='presale-card-left-top-1-content'>{remainingTime}</div>
            </div>
            <div className='presale-card-left-top-2'>
              <div className='presale-card-left-top-2-title'>Honey Per ETH</div>
              <div className='presale-card-left-top-2-content'>{tokensPerEth}</div>
            </div>
          </div>
          <div className='presale-card-left-bottom'></div>
          <div className='claim-honey-holder'>
            <button className='claim-honey'>Claim Honey</button>
          </div>
        </div>
        <div className='presale-card-right'>
          <div className='presale-card-right-top'>
            <div className='presale-card-right-top-contribute'>
              Contribute ETH
            </div>
            <div className='presale-card-right-top-balance'>
              <div>Token Balance</div>
              <div>{formatEther(tokenBalance, 'ether')}</div>
            </div>
          </div>
          <div className='presale-card-right-bottom'>
            <div className='presale-card-right-bottom-form'>
              <input className='presale-card-right-bottom-input' />
              <button className='presale-card-right-bottom-max'>MAX</button>
            </div>

            <div>
              <button className='presale-card-right-bottom-button'>
                Contribute
              </button>
            </div>
          </div>
        </div>
      </div>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
};

export default Presale;
