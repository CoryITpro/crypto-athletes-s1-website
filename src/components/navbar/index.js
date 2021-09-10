import { Link } from "react-scroll"
import "./style.scss"

import LOGO from "resources/download.png"

const Navbar = () => (
  <div className="navbar flex">
    <div className="navbar-wrapper flex">
      <img src={LOGO} alt="logo" className="navbar-logo" />
      <div className="navbar-links flex">
        <Link
          className="navbar-anchor-link"
          activeClass="active"
          to={"learn"}
          spy={true}
          smooth={true}
          offset={0}
          duration={500}
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
        >
          Rarity
        </Link>
        <Link
          className="navbar-anchor-link"
          activeClass="active"
          to={"roadmap"}
          spy={true}
          smooth={true}
          offset={-50}
          duration={500}
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
        >
          FAQs
        </Link>
      </div>
    </div>
  </div>
)

export default Navbar
