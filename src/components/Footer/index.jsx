import { Box, IconButton, Typography } from "@mui/material";
import React from "react";
import { useWeb3Modal } from "@web3modal/ethers/react";
import {
  UilLinkedin,
  UilInstagram,
  UilTelegram,
  UilWallet,
} from "@iconscout/react-unicons";
import { useTheme } from "@emotion/react";

import { copyToClipboard } from "../../utils";

const Footer = () => {
  const theme = useTheme();
  return (
    <>
      <Box
        sx={{
          m: "auto",
          mt: "1%",
        }}
      >
        <Box
          component="a"
          target="_blank"
          href="#"
          sx={{
            display: "flex",
            flexDirection: "column",
            pt: "4vh",
          }}
        ></Box>
        <Box sx={{ textAlign: "center", mt: "1vh", pb: "2vh" }}>
          <IconButton sx={{ mr: "2.5vw" }} target="_blank" href="#">
            <UilLinkedin
              color={theme.palette.mode === "dark" ? "#1976d2" : "#0d47a1"}
              size="3vw"
            />
          </IconButton>
          <IconButton sx={{ mr: "1.25vw" }}>
            <UilInstagram
              color={theme.palette.mode === "dark" ? "#1976d2" : "#0d47a1"}
              size="3vw"
            />
          </IconButton>

          <IconButton sx={{ ml: "1.25vw" }} target="_blank" href="#">
            <UilTelegram
              color={theme.palette.mode === "dark" ? "#1976d2" : "#0d47a1"}
              size="3vw"
            />
          </IconButton>
          <IconButton
            sx={{ ml: "2.5vw" }}
            onClick={() =>
              copyToClipboard("0x8dedDf9068B594310b8914079CA41CE1cb5Bf6D0")
            }
          >
            <UilWallet
              color={theme.palette.mode === "dark" ? "#1976d2" : "#0d47a1"}
              size="3vw"
            />
          </IconButton>
        </Box>
      </Box>
    </>
  );
};

export default Footer;
