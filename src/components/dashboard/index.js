import { Link } from "react-scroll"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTimes } from "@fortawesome/free-solid-svg-icons"
import "./style.scss"

import Navbar from "components/navbar"
import Hero from "components/hero"
import Minter from "components/minter"
import Learn from "components/learn"
import Rarity from "components/rarity"
import FuturePlans from "components/future"
import Roadmap from "components/roadmap"
import FAQ from "components/faq"
import Footer from "components/footer"

import Alert from "components/alert"

const Dashboard = ({
  error,
  metadatas,
  maxSupply,
  mintCount,
  mintLoading,
  walletAddress,
  soldOutCounts,
  collapseExpanded,
  onMintHandler,
  onAlertClickHandler,
  onConnectWalletHandler,
  onCollapseExpandHandler,
  onMintCountChangeHandler,
}) => (
  <div className="dashboard">
    <Alert error={error} onClickHandler={onAlertClickHandler} />
    <div
      className={`dashboard-expand-menu flex flex-column${
        collapseExpanded ? " expanded" : ""
      }`}
      onClick={onCollapseExpandHandler}
    >
      <div className="dashboard-expand-menu-close">
        <FontAwesomeIcon icon={faTimes} />
      </div>
      <Link
        className="navbar-anchor-link"
        activeClass="active"
        to={"learn"}
        spy={true}
        smooth={true}
        offset={0}
        duration={500}
        onClick={onCollapseExpandHandler}
      >
        Learn
      </Link>
      <Link
        className="navbar-anchor-link"
        activeClass="active"
        to={"rarity"}
        spy={true}
        smooth={true}
        offset={50}
        duration={500}
        onClick={onCollapseExpandHandler}
      >
        Rarity
      </Link>
      <Link
        className="navbar-anchor-link"
        activeClass="active"
        to={"roadmap"}
        spy={true}
        smooth={true}
        offset={0}
        duration={500}
        onClick={onCollapseExpandHandler}
      >
        Roadmap
      </Link>
      <Link
        className="navbar-anchor-link"
        activeClass="active"
        to={"faqs"}
        spy={true}
        smooth={true}
        offset={50}
        duration={500}
        onClick={onCollapseExpandHandler}
      >
        FAQs
      </Link>
    </div>
    <div className="dashboard-hero-wrapper">
      <Navbar onClickExpand={onCollapseExpandHandler} />
      <Hero
        maxSupply={maxSupply}
        soldOutCounts={soldOutCounts}
        walletAddress={walletAddress}
        onConnectWalletHandler={onConnectWalletHandler}
      />
    </div>
    <Minter
      mintCount={mintCount}
      metadatas={metadatas}
      maxSupply={maxSupply}
      mintLoading={mintLoading}
      soldOutCounts={soldOutCounts}
      walletAddress={walletAddress}
      onMintHandler={onMintHandler}
      onMintCountChangeHandler={onMintCountChangeHandler}
    />
    <Learn />
    <Rarity />
    <FuturePlans />
    <Roadmap />
    <FAQ />
    <Footer />
  </div>
)

export default Dashboard
