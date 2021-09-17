import "./style.scss"

import Button from "components/button"

const Minter = ({ soldOutCounts, walletAddress }) => (
  <div className="minter">
    {walletAddress !== "" && (
      <>
        <div className="minter-wrapper flex">
          {soldOutCounts === 10000 ? (
            "SOLD OUT | WOW !!!"
          ) : (
            <Button children="Mint 0.05ETH Crypto Athletes" />
          )}
        </div>
        <div className="minter-gallery flex flex-column">
          <span>Your Gallery</span>
          <div className="minter-gallery-show flex">{}</div>
        </div>
      </>
    )}
  </div>
)

export default Minter
