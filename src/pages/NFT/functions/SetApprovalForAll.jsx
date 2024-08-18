import {
    Box,
    Card,
    TextField,
    Button,
    Typography,
    FormControlLabel,
    Checkbox,
} from "@mui/material";
import { SetApprovalForAllValid } from "../../../validations/SetApprovalForAll";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { useWeb3Modal, useWeb3ModalAccount } from "@web3modal/ethers/react";
import NFTContext from "../../../context/NFTContext";
import { checkUserConnected, require } from "../../../helper/transactions";
import { toast } from "react-toastify";
const SetApprovalForAll = () => {
    const { address, isConnected } = useWeb3ModalAccount();
    const { open } = useWeb3Modal();
    const { NFTContract } = useContext(NFTContext);
    const [btn, setBtn] = useState(true);
    const formik = useFormik({
        initialValues: {
            operator: "",
            approved: false,
        },
        validationSchema: SetApprovalForAllValid,
        onSubmit: (values, { resetForm }) => {
            onclick(values);
            resetForm();
        },
    });
    const onclick = async (values) => {
        checkUserConnected(isConnected, open);
        const isApproved = await NFTContract.isApprovedForAll(
            address,
            values.operator
        );
        require(!isApproved ===
            values.approved, `approved for all for this account already ${values.approved}`);
        try {
            setBtn(false);
            var tx = await NFTContract.setApprovalForAll(
                values.operator,
                values.approved
            );
            await toast.promise(tx.wait(), {
                pending: "pending transaction",
                error: "ERROR",
                success: "transaction successfully done!",
            });
        } catch (error) {
            toast.error(error.message);
            setBtn(true);
        }
        setBtn(true);
    };
    return (
        <Card sx={{ borderRadius: 5, pb: 5, mt: 5 }}>
            <Typography variant='h4' ml={4} mt={2}>
                Set Approval For All
            </Typography>
            <Box component='form' onSubmit={formik.handleSubmit}>
                <TextField
                    name='operator'
                    error={
                        formik.touched.operator && formik.errors.operator
                            ? true
                            : false
                    }
                    value={formik.values.operator}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    helperText={
                        formik.touched.operator && formik.errors.To
                            ? formik.errors.To
                            : null
                    }
                    id='operator'
                    label='operator'
                    sx={{ ml: 9, mt: 2, width: "83%" }}
                />
                <FormControlLabel
                    sx={{ ml: 9, mt: 2 }}
                    control={
                        <Checkbox
                            checked={formik.values.approved}
                            onChange={formik.handleChange}
                            name='approved'
                            color='primary'
                        />
                    }
                    label={"approved"}
                />
                <Button
                    type='submit'
                    disabled={
                        formik.errors.To || formik.errors.TokenID || !btn
                            ? true
                            : false
                    }
                    variant='contained'
                    sx={{ ml: 9, mt: 2, width: "83%", fontSize: 24 }}>
                    Set Approval For All
                </Button>
            </Box>
        </Card>
    );
};

export default SetApprovalForAll;
