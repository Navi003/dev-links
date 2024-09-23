import CodepenIcon from "@/assets/images/icon-codepen.svg";
import CodewarsIcon from "@/assets/images/icon-codewars.svg";

import FacebookIcon from "@/assets/images/icon-facebook.svg";
import FreeCodeCampIcon from "@/assets/images/icon-freecodecamp.svg";
import FrontendMentorIcon from "@/assets/images/icon-frontend-mentor.svg";
import GithubIcon from "@/assets/images/icon-github.svg";
import GitlabIcon from "@/assets/images/icon-gitlab.svg";
import HashnodeIcon from "@/assets/images/icon-hashnode.svg";

import LinkedInIcon from "@/assets/images/icon-linkedin.svg";
import LinksHeaderIcon from "@/assets/images/icon-links-header.svg";

import StackOverflowIcon from "@/assets/images/icon-stack-overflow.svg";
import TwitchIcon from "@/assets/images/icon-twitch.svg";
import TwitterIcon from "@/assets/images/icon-twitter.svg";

import YouTubeIcon from "@/assets/images/icon-youtube.svg";

// Create a mapping object
const platformStyles = {
  Github: {
    icon: GithubIcon,
    color: "#000000",
  },
  Codepen: {
    icon: CodepenIcon,
    color: "#000000",
  },
  Codewars: {
    icon: CodewarsIcon,
    color: "#B1361E",
  },

  Facebook: {
    icon: FacebookIcon,
    color: "#1877F2",
  },
  FreeCodeCamp: {
    icon: FreeCodeCampIcon,
    color: "#006400",
  },
  FrontendMentor: {
    icon: FrontendMentorIcon,
    color: "#3D3D3D",
  },
  Gitlab: {
    icon: GitlabIcon,
    color: "#FC6D26",
  },
  Hashnode: {
    icon: HashnodeIcon,
    color: "#2962FF",
  },
  LinkedIn: {
    icon: LinkedInIcon,
    color: "#0A66C2",
  },
  StackOverflow: {
    icon: StackOverflowIcon,
    color: "#F48024",
  },
  Twitch: {
    icon: TwitchIcon,
    color: "#9146FF",
  },
  Twitter: {
    icon: TwitterIcon,
    color: "#1DA1F2",
  },
  Youtube: {
    icon: YouTubeIcon,
    color: "#FF0000",
  },

  LinksHeader: {
    icon: LinksHeaderIcon,
    color: "#000000",
  },
};

// Function that looks up the platform in the mapping object
export const linkStyleSetter = function (link) {
  // Return the corresponding platform style or a default if not found
  return platformStyles[link] || { icon: null, color: "#000000" };
};
