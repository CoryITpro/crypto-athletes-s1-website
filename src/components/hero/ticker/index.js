import { useState, useEffect } from "react"
import Button from "components/button"
import { calculateTimeLeft } from "helpers/timer"

const abbreviateAddress = (address) => {
  const walletAddress = address
  return walletAddress.slice(0, 6) + " ... " + walletAddress.slice(38)
}

const Ticker = ({
  maxSupply,
  soldOutCounts,
  walletAddress,
  onConnectWalletHandler,
}) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearTimeout(timer)
  }, [timeLeft])

  return (
    <div className="hero-wallet-purchase flex">
      <div className="hero-wallet-purchase-ticker flex">
        {Object.keys(timeLeft).length === 0 ? (
          <>
            <span>Sold Out!</span>
            {/* <span>Total Minted</span> */}
            {/* <span className="hero-wallet-purchase-ticker-counts">{`${soldOutCounts} / ${maxSupply}`}</span> */}
            {/* {maxSupply === 0 ? (
              <p className="warning">Metamask has not installed</p>
            ) : soldOutCounts === maxSupply ? (
              <p>
                SOLD OUT! To get Crypto Athletes, check the collection on
                Opensea
              </p>
            ) : walletAddress === "" ? (
              <p>Connect your wallet to buy Crypto Athletes</p>
            ) : (
              <p>Mint Your Own Crypto Athlete</p>
            )} */}
          </>
        ) : (
          <span>
            <span>Public Sale</span> soon, Join the discord for news!
          </span>
        )}
      </div>
      <Button
        to="https://opensea.io/collection/cryptoathleteshoopers"
        children="Go To Opensea"
      />
      {/* {Object.keys(timeLeft).length === 0 ? (
        maxSupply === 0 ? (
          <Button to={"https://metamask.io/"} children="Install Metamask" />
        ) : (
          <Button
            to={
              soldOutCounts === maxSupply
                ? "https://opensea.io/collection/cryptoathleteshoopers"
                : ""
            }
            children={
              soldOutCounts === maxSupply
                ? "Go To Opensea"
                : walletAddress !== ""
                ? abbreviateAddress(walletAddress)
                : "Connect Metamask"
            }
            onClick={
              soldOutCounts !== maxSupply && walletAddress === ""
                ? onConnectWalletHandler
                : () => {}
            }
          />
        )
      ) : (
        <Button
          to={"https://discord.gg/wS2cKz8E"}
          children="Join the Discord"
        />
      )} */}
    </div>
  )
}

export default Ticker
