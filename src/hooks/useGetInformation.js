import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Contract, BrowserProvider } from "ethers";
import { NFTABI } from "../data/NFTABI";
import { getCollectedDataFromContract } from "../helper/transactions";

export const useGetNFTInformation = () => {
  const { isConnected, address } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();
  const { NFTAddress } = useParams();
  const [data, setData] = useState({
    name: "loading",
    symbol: "loding",
    tokenBalance: "loading",
    owner: "loading",
  });
  const [NFTContract, setNFTContract] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const ethersProvider = new BrowserProvider(walletProvider);
      const signer = await ethersProvider.getSigner();
      const NFT = new Contract(NFTAddress, NFTABI, signer);
      const contractFunctions = [
        ["name", NFT.name],
        ["symbol", NFT.symbol],
        ["owner", NFT.owner],
      ];
      let data = await getCollectedDataFromContract(contractFunctions);
      data["tokenBalance"] = await NFT.balanceOf(address);
      console.log(data);
      setNFTContract(NFT);
      setData(data);
    };
    if (isConnected) {
      fetchData();
    }
  }, [isConnected]);
  return { data, NFTContract, setData };
};
