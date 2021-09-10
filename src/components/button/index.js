import { Link } from "react-router-dom"
import "./style.scss"

const Button = ({ to = "", children, ...otherProps }) => {
  return (
    <div className="button flex" {...otherProps}>
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
