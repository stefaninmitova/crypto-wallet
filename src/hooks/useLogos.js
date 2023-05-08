import axios from "axios";
import { useEffect, useState } from "react";
import { TOKENS_METADATA_SOURCE } from "../constants";
import { useSnackbar } from "../providers";
import { tokenAddresses } from "../tokens";

export const useLogos = (tokensList = tokenAddresses) => {
  const [logos, setLogos] = useState(null);

  const { showError } = useSnackbar();

  useEffect(() => {
    const getTokensLogos = async () => {
      try {
        const tokensMetadata = await axios.get(TOKENS_METADATA_SOURCE);
        const tokenLogos = tokensMetadata.data.tokens.reduce((prev, token) => {
          if (tokenAddresses.includes(token.address)) {
            prev[token.address] = token.logoURI;
          }

          return prev;
        }, {});

        setLogos(tokenLogos);
      } catch (e) {
        showError("Failed fetching tokens data.");
      }
    };

    getTokensLogos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokensList]);

  return logos;
};
