import { Box, Button, Grid } from "@mui/material";
import { styled } from "styled-components";

export const ButtonsContainer = styled(Grid)`
  display: flex;
  justify-content: center;
  margin: 80px auto;
  gap: 20px;

  @media (max-width: 768px) {
    margin: 40px auto;
    flex-wrap: wrap;
    gap: 40px;
  }
`;

export const MetaMaskButton = styled(Button)`
  width: 400px;
`;

export const NetworkContainer = styled(Box)`
  text-align: center;
  margin-top: 20px;

  img {
    width: 20px;
    height: 20px;
  }
`;
