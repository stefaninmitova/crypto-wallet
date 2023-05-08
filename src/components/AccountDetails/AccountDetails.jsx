import { Avatar, Typography } from "@mui/material";
import { AccountDetailsCard } from "./AccountDetails.styled";

const AccountDetails = ({ account, balance }) => {
  return (
    <>
      <AccountDetailsCard>
        <Avatar alt="" src="" />
        <Typography>{account}</Typography>
      </AccountDetailsCard>
      <AccountDetailsCard>
        <div>
          Balance:
          <Typography s sx={{ color: "green" }}>
            {balance} ETH
          </Typography>
        </div>
      </AccountDetailsCard>
    </>
  );
};

export default AccountDetails;
