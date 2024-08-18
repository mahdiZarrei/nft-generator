import { Box, Card, TextField, Button, Typography } from "@mui/material";
import { IsApprovedForAllValid } from "../../../validations/IsApprovedForAll";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { useWeb3Modal, useWeb3ModalAccount } from "@web3modal/ethers/react";
import { checkUserConnected } from "../../../helper/transactions";
import NFTContext from "../../../context/NFTContext";
import { toast } from "react-toastify";
const IsApprovedForAll = () => {
    const { isConnected } = useWeb3ModalAccount();
    const { open } = useWeb3Modal();
    const { NFTContract } = useContext(NFTContext);
    const [btn, setBtn] = useState(true);
    const [value, setValue] = useState();
    const formik = useFormik({
        initialValues: {
            operator: "",
            owner: "",
        },
        validationSchema: IsApprovedForAllValid,
        onSubmit: (values, { resetForm }) => {
            onclick(values);
            resetForm();
        },
    });
    const onclick = async (values) => {
        checkUserConnected(isConnected, open);
        try {
            setBtn(false)
            const tx = await NFTContract.isApprovedForAll(
                values.owner,
                values.operator
            );
            setValue(tx.toString());
        } catch (error) {
            toast.error(error.message);
            setBtn(true)
        }
        setBtn(true)
    };
    return (
        <Card sx={{ borderRadius: 5, pb: 5, mt: 5 }}>
            <Typography variant='h4' ml={4} mt={2}>
                IsApprovedForAll
            </Typography>
            <Box component='form' onSubmit={formik.handleSubmit}>
                <TextField
                    name='owner'
                    error={
                        formik.touched.owner && formik.errors.owner
                            ? true
                            : false
                    }
                    value={formik.values.owner}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={
                        formik.touched.owner && formik.errors.owner
                            ? formik.errors.owner
                            : null
                    }
                    id='owner'
                    label='owner'
                    sx={{ ml: 9, mt: 2, width: "41.5%" }}
                />
                <TextField
                    error={
                        formik.touched.operator && formik.errors.operator
                            ? true
                            : false
                    }
                    value={formik.values.operator}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={
                        formik.touched.operator && formik.errors.operator
                            ? formik.errors.operator
                            : null
                    }
                    name='operator'
                    id='operator'
                    label='operator'
                    sx={{ ml: 5, mt: 2, width: "41.5%" }}
                />
                <Button
                    disabled={
                        formik.errors.operator || formik.errors.owner || !btn
                            ? true
                            : false
                    }
                    type='submit'
                    variant='contained'
                    sx={{ ml: 9, mt: 2, width: "83%", fontSize: 24 }}>
                    Is Approved For All
                </Button>
                <Box sx={{ textAlign: "center", mt: "3vh", fontSize: "2vw" }}>
                    <Typography variant='p' color='secondary'>
                        {value}
                    </Typography>
                </Box>
            </Box>
        </Card>
    );
};

export default IsApprovedForAll;
