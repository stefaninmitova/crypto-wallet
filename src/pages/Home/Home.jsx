import { Box, Button, Typography, Container, Stack } from "@mui/material";
import { AccountDetails, TokensList } from "../../components/";
import { useWeb3ProvderContext } from "../../providers";
import { ETHEREUM_MAIN_CHAIN, wallets } from "../../constants";
import metamaskSVG from "../../assets/images/metamask.svg";
import {
  ButtonsContainer,
  MetaMaskButton,
  NetworkContainer,
} from "./Home.styled";

const Home = () => {
  const { account, currentChain, balance, handleConnect } =
    useWeb3ProvderContext();

  return (
    <Box margin="40px">
      {account ? (
        <Container maxWidth="md">
          <Stack gap="20px">
            {currentChain === ETHEREUM_MAIN_CHAIN ? (
              <NetworkContainer>
                <img
                  data-cfsrc="https://s1.coincarp.com/logo/1/ethereum.png?style=36"
                  src="https://s1.coincarp.com/logo/1/ethereum.png?style=36"
                  alt="Ethereum logo"
                />
                <Typography>Ethereum Mainnet</Typography>
              </NetworkContainer>
            ) : (
              currentChain
            )}
            <AccountDetails account={account} balance={balance} />
            <TokensList account={account} />
          </Stack>
        </Container>
      ) : (
        <>
          <Typography variant="h4" align="center">
            Connect to wallet:
          </Typography>
          <ButtonsContainer maxWidth="md">
            <MetaMaskButton onClick={() => handleConnect(wallets.metaMask)}>
              <img src={metamaskSVG} alt="" width="100%" />
            </MetaMaskButton>

            <Button onClick={() => handleConnect(wallets.coinbase)}>
              <img
                src="https://images.ctfassets.net/q5ulk4bp65r7/3TBS4oVkD1ghowTqVQJlqj/2dfd4ea3b623a7c0d8deb2ff445dee9e/Consumer_Wordmark.svg"
                width="100%"
                alt="Coinbase Logo"
              />
            </Button>
          </ButtonsContainer>
        </>
      )}
    </Box>
  );
};

export default Home;
