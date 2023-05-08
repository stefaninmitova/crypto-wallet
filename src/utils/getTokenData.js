import Web3 from "web3";
import { ERC20_ABI } from "../contracts/ERC20_ABI";
import { DATA_SOURCE } from "../constants";

const web3 = new Web3(DATA_SOURCE);

export const getTokenData = async (tokenAddress, walletAddress) => {
  try {
    const contract = new web3.eth.Contract(ERC20_ABI, tokenAddress);

    const [name, symbol, decimals, balance, totalSupply] = await Promise.all([
      contract.methods.name().call(),
      contract.methods.symbol().call(),
      contract.methods.decimals().call(),
      contract.methods.balanceOf(walletAddress).call(),
      contract.methods.totalSupply().call(),
    ]);

    return {
      name,
      symbol,
      decimals,
      balance,
      totalSupply,
      address: tokenAddress,
    };
  } catch (e) {
    console.log(`Failed fetching token with address ${tokenAddress}`);
  }
};
