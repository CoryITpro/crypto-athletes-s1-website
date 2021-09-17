import "./style.scss"

import Button from "components/button"
import Ticker from "./ticker"
import BANNER from "resources/Banner_Image.png"

const Hero = ({ soldOutCounts, walletAddress, onConnect }) => {
  return (
    <>
      <div className="hero flex flex-column">
        <img src={BANNER} alt="banner" />
        <div className="hero-wallet flex flex-column">
          <Ticker
            soldOutCounts={soldOutCounts}
            walletAddress={walletAddress}
            onConnect={onConnect}
          />
        </div>
      </div>
    </>
  )
}

export default Hero
