import { Box, Typography, useTheme } from "@mui/material";

const CreateTokenShow = ({ file, HaveImg }) => {
  const theme = useTheme();
  return (
    <>
      <Box
        width={"48%"}
        textAlign={"center"}
        borderRight={`3px solid ${
          theme.palette.mode === "dark" ? "" : "#313552"
        }`}
        display={file === "" ? "none" : "block"}
      >
        {HaveImg ? (
          <Box component="img" width="70%" mt={"15%"} src={file} />
        ) : (
          <Typography gutterBottom variant="h6" mt={"15%"} component="div">
            ( {file} )
          </Typography>
        )}
      </Box>
    </>
  );
};

export default CreateTokenShow;
