export const network =
  process.env.NODE_ENV === "production"
    ? {
      host: "matic",
      chainId: 137,
      networkName: "Polygon",
      blockExplorer: "https://polygonscan.com/",
      ticker: "MATIC",
      tickerName: "MATIC",
      rpcUrl: "https://polygon-rpc.com",
    }
    : {
      host: "mumbai",
      chainId: 80001,
      networkName: "mumbai",
      blockExplorer: "https://mumbai.polygonscan.com/",
      ticker: "MUMBAI",
      tickerName: "MUMBAI",
      rpcUrl:
        "https://polygon-mumbai.infura.io/v3/74a97bae118345ecbadadaaeb1cf4a53",
    };
