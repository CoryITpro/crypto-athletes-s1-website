import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faEquals } from "@fortawesome/free-solid-svg-icons"
import "./style.scss"

import HOF_ONE from "resources/artworks/HOF1.png"
import HOF_TWO from "resources/artworks/HOF2.png"
import HOF_THREE from "resources/artworks/HOF3.png"
import CUSTOM_MASTERCARD from "resources/artworks/Custom_Mastercard.png"

const Completion = () => (
  <div className="completion">
    <span>Set Completion</span>
    <div className="completion-wrapper">
      <p className="flex">
        Once you collect ⅗ Hall of Fame cards from the same team in your wallet,
        you will be awarded and airdropped that team's Mastercard. There are 30
        teams in the CryptoAthletes Hoopers drop. This means only 30 Mastercards
        will ever be released. The Mastercards will have a significant role in
        our future plans and overpower the other tiers in our game. Not only
        will you get a 1/1 Mastercard, but you will also receive tickets for
        yourself and one other person to the NBA All-Star Game in 2022!
      </p>
      <div className="completion-mobile flex">
        <div className="flex">
          <img src={HOF_ONE} alt="hof one" />
        </div>
        <div className="flex">
          <img src={HOF_TWO} alt="hof two" />
        </div>
        <div className="flex">
          <img src={HOF_THREE} alt="hof three" />
        </div>
        <FontAwesomeIcon icon={faEquals} />
        <div className="flex">
          <img src={CUSTOM_MASTERCARD} alt="mastercard" />
        </div>
      </div>
      <p className="flex">
        Mastercards are the most difficult to obtain, only 30 Mastercards will
        be released. The first person to complete the set for any team will
        receive the Mastercard + NBA all-star tickets. Only one Mastercard per
        team.
      </p>
      <div className="completion-pc flex">
        <div className="flex">
          <img src={HOF_ONE} alt="hof one" />
        </div>
        <div className="flex">
          <img src={HOF_TWO} alt="hof two" />
        </div>
        <div className="flex">
          <img src={HOF_THREE} alt="hof three" />
        </div>
        <FontAwesomeIcon icon={faEquals} />
        <div className="flex">
          <img src={CUSTOM_MASTERCARD} alt="mastercard" />
        </div>
      </div>
    </div>
  </div>
)

export default Completion
