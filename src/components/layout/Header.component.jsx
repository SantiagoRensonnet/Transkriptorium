import { Link } from "react-router-dom";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import logo from "../../assets/icons/logo.png";
export const Header = () => {
  return (
    <header className="header">
      <nav className="navigation" aria-label="Global">
        <Link to="">
          <img
            className="w-14 opacity-70 transition-all ease-out duration-500
        hover:opacity-100 hover:duration-500"
            src={logo}
            alt="home-link-icon"
          />
        </Link>

        <Link
          to="editor"
          target="_blank"
          rel="noopener noreferrer"
          className="nav-link flex items-center"
        >
          <span>Last Draft</span>
          <span aria-hidden="true" className="pl-1">
            {<ArrowRightIcon />}
          </span>
        </Link>
      </nav>
    </header>
  );
};
