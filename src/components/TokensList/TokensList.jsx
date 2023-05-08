import { useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Skeleton,
  Typography,
} from "@mui/material";
import { formatEther } from "ethers";
import { useLogos, useTokens } from "../../hooks";

const TokensList = ({ account }) => {
  const { tokens, tokensWithoutBalance, isLoading } = useTokens(account);
  const logos = useLogos();

  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (_e, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const loaders = Array.from(Array(6)).map((_item, i) => (
    <Skeleton key={`skeleton-${i}`} height="40px" />
  ));

  return isLoading ? (
    loaders
  ) : (
    <Grid container>
      {tokens?.length > 0 &&
        tokens?.map((token) => {
          return (
            <Accordion
              expanded={expanded === token?.address}
              onChange={handleChange(token?.address)}
              sx={{ width: "100%" }}
              key={`token-${token?.address}`}
            >
              <AccordionSummary id={`token-${token?.address}`}>
                <Typography sx={{ width: "50px", flexShrink: 0 }}>
                  <img src={logos[token?.address]} alt="" width="30px" />
                </Typography>
                <Typography sx={{ color: "text.secondary" }}>
                  {`${token?.name} (${token?.symbol})`}
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ width: "100%" }}>
                <Typography>
                  Token balance: {formatEther(token?.balance ?? 0)}{" "}
                  {token?.symbol}
                </Typography>
                <Typography>Decimals: {token?.decimals}</Typography>
                <Typography>
                  Total Supply:
                  {new Intl.NumberFormat("en-US").format(token?.totalSupply)}
                </Typography>
                <Typography>Contract address: {token?.address}</Typography>
              </AccordionDetails>
            </Accordion>
          );
        })}
    </Grid>
  );
};

export default TokensList;
