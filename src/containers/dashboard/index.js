import { useState, useEffect } from "react"
import axios from "axios"

import { mintNFT } from "helpers/interact"
import {
  getTokenIdsOfWallet,
  getCurrentTotalSupply,
  getCurrentMaxSupply,
  getCurrentMaxMint,
} from "helpers/contract"
import { connectWallet, getCurrentWalletConnected } from "helpers/wallet"

import DashboardComponent from "components/dashboard"

const Dashboard = () => {
  const [walletAddress, setWalletAddress] = useState("")
  const [soldOutCounts, setSoldOutCounts] = useState(0)
  const [maxSupply, setMaxSupply] = useState(0)
  const [maxMint, setMaxMint] = useState(0)

  const [status, setStatus] = useState("")
  const [error, setError] = useState("")

  const [newMint, setNewMint] = useState([])
  const [mintCount, setMintCount] = useState(1)
  const [mintLoading, setMintLoading] = useState(false)

  const [metadatas, setMetadatas] = useState([])

  const [collapseExpanded, setCollapseExpanded] = useState(false)

  useEffect(() => {
    const initDatas = async () => {
      const { address, status } = await getCurrentWalletConnected()

      setWalletAddress(address)
      setStatus(status)

      onChangeWalletListener()
      onConnectWalletHandler()

      let totalSupply = await getCurrentTotalSupply()
      setSoldOutCounts(totalSupply)

      let maxSupply = await getCurrentMaxSupply()
      setMaxSupply(maxSupply)

      let maxMint = await getCurrentMaxMint()
      setMaxMint(maxMint)
    }

    initDatas()

    window.addEventListener("resize", getWindowWidth)
    return () => window.removeEventListener("resize", getWindowWidth)
  }, [])

  // Fetch CA Ids of the Wallet
  useEffect(() => {
    const getIdsFromWallet = async () => {
      if (!!walletAddress) {
        let tokenIdsOfWallet = await getTokenIdsOfWallet(walletAddress)

        fetchMetaDatas(tokenIdsOfWallet)
      }
    }

    getIdsFromWallet()
  }, [walletAddress])

  useEffect(() => {
    const getSoldOuts = async () => {
      let totalSupply = await getCurrentTotalSupply()

      setSoldOutCounts(totalSupply)

      if (newMint[0] && newMint[0].toLowerCase() === walletAddress) {
        let tokenIdsOfWallet = await getTokenIdsOfWallet(walletAddress)

        fetchMetaDatas(tokenIdsOfWallet)
      }
    }

    getSoldOuts()
  }, [newMint])

  // When the width of the website exceeds 1024px, hide sidebar
  const getWindowWidth = () => {
    const { innerWidth: width } = window
    if (width > 1024) {
      setCollapseExpanded(false)
    }
  }

  const onCollapseExpandHandler = () => {
    setCollapseExpanded(!collapseExpanded)
  }

  const onAlertClickHandler = () => {
    setError("")
  }

  const onConnectWalletHandler = async () => {
    const walletResponse = await connectWallet()

    setStatus(walletResponse.status)
    setWalletAddress(walletResponse.address)
  }

  const onChangeWalletListener = () => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length) {
          setWalletAddress(accounts[0])
          setStatus("Get your CryptoAthletes pack, 0.05ETH")
        } else {
          setWalletAddress("")
          setStatus("Connect Metamask")
        }
      })

      window.ethereum.on("chainChanged", (chainId) => {
        onConnectWalletHandler()
      })
    } else {
      setStatus(
        <p>
          🦊 You must install Metamask, a virtual Ethereum wallet, in your
          browser.(https://metamask.io/download.html)
        </p>
      )
    }
  }

  const fetchMetaDatas = async (ids) => {
    let metadatas = []

    for (let i = 0; i < ids.length; i++) {
      await axios
        .get(
          `https://gateway.pinata.cloud/ipfs/Qmd3cb8TsvPWFJuyyKD3KYjn7Sh7Ht8q3CUvsZtPz7n9Qw/CAhooper${ids[i]}.json`
        )
        .then((response) => {
          metadatas.push(response.data)
        })
        .catch((err) => {
          console.log(err)
        })
    }

    setMetadatas(metadatas)
  }

  const onMintCountChangeHandler = (e) => {
    let value =
      e.target.value > maxMint
        ? maxMint
        : e.target.value < 1
        ? 1
        : e.target.value

    console.log(value)
    setMintCount(value)
  }

  const getRandomIds = () => {
    let customIds = []
    const max = maxSupply - soldOutCounts

    for (let i = 0; i < mintCount; i++) {
      customIds.push(Math.floor(Math.random() * max))
    }

    return customIds
  }

  const onMintHandler = async () => {
    if (!!walletAddress) {
      const randomIds = getRandomIds()

      await mintNFT(walletAddress, setMintLoading, setNewMint, randomIds)
    }
  }

  return (
    <DashboardComponent
      error={error}
      maxMint={maxMint}
      mintCount={mintCount}
      metadatas={metadatas}
      maxSupply={maxSupply}
      mintLoading={mintLoading}
      walletAddress={walletAddress}
      soldOutCounts={soldOutCounts}
      collapseExpanded={collapseExpanded}
      onMintHandler={onMintHandler}
      onConnectWalletHandler={onConnectWalletHandler}
      onMintCountChangeHandler={onMintCountChangeHandler}
      onCollapseExpandHandler={onCollapseExpandHandler}
      onAlertClickHandler={onAlertClickHandler}
    />
  )
}

export default Dashboard
