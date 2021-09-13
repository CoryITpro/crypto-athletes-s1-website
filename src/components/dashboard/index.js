import { Link } from "react-scroll"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTimes } from "@fortawesome/free-solid-svg-icons"
import "./style.scss"

import Navbar from "components/navbar"
import Hero from "components/hero"
import Learn from "components/learn"
import Rarity from "components/rarity"
import Roadmap from "components/roadmap"
import FAQ from "components/faq"
import Footer from "components/footer"

import Alert from "components/alert"

const Dashboard = ({
  soldOutCounts,
  walletAddress,
  onConnect,
  onClickExpand,
  expanded,
  error,
  onAlertClickHandler,
}) => (
  <div className="dashboard">
    <Alert error={error} onClickHandler={onAlertClickHandler} />
    <div
      className={`dashboard-expand-menu flex flex-column${
        expanded ? " expanded" : ""
      }`}
      onClick={onClickExpand}
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
        onClick={onClickExpand}
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
        onClick={onClickExpand}
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
        onClick={onClickExpand}
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
        onClick={onClickExpand}
      >
        FAQs
      </Link>
    </div>
    <div className="dashboard-hero-wrapper">
      <Navbar onClickExpand={onClickExpand} />
      <Hero
        soldOutCounts={soldOutCounts}
        walletAddress={walletAddress}
        onConnect={onConnect}
      />
    </div>
    <Learn />
    <Rarity />
    <Roadmap />
    <FAQ />
    <Footer />
  </div>
)

export default Dashboard
