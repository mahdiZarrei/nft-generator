import { Grid } from "@mui/material";
import {
    Information,
    Approve,
    CreateToken,
    GetApproved,
    IsApprovedForAll,
    OwnerOf,
    SafeTransferFrom,
    SetApprovalForAll,
    TokenURI,
    Transfer,
    TransferFrom,
} from "./functions";
import { useGetNFTInformation } from "../../hooks/useGetInformation";
import NFTContext from "../../context/NFTContext";
import {
    useHandleAccountChanged,
    useHandleChainChanged,
} from "../../helper/handleChanged";
import Appbar from "../../components/AppBar/AppBar";
import Footer from "../../components/Footer";

const NFT = () => {
    const { data, NFTContract, setData } = useGetNFTInformation();
    useHandleAccountChanged();
    useHandleChainChanged();
    return (
        <>
            <Appbar />
            <NFTContext.Provider value={{ data, NFTContract, setData }}>
                <Grid mt={12} container spacing={0}>
                    <CreateToken />
                    <Grid ml='1%' item xs={2}>
                        <Information />
                    </Grid>
                    <Grid ml='6%' item xs={9}>
                        <Approve />
                        <SafeTransferFrom />
                        <Transfer />
                        <TransferFrom />
                        <SetApprovalForAll />
                        <GetApproved />
                        <IsApprovedForAll />
                        <OwnerOf />
                        <TokenURI/>
                    </Grid>
                </Grid>
            </NFTContext.Provider>
            <Footer />
        </>
    );
};

export default NFT;
