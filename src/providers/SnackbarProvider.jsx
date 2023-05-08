import { Alert, Snackbar } from "@mui/material";
import React, { createContext, useContext, useState } from "react";

const SnackbarContext = createContext({ showError: {} });

export const SnackbarProvider = ({ children }) => {
  const [errorMessage, setErrorMessage] = useState(null);

  const handleCloseError = () => {
    setErrorMessage(false);
  };

  return (
    <SnackbarContext.Provider
      value={{
        showError: setErrorMessage,
      }}
    >
      {children}

      <Snackbar
        open={!!errorMessage}
        autoHideDuration={10000}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        onClose={handleCloseError}
      >
        <Alert
          severity="error"
          sx={{ width: "100%" }}
          onClose={handleCloseError}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => useContext(SnackbarContext);
