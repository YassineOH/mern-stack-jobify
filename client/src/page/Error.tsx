import { FC } from "react"

import { Link } from "react-router-dom"

import Wrapper from "../assets/wrappers/ErrorPage"
import error404 from "../assets/images/not-found.svg"

const Error: FC = () => {
  return (
    <Wrapper className="full-page">
      <div>
        <img src={error404} alt="NOT FOUND" />
        <h3>The page you're requesting doesn't exist</h3>
        <Link to ="/">back home</Link>
      </div>
    </Wrapper>
  )
}
export default Error