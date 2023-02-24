import "./index.css";
import { useWeb3React } from "@web3-react/core";
import toast, { Toaster } from "react-hot-toast";
import React, { useEffect, useState } from "react";
import TokenSaleAbi from "../../blockchain/abi/TokenSale.json";
import TokenAbi from "../../blockchain/abi/TokenAbi.json";
//import { TokenSale } from "../../blockchain/address";
import { formatEther, parseEther } from "ethers";


const TokenSaleAddress = "0x68030893740F1abD7716d030816588528B6b5225"
const TokenAddress = "0xddcd1D04501f145a25160F85734Add4BBa521c55"

const Presale = () => {

  const { active, account, library, activate, deactivate, chainId } =
    useWeb3React();

  const [tokensPerEth, setTokensPerEth] = useState(0)
  const [endTime, setEndTime] = useState(0)
  const [remainingTime, setRemainingTime] = useState(0)
  const [totalEth, setTotalEth] = useState(0)
  const [claimableAmount, setClaimableAmount] = useState(0)
  const [tokenBalance, setTokenBalance] = useState(0)
  const [buyEthAmount, setBuyEthAmount] = useState("0")

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
      .totalEth()
      .call()
      .then((res) => {
        console.log("res", res);
        setTotalEth(res);
      });
  };

  const getClaimableAmount = async () => {
    presaleContract
      .tokenBalances(account)
      .call()
      .then((res) => {
        console.log("res", res);
        setClaimableAmount(res);
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

  const buyTokens = async () => {

    /*
    console.log("formatEther(buyEthAmount)", parseEther(buyEthAmount).toString());
    console.log("formatEther(0)", formatEther(0));

    // check if buyEthAmount is more than 0
    if (parseEther(buyEthAmount).toString() > "0") {
      toast.error("Eth amount should be more than 0");
      return;
    }
    */

    // check if user have enough eth
    const ethBalance = await library.eth.getBalance(account);
    if (formatEther(ethBalance) < buyEthAmount) {
      toast.error("Insufficient ETH balance");
      return;
    }

    presaleContract
      .buyTokens()
      .send({ from: account, value: parseEther(buyEthAmount).toString() })
      .then(async (res) => {
        console.log("res", res);
        toast.success("Tokens bought successfully");
        await updatePresaleStatus();
      })
      .catch((err) => {
        console.log("err", err);
        toast.error(err.message);
      });
  };

  const getMaxEthContribution = async () => {
    return presaleContract
      .maxEthContribution()
      .call()
      .then((res) => {
        console.log("res", res);
        return res;
      });
  };


  const inputOnChange = (e) => {
    console.log(e.target.value);
    setBuyEthAmount(e.target.value);
  };

  const setMax = async () => {

    const maxEthContribution = await getMaxEthContribution();
    console.log("maxEthContribution", maxEthContribution);

    const claimableAmount = await presaleContract
      .ethContributed(account)
      .call()
      .then((res) => {
        console.log("res", res);
        return res;
      });

    const maxEth = (maxEthContribution - claimableAmount);
    console.log("maxEth", maxEth);
    setBuyEthAmount(formatEther(maxEth.toString()));
  };

  const updatePresaleStatus = async () => {
    if (account && library) {
      getTokensPerEth();
      getEndTime();
      getTotalEthRaised();
      getClaimableAmount();
      getTokenBalance();
    }
  };

  useEffect(() => {
    updatePresaleStatus();
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
              <div className='presale-card-left-top-1-content'>{formatEther(totalEth)} ETH</div>
            </div>
            <div className='presale-card-left-top-2'>
              <div className='presale-card-left-top-2-title'>Pending Honey</div>
              <div className='presale-card-left-top-2-content'>
                {formatEther(claimableAmount)}
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
              <input className='presale-card-right-bottom-input' type="number" value={buyEthAmount} onChange={inputOnChange} />
              <button className='presale-card-right-bottom-max' onClick={setMax}>MAX</button>
            </div>

            <div>
              <button className='presale-card-right-bottom-button' onClick={buyTokens}>
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
