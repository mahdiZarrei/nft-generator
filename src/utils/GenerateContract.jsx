import { ethers } from "ethers";
import { NFTABI } from "../data/NFTABI";

import { NFTByteCode } from "../data/NFTByteCode";
export const GeneratorContract = async (values, signer) => {
  const contractFactory = new ethers.ContractFactory(
    NFTABI,
    NFTByteCode,
    signer
  );

  const contract = await contractFactory.deploy(values.name, values.symbol);
  await contract.waitForDeployment();
  const address = await contract.getAddress();
  console.log("Contract deployed at address:", address);
  return address;
};
