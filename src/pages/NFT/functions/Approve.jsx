import { Box, Card, TextField, Button, Typography } from "@mui/material";
import { ApproveValid } from "../../../validations/Approve";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import NFTContext from "../../../context/NFTContext";
import {
    checkUserConnected,
    require,
} from "../../../helper/transactions";
import { useWeb3Modal, useWeb3ModalAccount } from "@web3modal/ethers/react";
import { toast } from "react-toastify";
const Approve = () => {
    const { address, isConnected } = useWeb3ModalAccount();
    const { open } = useWeb3Modal();
    const { NFTContract } = useContext(NFTContext);
    const [btn, setBtn] = useState(true);
    const formik = useFormik({
        initialValues: {
            To: "",
            TokenID: "",
        },
        validationSchema: ApproveValid,
        onSubmit: (values, { resetForm }) => {
            onclick(values);
            resetForm();
        },
    });
    const onclick = async (values) => {
        checkUserConnected(isConnected, open);
        const owner = await NFTContract.ownerOf(values.TokenID);
        require(owner === address, "you not owner of this token");
        try {
            setBtn(false);
            var tx = await NFTContract.approve(values.To, values.TokenID);
            await toast.promise(tx.wait(), {
                pending: "pending transaction",
                error: "ERROR",
                success: "transaction successfully done!",
            });
        } catch (error) {
            toast.error(error.message);
        }
        setBtn(true);
    };
    return (
        <Card sx={{ borderRadius: 5, pb: 5 }}>
            <Typography variant='h4' ml={4} mt={2}>
                Approve
            </Typography>
            <Box component='form' onSubmit={formik.handleSubmit}>
                <TextField
                    name='To'
                    error={formik.touched.To && formik.errors.To ? true : false}
                    value={formik.values.To}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={
                        formik.touched.To && formik.errors.To
                            ? formik.errors.To
                            : null
                    }
                    id='To'
                    label='To'
                    sx={{ ml: 9, mt: 2, width: "25%" }}
                />
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
                    label='TokenID'
                    sx={{ ml: 5, mt: 2, width: "25%" }}
                    type='number'
                />
                <Button
                    disabled={formik.errors.To || formik.errors.TokenID || !btn}
                    type='submit'
                    variant='contained'
                    sx={{ ml: 5, mt: 2, width: "25%", fontSize: 24 }}>
                    Approve
                </Button>
            </Box>
        </Card>
    );
};

export default Approve;
