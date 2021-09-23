import { useState, useEffect } from "react"
import DashboardComponent from "components/dashboard"
import axios from "axios"
import { MAX_ELEMENT } from "configurations"

import {
  connectWallet,
  getCurrentWalletConnected,
  mintNFT,
  getTokenIdsOfWallet,
  getCurrentTotalSupply,
} from "helpers/interact"

const Dashboard = () => {
  const [walletAddress, setWalletAddress] = useState("")
  const [soldOutCounts, setSoldOutCounts] = useState(0)

  const [status, setStatus] = useState("")
  const [error, setError] = useState("")

  const [newMint, setNewMint] = useState([])
  const [mintCount, setMintCount] = useState(1)
  const [mintLoading, setMintLoading] = useState(false)

  const [metadatas, setMetadatas] = useState([])

  const [collapseExpanded, setCollapseExpanded] = useState(false)

  useEffect(async () => {
    const { address, status } = await getCurrentWalletConnected()

    setWalletAddress(address)
    setStatus(status)

    onChangeWalletListener()
    onConnectWallet()

    let totalSupply = await getCurrentTotalSupply()
    setSoldOutCounts(totalSupply)

    window.addEventListener("resize", getWindowWidth)
    return () => window.removeEventListener("resize", getWindowWidth)
  }, [])

  // Fetch CA Ids of the Wallet
  useEffect(async () => {
    if (!!walletAddress) {
      let tokenIdsOfWallet = await getTokenIdsOfWallet(walletAddress)

      fetchMetaDatas(tokenIdsOfWallet)
    }
  }, [walletAddress])

  useEffect(async () => {
    if (newMint.length) {
      let totalSupply = await getCurrentTotalSupply()
      setSoldOutCounts(totalSupply)
    }
  }, [newMint])

  // When the width of the website exceeds 1024px, hide sidebar
  const getWindowWidth = () => {
    const { innerWidth: width } = window
    if (width > 1024) {
      setCollapseExpanded(false)
    }
  }

  const onClickExpand = () => {
    setCollapseExpanded(!collapseExpanded)
  }

  const onAlertClickHandler = () => {
    setError("")
  }

  const onConnectWallet = async () => {
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
        onConnectWallet()
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
      e.target.value > 20 ? 20 : e.target.value < 1 ? 1 : e.target.value

    setMintCount(value)
  }

  const getRandomIds = () => {
    let customIds = []
    const max = MAX_ELEMENT - soldOutCounts

    for (let i = 0; i < mintCount; i++) {
      customIds.push(Math.floor(Math.random() * max))
    }

    return customIds
  }

  const onMintHandler = async () => {
    if (!!walletAddress) {
      const randomIds = getRandomIds()

      await mintNFT(walletAddress, setMintLoading, randomIds)
    }
  }

  return (
    <DashboardComponent
      soldOutCounts={soldOutCounts}
      walletAddress={walletAddress}
      metadatas={metadatas}
      mintLoading={mintLoading}
      onConnect={onConnectWallet}
      onMint={onMintHandler}
      onMintCountChangeHandler={onMintCountChangeHandler}
      mintCount={mintCount}
      onClickExpand={onClickExpand}
      expanded={collapseExpanded}
      error={error}
      onAlertClickHandler={onAlertClickHandler}
    />
  )
}

export default Dashboard
