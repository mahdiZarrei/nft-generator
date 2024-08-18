import { Card, Avatar, Typography, CardContent } from "@mui/material";
import { UilWallet } from "@iconscout/react-unicons";

const Remained = ({balance}) => {
  return (
    <Card sx={{ height: 220, borderRadius: 5, mt: 5 }}>
      <CardContent>
        <Avatar sx={{ p: 0.5, bgcolor: `#fff176` }}>
          <UilWallet />
        </Avatar>
        <Typography variant="h5" mt={1}>
          Token Balance
        </Typography>
        <Typography variant="h5" mt={1} ml={2}>
          {balance.toString()}
        </Typography>
        <Typography mt={3} variant="body2">
          Your token balance
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Remained;
