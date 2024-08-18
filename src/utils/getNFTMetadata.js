import { Network, Alchemy } from "alchemy-sdk";
const settings = {
  apiKey: "CR7UC11_cqrgFloxxIQ5snmJY2EE46al",
  network: Network.ETH_SEPOLIA,
};

const alchemy = new Alchemy(settings);
export const getNFTMetadata = async (nftContractAddress, tokenId) => {
  const response = await alchemy.nft.getNftMetadata(
    nftContractAddress,
    tokenId
  );
  return response;
};
