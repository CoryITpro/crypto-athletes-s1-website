import { pinJSONToIPFS, pinFileToIPFS, removePinFromIPFS } from "./pinata"
import { ethers } from "ethers"
import axios from "axios"

import itemMetadata from "constants/item-meta.json"
import contractABI from "constants/contract-abi.json"

import { Envs } from "configurations"

export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const walletChainId = await window.ethereum.request({
        method: "eth_chainId",
      })

      if (parseInt(walletChainId) === parseInt(Envs.CHAIN_ID)) {
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
          params: [{ chainId: Envs.CHAIN_ID }],
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
    return {
      address: "",
      status: (
        <span>
          <p>
            🦊 You must install Metamask, a virtual Ethereum wallet, in your
            browser.(https://metamask.io/download.html)
          </p>
        </span>
      ),
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
      if (addressArray.length && walletChainId === Envs.CHAIN_ID) {
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
    return {
      address: "",
      status: (
        <span>
          <p>
            🦊 You must install Metamask, a virtual Ethereum wallet, in your
            browser.(https://metamask.io/download.html)
          </p>
        </span>
      ),
    }
  }
}

export const mintNFT = async (walletAddress) => {
  const infuraProvider = new ethers.providers.InfuraProvider("kovan")
  const contract = new ethers.Contract(
    Envs.CONTRACT_ADDRESS,
    contractABI,
    infuraProvider
  )

  const clanNumber = Math.floor(Math.random() * itemMetadata.count.set)
  const metaData = itemMetadata.set[clanNumber]
  metaData.name = metaData.name + Date.now() // name + timestamp
  const pinataResponseClan = await pinJSONToIPFS(metaData)

  if (!pinataResponseClan.success) {
    return {
      success: false,
      status: "😢 Something went wrong while uploading your tokenURI.",
    }
  }

  const tokenURI = pinataResponseClan.pinataUrl
  const ABI = ["function mintPack(string memory tokenURI)"]
  const interFace = new ethers.utils.Interface(ABI)
  const dataParam = interFace.encodeFunctionData("mintPack", [tokenURI])

  const transactionParameters = {
    to: Envs.CONTRACT_ADDRESS,
    from: walletAddress,
    data: dataParam,
  }

  try {
    const txHash = window.ethereum
      .request({
        method: "eth_sendTransaction",
        params: [transactionParameters],
      })
      .then(async (data) => {
        console.log("Pack pending:", data)
        contract.on("MintPack(address, uint256)", async (to, newId) => {
          if (to === ethers.utils.getAddress(walletAddress)) {
            const tokenId = ethers.BigNumber.from(newId).toNumber()

            return {
              success: true,
              tokenId,
            }
          }
        })
      })
      .catch(async (err) => {
        await removePinFromIPFS(tokenURI)
      })
  } catch (err) {
    return {
      success: false,
      status: `😥 Something went wrong: ${err.message}`,
    }
  }
}

export const getMetaList = async (walletAddress, tokenIds = []) => {
  if (!walletAddress) {
    return []
  }

  const infuraProvider = new ethers.providers.InfuraProvider("kovan")
  const contract = new ethers.Contract(
    Envs.CONTRACT_ADDRESS,
    contractABI,
    infuraProvider
  )

  if (!tokenIds.length) {
    try {
      tokenIds = await contract.tokenIdsOfAccount(walletAddress)
    } catch (err) {
      console.log("Network error:", err)
    }
  }

  let metaList = []
  const metas = await Promise.all(
    tokenIds.map(async (tokenId, index) => {
      let res = null

      try {
        res = await contract.tokenURI(Number(tokenId))
      } catch (err) {
        console.log("Network error:", err)
      }

      if (res) {
        let response = null

        try {
          response = await axios.get(`https://${res}`)
        } catch (err) {
          console.log("Fetch error:", err)
        }

        if (response) {
          try {
            let resJson = response.data
            resJson["id"] = ethers.BigNumber.from(tokenId).toNumber()
            metaList.push(resJson)
          } catch (err) {
            console.log("Error:", err)
          }
        }
      }
    })
  ).then(() => {
    return metaList
  })

  return metas
}

export const uploadImage = async () => {
  const reader = new FileReader()

  reader.onloadend = () => {
    console.log(reader.result)
  }

  const res = await pinFileToIPFS("nft.png")
  console.log(res)
}
