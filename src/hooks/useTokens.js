import { useEffect, useMemo, useState } from "react";
import { getTokenData } from "../utils";
import { useSnackbar } from "../providers";
import { tokenAddresses } from "../tokens";

export const useTokens = (walletAddress, tokensList = tokenAddresses) => {
  const [tokens, setTokens] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { showError } = useSnackbar();

  useEffect(() => {
    if (walletAddress) {
      const getTokens = async () => {
        setIsLoading(true);
        try {
          const promises = tokensList.map((address) =>
            getTokenData(address, walletAddress)
          );
          const tokens = await Promise.all(promises);

          setTokens(tokens.filter((token) => token));
        } catch (e) {
          showError("Failed fetching tokens data.");
        }

        setIsLoading(false);
      };

      getTokens();
    }
  }, [walletAddress, tokensList]);

  const tokensWithoutBalance = useMemo(() => {
    return tokens?.filter((token) => token.balance !== "0");
  }, [tokens]);

  return { tokens, isLoading, tokensWithoutBalance };
};
