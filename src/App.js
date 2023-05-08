import { AppBar, Toolbar } from "@mui/material";
import "./App.css";
import Home from "./pages/Home/Home";
import { SnackbarProvider, Web3Provider } from "./providers";
import logo from "./assets/images/logo.svg";

function App() {
  return (
    <>
      <AppBar position="sticky" role="navigation">
        <Toolbar>
          <img src={logo} alt="Nexo logo" color="white" />
        </Toolbar>
      </AppBar>
      <SnackbarProvider>
        <Web3Provider>
          <Home />
        </Web3Provider>
      </SnackbarProvider>
    </>
  );
}

export default App;
