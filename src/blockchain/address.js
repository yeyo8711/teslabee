export const SupportedChainId = {
  // BSC
  ARB_MAINNET: 42161,
  ARB_TESTNET: 421613,
  ARB_HEX_MAINNET: "0xA4B1",
  ARB_HEX_TESTNET: "0x66EED",
};

export const TokenSale = {
  [SupportedChainId.ARB_MAINNET]: "0x561f73Ef10228e5f74e221748eCDA6093431d491",
  [SupportedChainId.ARB_TESTNET]: "0x561f73Ef10228e5f74e221748eCDA6093431d491",
  [SupportedChainId.ARB_HEX_MAINNET]: "0x561f73Ef10228e5f74e221748eCDA6093431d491",
  [SupportedChainId.ARB_HEX_TESTNET]: "0x561f73Ef10228e5f74e221748eCDA6093431d491",
};

export default module.exports = {
  SupportedChainId,
  TokenSale,
};