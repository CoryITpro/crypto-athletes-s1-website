import { ENVS } from "configurations/index"

export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const walletChainId = await window.ethereum.request({
        method: "eth_chainId",
      })

      if (parseInt(walletChainId) === parseInt(ENVS.CHAIN_ID)) {
        const addressArray = await window.ethereum.request({
          method: "eth_requestAccounts",
        })

        if (addressArray.length) {
          return {
            address: addressArray[0],
            status: "Connected",
          }
        } else {
          return {
            address: "",
            status: "No wallet connected",
          }
        }
      } else {
        window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: ENVS.CHAIN_ID }],
        })

        return {
          address: "",
          status: "Was on the other chain",
        }
      }
    } catch (err) {
      return {
        address: "",
        status: `😥 ${err.message}`,
      }
    }
  } else {
    console.log(`🦊 You must install Metamask, a virtual Ethereum wallet, in your
            browser.(https://metamask.io/download.html)`)
    return {
      address: "",
      status: "Can't find web3 provider",
    }
  }
}

export const getCurrentWalletConnected = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_accounts",
      })
      const walletChainId = await window.ethereum.request({
        method: "eth_chainId",
      })
      if (addressArray.length && walletChainId === ENVS.CHAIN_ID) {
        return {
          address: addressArray[0],
          status: "Get your CryptoAthletes pack, 0.05ETH",
        }
      } else {
        return {
          address: "",
          status: "Connect Metamask",
        }
      }
    } catch (err) {
      return {
        address: "",
        status: `😥 ${err.message}`,
      }
    }
  } else {
    console.log(`🦊 You must install Metamask, a virtual Ethereum wallet, in your
            browser.(https://metamask.io/download.html)`)
    return {
      address: "",
      status: "Can't find web3 provider",
    }
  }
}
