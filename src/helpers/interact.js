import { ethers } from "ethers"
import contractABI from "abis/CryptoAthletes.json"
import { ENVS } from "configurations/index"

const getContract = () => {
  const infuraProvider = new ethers.providers.Web3Provider(window.ethereum)
  const signer = infuraProvider.getSigner()

  const contract = new ethers.Contract(
    ENVS.CONTRACT_ADDRESS,
    contractABI.abi,
    signer
  )

  return contract
}

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

export const mintNFT = async (walletAddress, setMintLoading, randomIds) => {
  setMintLoading(true)

  console.log(walletAddress, randomIds)
  const contract = getContract()
  try {
    let txhash = await contract.mint(walletAddress, randomIds, {
      value: ethers.BigNumber.from(1e9).mul(
        ethers.BigNumber.from(1e9).mul(5).div(100).mul(randomIds.length)
      ),
      from: walletAddress,
    })
    console.log(txhash)
    let res = await txhash.wait()
    setMintLoading(false)

    if (res.transactionHash) {
      return {
        success: true,
        status: `Successfully minted ${randomIds.length} Crypty Athletes.`,
      }
    } else {
      return {
        success: false,
        status: "Transaction failed",
      }
    }
  } catch (err) {
    console.log(err.message)
    setMintLoading(false)
    return {
      success: false,
      status: "Transaction failed",
    }
  }
}

export const getTokenIdsOfWallet = async (walletAddress) => {
  const contract = getContract()
  let tokenIds = []

  try {
    let ids = await contract.getTokenIdsOfWallet(walletAddress)
    for (let i = 0; i < ids.length; i++) {
      tokenIds.push(ethers.BigNumber.from(ids[i]).toNumber())
    }

    return tokenIds
  } catch (err) {
    console.log("Get NFT Ids Fail:", err)
  }
}

export const getCurrentTotalSupply = async () => {
  const infuraProvider = new ethers.providers.InfuraProvider("rinkeby")

  const contract = new ethers.Contract(
    ENVS.CONTRACT_ADDRESS,
    contractABI.abi,
    infuraProvider
  )

  try {
    let totalSupply = await contract.totalSupply()

    return totalSupply
  } catch (err) {
    return 0
  }
}
