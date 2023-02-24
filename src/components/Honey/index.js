import React from "react";
import "./index.css";
import honey from "../../assets/honey.png";

const Honey = () => {
  return (
    <div className='honey-main'>
      <div className='honey-title'>
        <h1>Honey 🍯</h1>
      </div>
      <div className='honey-main-container'>
        <div className='honey-image-holder'>
          <img src={honey} alt='img' className='honey-image' />
        </div>
        <div className='honey-card'>
          <div className='honey-text'>
            The notorious Invasive Bee Mafia are running wild globally and
            causing a unprecedented honey shortage! The honey supply decreases
            rapidly with 0.001% per block... The only way to protec your honey
            is to put them in the vault.
          </div>
          <div className='honey-text'>
            There are three types of hives. Full protec hive will protect your
            precious honey FULLY and won't be affected by debase. Full protec
            hive has a locking period of 7 days. The other two hives only
            protect your HONEY partially in the form of rewards. The rewards are
            10 million HONEY per block. Big protec hive earns you 9/10 of the
            rewards by staking HONEY/ETH LP on Uniswap V2. The smol protec vault
            earns you only 1/10 of the rewards. Both of these vaults only have a
            locking period of 24 hours.
          </div>
          <div className='honey-card-bottom'>
            <div className='honey-buttons'>
              <div className='honey-btn'>Telegram</div>
              <div className='honey-btn'>Twitter</div>
              <div className='honey-btn'>Docs</div>
              <div className='honey-btn'>Chart</div>
            </div>
            <div className='honey-gethoney-btn-holder'>
              <button className='honey-gethoney-btn'>Get Honey</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Honey;
