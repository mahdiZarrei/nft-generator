import { Box } from "@mui/material";
import Holders from "./Name";
import Supply from "./Symbol";

import Balance from "./Balance";
import Owner from "./Owner";
import { useContext } from "react";
import NFTContext from "../../../../context/NFTContext";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
const Information = () => {
    const { data } = useContext(NFTContext);
    const { isConnected } = useWeb3ModalAccount();
    return (
        <>
            <Box width={"100%"} display={"flex"} flexDirection={"column"}>
                <Holders name={isConnected ? data.name : "not connected"} />
                <Supply
                    symbol={isConnected ? data.symbol : "not connected"}
                />
                <Balance
                    balance={
                        isConnected ? data.tokenBalance : "not connected"
                    }
                />
                <Owner owner={isConnected ? data.owner : "not connected"} />
            </Box>
        </>
    );
};

export default Information;
