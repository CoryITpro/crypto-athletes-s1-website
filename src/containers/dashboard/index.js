import { useState, useEffect } from "react"
import DashboardComponent from "components/dashboard"

import {
  connectWallet,
  getCurrentWalletConnected,
  getMetaList,
  mintNFT,
} from "helpers/interact"

const Dashboard = () => {
  const [walletAddress, setWalletAddress] = useState("")
  const [soldOutCounts, setSoldOutCounts] = useState(0)

  const [status, setStatus] = useState("")
  const [mintLoading, setMintLoading] = useState(false)
  const [metaData, setMetaData] = useState([])
  const [newMint, setNewMint] = useState([])

  const [collapseExpanded, setCollapseExpanded] = useState(false)
  const [error, setError] = useState("")

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

  useEffect(async () => {
    const { address, status } = await getCurrentWalletConnected()

    setWalletAddress(address)
    setStatus(status)

    onChangeWalletListener()
    onConnectWallet()

    window.addEventListener("resize", getWindowWidth)
    return () => window.removeEventListener("resize", getWindowWidth)
  }, [])

  useEffect(async () => {
    if (!!walletAddress) {
      const meta = await getMetaList(walletAddress)

      setMetaData(meta)
    }
  }, [walletAddress])

  useEffect(async () => {
    if (newMint.length) {
      const newMeta = await getMetaList(walletAddress, newMint)
      setMetaData(metaData.concat(newMeta))
    }
  }, [newMint])

  const onMintHandler = async () => {
    setMintLoading(true)

    const { success, status } = await mintNFT(walletAddress)

    setStatus(status)

    setMintLoading(false)
  }

  return (
    <DashboardComponent
      soldOutCounts={soldOutCounts}
      walletAddress={walletAddress}
      onConnect={onConnectWallet}
      onMint={onMintHandler}
      onClickExpand={onClickExpand}
      expanded={collapseExpanded}
      error={error}
      onAlertClickHandler={onAlertClickHandler}
    />
  )
}

export default Dashboard
