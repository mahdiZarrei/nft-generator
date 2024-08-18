import { UilMultiply, UilCopy } from "@iconscout/react-unicons";
import { Box, Button, IconButton, Modal, Typography } from "@mui/material";

import { NavLink } from "react-router-dom";

import image from "./modalImage.png";
import { TextEdit, copyToClipboard } from "../../utils/index";
import { sourseCode } from "../../data/NFTSourseCode";

const SucceedModal = ({ onChange, open, ICOAddress }) => {
  const address = ICOAddress;
  const handleClose = () => {
    onChange(false);
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      sx={{ overflow: "scroll" }}
    >
      <Box
        sx={{
          position: "absolute",
          top: { md: "50%", xs: "10%" },
          left: { md: "50%", xs: "10%" },
          transform: {
            md: "translate(-50%, -50%)",
          },
          width: { md: "50%", xs: "80%" },
          bgcolor: "background.paper",
          borderRadius: "25px",
          p: 4,
          overflow: { sx: "scroll" },
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <Box textAlign="right">
          <IconButton onClick={handleClose}>
            <UilMultiply size="50" />
          </IconButton>
        </Box>
        <Box
          display="flex"
          alignItems="center"
          textAlign="center"
          sx={{
            width: { md: "55%", sm: "55%", xs: "100%" },
            mr: { md: "22.5%", sm: "22.5%", xs: 0 },
            ml: { md: "22.5%", sm: "22.5%", xs: 0 },
          }}
        >
          <Box component="img" width="100%" alt="manage imag" src={image} />
        </Box>
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="p"
          sx={{ mt: 2 }}
        >
          Address : {TextEdit(address)}
          <IconButton onClick={() => copyToClipboard(address)}>
            <UilCopy size="35" />
          </IconButton>
        </Typography>
        <Box
          textAlign="center"
          sx={{
            mt: 4,
            display: { xs: "flex" },
            justifyContent: "center",
            flexDirection: { xs: "column", md: "row" },
          }}
        >
          <Button
            variant="contained"
            color="success"
            sx={{ mr: { md: 2 }, mt: { xs: 2 } }}
          >
            <NavLink
              target="_blank"
              style={{ textDecoration: "none", color: "white" }}
              to={`/NFT/${address}`}
            >
              NFT manager
            </NavLink>
          </Button>
          <Button
            variant="contained"
            color="success"
            sx={{ mt: { xs: 2 } }}
            target="_blank"
            href={`https://sepolia.etherscan.io/address/${address}`}
          >
            etherscan
          </Button>{" "}
          <Button
            target="_blank"
            href={`http://remix.ethereum.org/#code=${sourseCode}`}
            variant="contained"
            color="success"
            sx={{ ml: { md: 2 }, mt: { xs: 2 } }}
          >
            Source Code
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default SucceedModal;
