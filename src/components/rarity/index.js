import "./style.scss"

import { Raritys } from "constants/index"

import BRONZE from "resources/categories/Bronze_Site_Preview.png"
import SILVER from "resources/categories/Silver_Site_Preview.png"
import GOLD from "resources/categories/Gold_Site_Preview.png"
import HOF from "resources/categories/Hall_Of_Fame_Site_Preview.png"
import MASTERCARD from "resources/categories/MasterCard_Site_Preview.png"

import ARTWORK_ROADMAP_2 from "resources/artworks/Artwork_Roadmap_2.png"

const generateRarity = () =>
  Raritys.map((data, index) => (
    <div key={index} className="rarity-diagram-item flex flex-column">
      <div className="rarity-diagram-item-progress flex flex-column">
        <div
          className={`rarity-diagram-item-progress-bar-${data.title.toLowerCase()}`}
        ></div>
        <div className="rarity-diagram-item-progress-comment">
          {data.comment}
        </div>
      </div>
      <span>{data.title}</span>
    </div>
  ))

const Rarity = () => (
  <div className="rarity flex flex-column">
    <div className="rarity-classes flex">
      <div className="flex flex-column">
        <img className="bronze" src={BRONZE} alt="bronze" />
        <span>Bronze</span>
      </div>
      <div className="flex flex-column">
        <img className="silver" src={SILVER} alt="silver" />
        <span>Silver</span>
      </div>
      <div className="flex flex-column">
        <img className="gold" src={GOLD} alt="gold" />
        <span>Gold</span>
      </div>
      <div className="flex flex-column">
        <img className="hof" src={HOF} alt="hall of fame" />
        <span>Hall of Fame</span>
      </div>
      <div className="flex flex-column">
        <img className="mastercard" src={MASTERCARD} alt="mastercard" />
        <span>Master Card</span>
      </div>
    </div>
    <div className="rarity-ranking flex flex-column">
      <span>Our Ranking System</span>
      <div className="rarity-ranking-comment">
        Remember, there are no bad ballers but some are better than others. The
        rarity gets determined based off the point system integrated in the
        minting process.
      </div>
      <div className="rarity-ranking-policy">
        <span>The ranking goes as following:</span>
        <ul>
          <li>Bronze - 60 to 70 Overall</li>
          <li>Silver - 71 to 80 Overall</li>
          <li>Gold - 81 to 90 Overall</li>
          <li>HOF - 91 to 97 Overall</li>
          <li>Mastercard - 98 to 99 Overall</li>
        </ul>
        <span className="flex">
          <span>*</span>
          Mastercard players are impossible to pull out of drops but can be
          earned through trading.
        </span>
      </div>
      <img src={ARTWORK_ROADMAP_2} alt="rarity" />
    </div>
    <div className="rarity-diagram flex">{generateRarity()}</div>
  </div>
)

export default Rarity
