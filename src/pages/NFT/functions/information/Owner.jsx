import { Card, Avatar, Typography, CardContent } from "@mui/material";
import { shortAddress } from "../../../../helper/displayAddress";

const Remained = ({owner}) => {
  return (
    <Card sx={{ height: 220, borderRadius: 5, mt: 5 }}>
      <CardContent>
        <Avatar sx={{ p: 0.5, bgcolor: `green` }}>O</Avatar>
        <Typography variant="h5" mt={1}>
          Owner
        </Typography>
        <Typography variant="h5" mt={1} ml={2}>
          {shortAddress(owner.toString())}
        </Typography>
        <Typography mt={3} variant="body2">
          Owner contract
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Remained;
