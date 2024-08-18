import { Card, Avatar, Typography, CardContent } from "@mui/material";
import { UilDollarSign } from "@iconscout/react-unicons";
import { separateNumber } from "../../../../utils/separateNumber";

const Supply = ({symbol}) => {
  return (
    <Card sx={{ height: 220, borderRadius: 7, mt: 5 }}>
      <CardContent>
        <Avatar sx={{ p: 0.5, bgcolor: `#ef5350` }}>S</Avatar>
        <Typography variant="h5" mt={1}>
          Symbol
        </Typography>
        <Typography variant="h5" mt={1} ml={2}>
          {symbol}
        </Typography>
        <Typography mt={3} variant="body2">
          Contract Symbol NFT
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Supply;
