import Button from "components/button"
import { MAX_ELEMENT } from "configurations"

const abbreviateAddress = (address) => {
  const walletAddress = address
  return walletAddress.slice(0, 6) + " ... " + walletAddress.slice(38)
}

const Ticker = ({ soldOutCounts, walletAddress, onConnect }) => (
  <div className="hero-wallet-purchase flex">
    <div className="hero-wallet-purchase-ticker flex">
      <span>Total Minted</span>
      <span className="hero-wallet-purchase-ticker-counts">{`${soldOutCounts} / ${MAX_ELEMENT}`}</span>
      {soldOutCounts === MAX_ELEMENT ? (
        <p>
          Whee! All NFTs are soldout! To get Crypto Athletes, check the
          collection on Opensea
        </p>
      ) : walletAddress === "" ? (
        <p>Connect your wallet to buy Crypto Athletes</p>
      ) : (
        <p>Mint Your Own Crypto Athlete</p>
      )}
    </div>
    <Button
      to={
        soldOutCounts === MAX_ELEMENT
          ? "https://opensea.io/collection/Crypto_Athletes"
          : ""
      }
      children={
        soldOutCounts === MAX_ELEMENT
          ? "Go To Opensea"
          : walletAddress !== ""
          ? abbreviateAddress(walletAddress)
          : "Connect Metamask"
      }
      onClick={
        soldOutCounts !== MAX_ELEMENT && walletAddress === ""
          ? onConnect
          : () => {}
      }
    />
  </div>
)

export default Ticker
