export const SupportedChainId = {
  // BSC
  ARB_MAINNET: 42161,
  ARB_TESTNET: 421613,
  ARB_HEX_MAINNET: "0xA4B1",
  ARB_HEX_TESTNET: "0x66EED",
};

export const TokenSale = {
  [SupportedChainId.ARB_MAINNET]: "0x68030893740F1abD7716d030816588528B6b5225",
  [SupportedChainId.ARB_TESTNET]: "0x68030893740F1abD7716d030816588528B6b5225",
  [SupportedChainId.ARB_HEX_MAINNET]: "0x68030893740F1abD7716d030816588528B6b5225",
  [SupportedChainId.ARB_HEX_TESTNET]: "0x68030893740F1abD7716d030816588528B6b5225",
};

export default module.exports = {
  SupportedChainId,
  TokenSale,
};