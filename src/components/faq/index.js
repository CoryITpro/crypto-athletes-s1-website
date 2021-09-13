import "./style.scss"

import ARTWORK_ROADMAP_1 from "resources/artworks/Artwork_Roadmap_1.png"

const FAQ = () => (
  <div className="faqs flex flex-column">
    <span>FAQS</span>
    <div className="faqs-item">
      <div className="faqs-item-title">Why CryptoAthletes</div>
      <div className="faqs-item-content">
        <ol>
          <li>
            <span>Set Completion:</span> Collect ⅗ of our Hall of Fame cards in
            your wallet and you will be airdropped that teams Mastercard, this
            Mastercard will come into play once our in house game comes out and
            will be a major playable character. Not only will you get a 1/1 rare
            card that can only be unlocked, complete any set of Hall of Fame
            cards and you will receive tickets for you and one other person to
            the NBA All-Star Game in 2022!
          </li>
          <li>
            <span>Professional Involvement:</span> With NBA athletes being
            deeply involved in the project, there will be weekly giveaways to
            exclusive CryptoAthletes holders! These will consist of Signed NBA
            jerseys, weekly game tickets, and playoff tickets as well as
            exclusive content from our supporters.
          </li>
          <li>
            <span>CryptoAthletes Game:</span> We are proud to announce that
            after all 10,000 of our unique Ballers are minted, that’s when the
            games begin! We are developing a game on the Ethereum Blockchain
            that can only be played by holders of our 150 Hall of Fame players
            to begin with, integration of Gold players will come later. Make
            sure to mint your own CryptoAthlete above before they sell out
            because this collection will never drop again!
          </li>
        </ol>
      </div>
    </div>
    <div className="faqs-decoration flex">
      <img src={ARTWORK_ROADMAP_1} alt="artwork" />
    </div>
  </div>
)

export default FAQ
