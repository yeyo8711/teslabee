export const SupportedChainId = {
  // BSC
  ARB_MAINNET: 42161,
  ARB_TESTNET: 421613,
  ARB_HEX_MAINNET: "0xA4B1",
  ARB_HEX_TESTNET: "0x66EED",
};

export const TokenSale = {
  [SupportedChainId.ARB_MAINNET]: "0xc4d79411B777887610a7FA2183E484A253C24dFc",
  [SupportedChainId.ARB_TESTNET]: "0xc4d79411B777887610a7FA2183E484A253C24dFc",
  [SupportedChainId.ARB_HEX_MAINNET]: "0xc4d79411B777887610a7FA2183E484A253C24dFc",
  [SupportedChainId.ARB_HEX_TESTNET]: "0xc4d79411B777887610a7FA2183E484A253C24dFc",
};

export default module.exports = {
  SupportedChainId,
  TokenSale,
};