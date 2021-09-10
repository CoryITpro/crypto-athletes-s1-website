import "./style.scss"

import Button from "components/button"
import Ticker from "./ticker"
import VIDEO from "resources/header.mp4"

const Hero = ({ soldOutCounts, walletAddress, onConnect }) => {
  return (
    <>
      <div className="hero flex flex-column">
        <video className="hero-video" autoPlay loop playsInline muted>
          <source src={VIDEO} type="video/mp4" />
        </video>
        <div className="hero-wallet flex flex-column">
          <Ticker
            soldOutCounts={soldOutCounts}
            walletAddress={walletAddress}
            onConnect={onConnect}
          />
        </div>
      </div>
      {walletAddress !== "" && (
        <div className="hero-congrats flex">
          {soldOutCounts === 10000 ? (
            "SOLD OUT | WOW !!!"
          ) : (
            <Button children="Mint 0.05ETH Crypto Athletes" />
          )}
        </div>
      )}
    </>
  )
}

export default Hero
