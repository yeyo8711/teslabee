import React from "react";
import "./index.css";

const Presale = () => {
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
              <div className='presale-card-left-top-1-content'>$0.00</div>
            </div>
            <div className='presale-card-left-top-2'>
              <div className='presale-card-left-top-2-title'>Pending Honey</div>
              <div className='presale-card-left-top-2-content'>
                134,413,134M
              </div>
            </div>
          </div>

          <div className='presale-card-left-top'>
            <div className='presale-card-left-top-1'>
              <div className='presale-card-left-top-1-title'>Ends In</div>
              <div className='presale-card-left-top-1-content'>23:45:15</div>
            </div>
            <div className='presale-card-left-top-2'>
              <div className='presale-card-left-top-2-title'>Honey Per ETH</div>
              <div className='presale-card-left-top-2-content'>2,834,231</div>
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
              <div>2,426,742.6</div>
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
    </div>
  );
};

export default Presale;
