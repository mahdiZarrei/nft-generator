import { useState } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { UilChart } from "@iconscout/react-unicons";
import { Box, Typography, Button, Grid, TextField } from "@mui/material";
import { BrowserProvider } from "ethers";
import {
    useWeb3ModalAccount,
    useWeb3ModalProvider,
    useWeb3Modal,
} from "@web3modal/ethers/react";

import { MadeValid } from "../../validations/Made";
import { GeneratorContract } from "../../utils/GenerateContract";
import SucceedModal from "./Modal.jsx";

const Made = () => {
    const [btn, setBtn] = useState(true);
    const [openModal, setOpenModal] = useState(false);
    const [address, setAdrress] = useState("");
    const formik = useFormik({
        initialValues: {
            name: "",
            symbol: "",
        },
        validationSchema: MadeValid,
        onSubmit: (values, { resetForm }) => {
            onclick(values);
            resetForm();
        },
    });
    const { isConnected } = useWeb3ModalAccount();
    const { walletProvider } = useWeb3ModalProvider();
    const { open } = useWeb3Modal();
    const onclick = async (values) => {
        try {
            setBtn(false);
            if (!isConnected) {
                open();
                setBtn(true);
                throw toast.error("User disconnected");
            }
            const ethersProvider = new BrowserProvider(walletProvider);
            const signer = await ethersProvider.getSigner();
            try {
                const contract = await toast.promise(
                    GeneratorContract(values, signer),
                    {
                        pending: "pending transaction",
                        success: "ICO created successfully",
                        error: "ERROR",
                    }
                );
                setAdrress(contract);
                setBtn(true);
                setOpenModal(true);
            } catch (error) {
                toast.error(error.code);
                console.log(error);
                setBtn(true);
            }
        } catch (error) {
            setBtn(true);
            console.log(error);
        }
    };
    return (
        <Box component='form' onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
            <Box
                textAlign='center'
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    mt: 2,
                    alignItems: "center",
                    mb: 5,
                }}>
                <UilChart size='75' color='#2196f3' />
                <Typography variant='h4' mt={5}>
                    Made NFT Collection
                </Typography>
            </Box>
            <Grid container spacing={2} sx={{ textAlign: "center" }}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        autoFocus
                        error={
                            formik.touched.name && formik.errors.name
                                ? true
                                : false
                        }
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        helperText={
                            formik.touched.name && formik.errors.name
                                ? formik.errors.name
                                : null
                        }
                        name='name'
                        sx={{
                            width: {
                                xs: "92%",
                                md: "100%",
                                sm: "98%",
                            },
                        }}
                        id='name'
                        label='NFT Name'
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        error={
                            formik.touched.symbol && formik.errors.symbol
                                ? true
                                : false
                        }
                        value={formik.values.symbol}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        helperText={
                            formik.touched.symbol && formik.errors.symbol
                                ? formik.errors.symbol
                                : null
                        }
                        name='symbol'
                        sx={{
                            width: {
                                xs: "92%",
                                md: "100%",
                                sm: "98%",
                            },
                        }}
                        id='symbol'
                        label='NFT Symbol'
                    />
                </Grid>{" "}
            </Grid>
            <Button
                disabled={
                    formik.errors.name || formik.errors.symbol || !btn
                        ? true
                        : false
                }
                fullWidth
                type='submit'
                variant='contained'
                sx={{ mt: 3, fontSize: 15 }}>
                Made Contract NFT
            </Button>
            <SucceedModal
                onChange={(newOpen) => setOpenModal(newOpen)}
                open={openModal}
                ICOAddress={address}
            />
        </Box>
    );
};

export default Made;
