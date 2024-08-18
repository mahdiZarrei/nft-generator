import {
    Box,
    Card,
    TextField,
    Button,
    Typography,
    IconButton,
} from "@mui/material";
import { GetApproveValid } from "../../../validations/Approve";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { useWeb3Modal, useWeb3ModalAccount } from "@web3modal/ethers/react";
import { checkUserConnected } from "../../../helper/transactions";
import NFTContext from "../../../context/NFTContext";
import { copyToClipboard } from "../../../helper/displayAddress";
import { UilCopy } from "@iconscout/react-unicons";
import { toast } from "react-toastify";

const OwnerOf = () => {
    const { isConnected } = useWeb3ModalAccount();
    const { open } = useWeb3Modal();
    const { NFTContract } = useContext(NFTContext);
    const [btn, setBtn] = useState(true);
    const [value, setValue] = useState();
    const formik = useFormik({
        initialValues: {
            TokenID: "",
        },
        validationSchema: GetApproveValid,
        onSubmit: (values, { resetForm }) => {
            onclick(values);
            resetForm();
        },
    });
    const onclick = async (values) => {
        checkUserConnected(isConnected, open);
        try {
            setBtn(false);
            const tx = await NFTContract.ownerOf(values.TokenID);
            setValue(tx);
        } catch (error) {
            toast.error(error.message);
            setBtn(true);
        }
        setBtn(true);
    };
    return (
        <Card sx={{ borderRadius: 5, pb: 5, mt: 5 }}>
            <Typography variant='h4' ml={4} mt={2}>
                Owner Of
            </Typography>
            <Box component='form' onSubmit={formik.handleSubmit}>
                <TextField
                    error={
                        formik.touched.TokenID && formik.errors.TokenID
                            ? true
                            : false
                    }
                    value={formik.values.TokenID}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={
                        formik.touched.TokenID && formik.errors.TokenID
                            ? formik.errors.TokenID
                            : null
                    }
                    name='TokenID'
                    id='TokenID'
                    label='Token ID'
                    sx={{ ml: 9, mt: 2, width: "83%" }}
                    type='number'
                />
                <Button
                    disabled={formik.errors.To || formik.errors.TokenID || !btn}
                    variant='contained'
                    sx={{ ml: 9, mt: 2, width: "83%", fontSize: 24 }}
                    type='submit'>
                    Owner Of
                </Button>
                <Box sx={{ textAlign: "center", mt: "3vh", fontSize: "2vw" }}>
                    <Typography variant='p' color='secondary'>
                        {value}
                    </Typography>
                    {value && (
                        <IconButton onClick={() => copyToClipboard(value)}>
                            <UilCopy />
                        </IconButton>
                    )}
                </Box>
            </Box>
        </Card>
    );
};

export default OwnerOf;
