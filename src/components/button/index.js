import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSpinner } from "@fortawesome/free-solid-svg-icons"
import { Link } from "react-router-dom"
import "./style.scss"

const Button = ({
  to = "",
  children,
  onMintHandler,
  mintLoading,
  ...otherProps
}) => {
  return (
    <div
      className="button flex"
      {...otherProps}
      onClick={() => {
        return mintLoading ? "" : onMintHandler()
      }}
    >
      {mintLoading && <FontAwesomeIcon icon={faSpinner} />}
      {to === "" ? (
        <span>{children}</span>
      ) : (
        <Link to={{ pathname: to }} target="_blank">
          {children}
        </Link>
      )}
    </div>
  )
}

export default Button
