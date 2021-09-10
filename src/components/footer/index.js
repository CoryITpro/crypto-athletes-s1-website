import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faInstagram,
  faTwitter,
  faDiscord,
} from "@fortawesome/free-brands-svg-icons"
import "./style.scss"

const Footer = () => (
  <div className="footer flex">
    <div className="footer-logo"></div>
    <div className="footer-contacts flex">
      <Link
        to={{ pathname: "https://www.instagram.com/cryptoathletes" }}
        target="_blank"
      >
        <FontAwesomeIcon icon={faInstagram} />
      </Link>
      <Link
        to={{ pathname: "https://www.twitter.com/crypto_athletes" }}
        target="_blank"
      >
        <FontAwesomeIcon icon={faTwitter} />
      </Link>
      <Link
        to={{ pathname: "https://www.discord.com/cryptoathletes" }}
        target="_blank"
      >
        <FontAwesomeIcon icon={faDiscord} />
      </Link>
    </div>
    <div className="footer-email">
      <a href="mailto:cryptoathletesteam@gmail.com">
        cryptoathletesteam@gmail.com
      </a>
    </div>
  </div>
)

export default Footer
