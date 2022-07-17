import { FC } from "react"
import { Link } from "react-router-dom";

import Wrapper from "../assets/wrappers/LandingPage";
import { Logo } from "../components";
import main from "../assets/images/main.svg"


const Landing:FC = () => {
  return (
    <Wrapper>
        <nav>
        <Logo />
        </nav>
        <div className="container page">
            <div className="info">
                <h1>
                    tracking <span>Job</span> app
                </h1>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde necessitatibus nisi eligendi aliquam tenetur, quidem non est dolorum, quisquam ut expedita neque accusantium, placeat similique voluptas? Architecto voluptate laboriosam iure.
                </p>
                <Link to="/register" className="btn btn-hero">
                    Login/Register
                </Link>
            </div>
            <img src={main} alt="job hunt" className="img main-img" />
        </div>
    </Wrapper>
  )
}



export default Landing