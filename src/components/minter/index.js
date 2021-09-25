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
  maxMint,
  mintCount,
  metadatas,
  maxSupply,
  mintLoading,
  soldOutCounts,
  walletAddress,
  onMintHandler,
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
                max={maxMint}
                defaultValue={mintCount}
                onChange={onMintCountChangeHandler}
              />
              <Button
                children="Mint 0.05ETH Crypto Athletes"
                mintLoading={mintLoading}
                onMintHandler={onMintHandler}
                onClick={() => {
                  if (!mintLoading) {
                    return onMintHandler()
                  }
                }}
              />
            </>
          )}
        </div>
        {metadatas.length !== 0 && (
          <div className="minter-gallery flex flex-column">
            <span>Your Gallery</span>
            <div className="minter-gallery-show flex">
              {generateNFTDatas(metadatas)}
            </div>
          </div>
        )}
      </>
    )}
  </div>
)

export default Minter
