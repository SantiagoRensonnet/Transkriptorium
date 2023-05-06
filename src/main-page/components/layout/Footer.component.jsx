import LinkedInLogo from "../../../assets/icons/LinkedIn-logo.svg";
import GithubLogo from "../../../assets/icons/Github-logo.svg";
export const Footer = () => {
  return (
    <footer className="footer">
      <h2 className="text-lg cursor-default">Santiago Rensonnet</h2>
      <nav className="flex justify-between w-16">
        <a
          href="https://www.linkedin.com/in/santiago-rensonnet-92b48b19b/"
          rel="noopener noreferrer"
          target={"_blank"}
        >
          <img src={LinkedInLogo} className="footer-logo" alt="LinkedIn-link" />
        </a>
        <a
          href="https://github.com/SantiagoRensonnet"
          rel="noopener noreferrer"
          target={"_blank"}
        >
          <img src={GithubLogo} className="footer-logo" alt="Github-link" />
        </a>
      </nav>
    </footer>
  );
};
