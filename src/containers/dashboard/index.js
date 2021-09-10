import { useState, useEffect } from "react"
import { useWeb3React } from "@web3-react/core"

import { injectedConnector } from "helpers/index"
import DashboardComponent from "components/dashboard"

const Dashboard = () => {
  const { active, account, library, connector, activate, deactivate } =
    useWeb3React()

  const [soldOutCounts, setSoldOutCounts] = useState(0)
  const [walletAddress, setWalletAddress] = useState("")

  useEffect(async () => {
    await onConnect()
  }, [])

  const onConnect = async () => {
    activate(injectedConnector)
      .then(() => {
        account && setWalletAddress(account)
      })
      .catch((event) => {
        console.log(event)
      })
  }

  return (
    <DashboardComponent
      soldOutCounts={soldOutCounts}
      walletAddress={walletAddress}
      onConnect={onConnect}
    />
  )
}

export default Dashboard
