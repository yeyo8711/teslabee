const ChainParams = [
  // arbitrum testnet
  {
    chainId: 421613,
    chainName: "Arbitrum Goerli",
    nativeCurrency: {
      name: "ETH",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["https://goerli-rollup.arbitrum.io/rpc"],
    blockExplorerUrls: ["https://goerli.arbiscan.io"],
  },
  // arbitrum mainnet
  {
    chainId: 42161,
    chainName: "Arbitrum One",
    nativeCurrency: {
      name: "ETH",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["https://endpoints.omniatech.io/v1/arbitrum/one/public"],
    blockExplorerUrls: ["https://arbiscan.io"],
  }
];

export default ChainParams;
