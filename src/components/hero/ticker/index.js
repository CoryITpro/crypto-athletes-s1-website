import Button from "components/button"

const abbreviateAddress = (address) => {
  const walletAddress = address
  return walletAddress.slice(0, 6) + " ... " + walletAddress.slice(38)
}

const Ticker = ({
  maxSupply,
  soldOutCounts,
  walletAddress,
  onConnectWalletHandler,
}) => (
  <div className="hero-wallet-purchase flex">
    <div className="hero-wallet-purchase-ticker flex">
      <span>Total Minted</span>
      <span className="hero-wallet-purchase-ticker-counts">{`${soldOutCounts} / ${maxSupply}`}</span>
      {soldOutCounts === maxSupply ? (
        <p>
          Whee! All NFTs are soldout! To get Crypto Athletes, check the
          collection on Opensea
        </p>
      ) : walletAddress === "" ? (
        <p>Connect your wallet to buy Crypto Athletes</p>
      ) : (
        <p>Mint Your Own Crypto Athlete</p>
      )}
      {/* <p>
        <span>Pre-sale</span> soon, Join the discord for news!
      </p> */}
    </div>
    <Button
      to={
        soldOutCounts === maxSupply
          ? "https://opensea.io/collection/cryptoathletes"
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
    {/* <Button to={"https://discord.gg/wS2cKz8E"} children="Join the Discord" /> */}
  </div>
)

export default Ticker
