import "./style.scss"

import IMAGE from "resources/artworks/Learn_Banner_Transparent.png"

const Learn = () => (
  <div id="learn" className="learn">
    <div className="learn-wrapper flex">
      <div className="learn-wrapper-comments flex flex-column">
        <div className="learn-wrapper-comments-title">
          What are Crypto Athletes?
        </div>
        <div className="learn-wrapper-comments-content">
          CryptoAthletes are 850 unique players balling on the Ethereum
          Blockchain in style. With different chains, teams, hair, and more
          fashionable styles, there are more than 450,000,000 different possible
          options for our ballers, but only 850 are made. All players will be
          randomly generated, this means no 2 players will be the same. We have
          a unique ranking system, some ballers might be better than others, but
          there will never be a bad baller!
        </div>
      </div>
      <div className="learn-wrapper-img">
        <img src={IMAGE} alt="demo" />
      </div>
    </div>
  </div>
)

export default Learn
