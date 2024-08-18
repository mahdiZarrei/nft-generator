import { Card, Avatar, Typography, CardContent } from "@mui/material";
const Holders = ({name}) => {
  return (
    <Card sx={{ height: 220, borderRadius: 5 }}>
      <CardContent>
        <Avatar sx={{ p: 0.5, bgcolor: `#3f51b5` }}>N</Avatar>
        <Typography variant="h4" mt={1}>
          Name
        </Typography>
        <Typography variant="h5" mt={1} ml={2}>
          {name}
        </Typography>
        <Typography mt={2} variant="body2">
          Contract name NFT
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Holders;
