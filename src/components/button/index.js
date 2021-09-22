import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSpinner } from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom"
import "./style.scss"

const Button = ({ to = "", children, mintLoading, ...otherProps }) => {
  return (
    <div className="button flex" {...otherProps}>
      {to === "" ? (
        <span>{children}</span>
      ) : (
        <>
          {mintLoading && <FontAwesomeIcon icon={faSpinner} />}
          <Link to={{ pathname: to }} target="_blank">
            {children}
          </Link>
        </>
      )}
    </div>
  )
}

export default Button
