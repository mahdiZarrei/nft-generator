import { UilMultiply, UilCopy } from "@iconscout/react-unicons";
import { Box, IconButton, Modal, Typography } from "@mui/material";

import image from "./modalImage.png";
import { TextEdit, copyToClipboard } from "../../../../utils/index";

const SucceedModal = ({ onChange, open, IPFSURl, TokenID }) => {
    const handleClose = () => {
        onChange(false);
    };
    return (
        <Modal open={open} onClose={handleClose} sx={{ overflow: "scroll" }}>
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
                }}>
                <Box textAlign='right'>
                    <IconButton onClick={handleClose}>
                        <UilMultiply Size='50' />
                    </IconButton>
                </Box>
                <Box
                    display='flex'
                    alignItems='center'
                    textAlign='center'
                    sx={{
                        width: { md: "55%", sm: "55%", xs: "100%" },
                        mr: { md: "22.5%", sm: "22.5%", xs: 0 },
                        ml: { md: "22.5%", sm: "22.5%", xs: 0 },
                    }}>
                    <Box
                        component='img'
                        width='100%'
                        alt='manage imag'
                        src={image}
                    />
                </Box>
                <Typography variant='h6' component='p' sx={{ mt: 2 }}>
                    IPFS URl : {TextEdit(IPFSURl)}
                    <IconButton onClick={() => copyToClipboard(IPFSURl)}>
                        <UilCopy size='35' />
                    </IconButton>
                </Typography>{" "}
                <Typography variant='h6' component='p' sx={{ mt: 2 }}>
                    TokenID : {TokenID}
                    <IconButton onClick={() => copyToClipboard(TokenID)}>
                        <UilCopy size='35' />
                    </IconButton>
                </Typography>
            </Box>
        </Modal>
    );
};

export default SucceedModal;
