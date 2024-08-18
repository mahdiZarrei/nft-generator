import { Box, Card, TextField, Button, Typography } from "@mui/material";
import { transferFromWithBytesValid } from "../../../validations/SafeTransferFrom";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { useWeb3Modal, useWeb3ModalAccount } from "@web3modal/ethers/react";
import NFTContext from "../../../context/NFTContext";
import {
  checkUserConnected,
  require,
  getDataFromContractWithValue,
} from "../../../helper/transactions";
import { toast } from "react-toastify";
const TransferFrom = () => {
  const { address, isConnected } = useWeb3ModalAccount();
  const { open } = useWeb3Modal();
  const { NFTContract, setData } = useContext(NFTContext);
  const [btn, setBtn] = useState(true);
  const formik = useFormik({
    initialValues: {
      To: "",
      From: "",
      ID: Number,
      bytes: "",
    },
    validationSchema: transferFromWithBytesValid,
    onSubmit: (values, { resetForm }) => {
      onclick(values);
      resetForm();
    },
  });
  const onclick = async (values) => {
    checkUserConnected(isConnected, open);
    const owner = await NFTContract.ownerOf(values.ID);
    const approved = await NFTContract.getApproved(values.ID);
    const isApprovedForAll = await NFTContract.isApprovedForAll(
      values.From,
      address
    );
    require(owner === address ||
      approved === address ||
      isApprovedForAll, "you not allowed to transfer this token");
    try {
      setBtn(false);
      var tx = await NFTContract.safeTransferFrom(
        values.From,
        values.To,
        values.ID,
        values.bytes
      );
      await toast.promise(tx.wait(), {
        pending: "pending transaction",
        error: "ERROR",
        success: "transaction successfully done!",
      });
      const tokenBalance = await getDataFromContractWithValue(
        NFTContract.balanceOf,
        address
      );
      setData((prev) => ({ ...prev, tokenBalance }));
    } catch (error) {
      toast.error(error.message);
      setBtn(true);
    }
    setBtn(true);
  };
  return (
    <Card sx={{ borderRadius: 5, pb: 5, mt: 5, width: "100%" }}>
      <Typography variant="h4" ml={4} mt={2}>
        Safe Transfer From
      </Typography>
      <Box component="form" onSubmit={formik.handleSubmit}>
        <TextField
          name="bytes"
          error={formik.touched.bytes && formik.errors.bytes ? true : false}
          value={formik.values.bytes}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          helperText={
            formik.touched.bytes && formik.errors.bytes
              ? formik.errors.bytes
              : null
          }
          id="bytes"
          label="bytes"
          sx={{ ml: 9, mt: 2, width: "83%" }}
        />
        <TextField
          name="To"
          error={formik.touched.To && formik.errors.To ? true : false}
          value={formik.values.To}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          helperText={
            formik.touched.To && formik.errors.To ? formik.errors.To : null
          }
          id="To"
          label="To"
          sx={{ ml: 9, mt: 2, width: "25%" }}
        />
        <TextField
          name="From"
          error={formik.touched.From && formik.errors.From ? true : false}
          value={formik.values.From}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          helperText={
            formik.touched.From && formik.errors.From
              ? formik.errors.From
              : null
          }
          id="From"
          label="From"
          sx={{ ml: 5, mt: 2, width: "25%" }}
        />
        <TextField
          name="ID"
          error={formik.touched.ID && formik.errors.ID ? true : false}
          value={formik.values.ID}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          helperText={
            formik.touched.ID && formik.errors.ID ? formik.errors.ID : null
          }
          id="ID"
          label="ID"
          sx={{ ml: 5, mt: 2, width: "25%" }}
        />

        <Button
          disabled={
            formik.errors.From ||
            formik.errors.ID ||
            formik.errors.To ||
            formik.errors.bytes ||
            !btn
              ? true
              : false
          }
          type="submit"
          variant="contained"
          sx={{ mr: 5, ml: 9, mt: 2, width: "83%", fontSize: 24 }}
        >
          Safe Transfer From
        </Button>
      </Box>
    </Card>
  );
};

export default TransferFrom;
