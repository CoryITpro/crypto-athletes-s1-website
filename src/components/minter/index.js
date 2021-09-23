import "./style.scss"

import Button from "components/button"

const generateNFTDatas = (metadatas) => {
  return metadatas.map((data, index) => {
    return (
      <div key={index} className="minter-gallery-show-item flex flex-column">
        <img src={data.image || ""} alt="nft" />
        <div className="minter-gallery-show-item-info flex felx-column">
          <p className="name">{data.name}</p>
        </div>
      </div>
    )
  })
}

const Minter = ({
  onMint,
  mintCount,
  metadatas,
  maxSupply,
  mintLoading,
  soldOutCounts,
  walletAddress,
  onMintCountChangeHandler,
}) => (
  <div className="minter">
    {walletAddress !== "" && (
      <>
        <div className="minter-wrapper flex">
          {soldOutCounts === maxSupply ? (
            "SOLD OUT | WOW !!!"
          ) : (
            <>
              <input
                type="number"
                min={1}
                max={mintCount}
                defaultValue={mintCount}
                onChange={onMintCountChangeHandler}
              />
              <Button
                children="Mint 0.05ETH Crypto Athletes"
                onClick={onMint}
                mintLoading={mintLoading}
              />
            </>
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
