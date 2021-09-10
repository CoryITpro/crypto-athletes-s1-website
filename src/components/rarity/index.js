import "./style.scss"

import { Raritys } from "constants/index"

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
    <div className="rarity-classes"></div>
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
          <li>Bronze - score of 1 up to 3.9</li>
          <li>Silver - score of 4 up to 6.9</li>
          <li>Gold - score of 7 up to 9.5</li>
          <li>HOF - score of 9.6 to 10</li>
          <li>
            Mastercard - the holder of ⅗ hall of fame players will earn their
            self of mastercard.
          </li>
        </ul>
        <span className="flex">
          <span>*</span>
          Mastercard players are impossible to pull out of drops but can be
          earned through trading.
        </span>
      </div>
    </div>
    <div className="rarity-diagram flex">{generateRarity()}</div>
    <span>Roadmap</span>
  </div>
)

export default Rarity
