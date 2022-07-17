import { FC } from "react";
import { NavLink } from "react-router-dom";
import links from "../utils/links";

interface Props {
  toggleSidebar?(): void;
}

const NavLinks: FC<Props> = ({ toggleSidebar }) => {
  return (
    <div className="nav-links">
      {links.map((link) => {
        const { id, path, text, icon } = link;
        return (
          <NavLink
            to={path}
            onClick={toggleSidebar}
            key={id}
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            <span className="icon">{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </div>
  );
};
export default NavLinks;
