import "./style.scss"

import Button from "components/button"
import { MAX_ELEMENT } from "configurations"

const generateNFTDatas = (metadatas) =>
  metadatas.map((data, index) => {
    console.log(data)

    return (
      <div key={index} className="minter-gallery-show-item flex flex-column">
        <img src={data.image} alt="nft" />
        <div className="minter-gallery-show-item-info flex felx-column">
          <p className="name">{data.name}</p>
        </div>
      </div>
    )
  })

const Minter = ({
  onMint,
  mintLoading,
  soldOutCounts,
  walletAddress,
  metadatas,
}) => (
  <div className="minter">
    {walletAddress !== "" && (
      <>
        <div className="minter-wrapper flex">
          {soldOutCounts === MAX_ELEMENT ? (
            "SOLD OUT | WOW !!!"
          ) : (
            <Button
              children="Mint 0.05ETH Crypto Athletes"
              onClick={onMint}
              mintLoading={mintLoading}
            />
          )}
        </div>
        <div className="minter-gallery flex flex-column">
          <span>Your Gallery</span>
          <div className="minter-gallery-show flex">
            {generateNFTDatas(metadatas)}
          </div>
        </div>
      </>
    )}
  </div>
)

export default Minter
