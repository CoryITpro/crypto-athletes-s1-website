import "./style.scss"

import Navbar from "components/navbar"
import Hero from "components/hero"
import Learn from "components/learn"
import Rarity from "components/rarity"
import Roadmap from "components/roadmap"
import FAQ from "components/faq"
import Footer from "components/footer"

const Dashboard = ({ soldOutCounts, walletAddress, onConnect }) => (
  <div className="dashboard">
    <Navbar />
    <Hero
      soldOutCounts={soldOutCounts}
      walletAddress={walletAddress}
      onConnect={onConnect}
    />
    <Learn />
    <Rarity />
    <Roadmap />
    <FAQ />
    <Footer />
  </div>
)

export default Dashboard
