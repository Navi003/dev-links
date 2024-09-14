"use client";
import Image from "next/image";
import { useLinks } from "./useLinkContext"; // Assuming you're using context to get the links
import twitter from "@/assets/images/icon-twitter.svg";
import github from "@/assets/images/icon-github.svg"; // Import other logos as needed

import gitlab from "@/assets/images/icon-gitlab.svg"; // Import other logos as needed

export default function Phone() {
  const { links, imageSrc, user } = useLinks(); // Get links and imageSrc from context or pass as props

  // A function to map platform names to their corresponding logo
  const getPlatformLogo = (platform) => {
    switch (platform) {
      case "Twitter":
        return twitter;
      case "Github":
        return github;
      case "GithLab":
        return gitlab;
      // Add cases for other platforms, like Google, LinkedIn, YouTube
      default:
        return null; // If no logo is available
    }
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="308"
      height="632"
      fill="none"
    >
      {/* Phone outline */}
      <path
        stroke="#737373"
        d="M1 54.5C1 24.953 24.953 1 54.5 1h199C283.047 1 307 24.953 307 54.5v523c0 29.547-23.953 53.5-53.5 53.5h-199C24.953 631 1 607.047 1 577.5v-523Z"
      />
      <path
        fill="#fff"
        stroke="#737373"
        d="M12 55.5C12 30.923 31.923 11 56.5 11h24C86.851 11 92 16.149 92 22.5c0 8.008 6.492 14.5 14.5 14.5h95c8.008 0 14.5-6.492 14.5-14.5 0-6.351 5.149-11.5 11.5-11.5h24c24.577 0 44.5 19.923 44.5 44.5v521c0 24.577-19.923 44.5-44.5 44.5h-195C31.923 621 12 601.077 12 576.5v-521Z"
      />

      {/* Circle border around the image */}
      <circle
        cx="153.5"
        cy="112"
        r="52"
        fill="none"
        stroke="#633CFF"
        strokeWidth="4"
      />

      {/* Uploaded image inside the circle */}
      {imageSrc && (
        <image
          href={imageSrc} // Use the imageSrc passed from context or state
          x="105" // Adjust based on circle's cx and r
          y="64" // Adjust based on circle's cy and r
          width="96" // Circle diameter = 2 * radius (48 * 2 = 96)
          height="96" // Circle diameter = 2 * radius
          clipPath="circle(48px at 50% 50%)" // Clip the image to fit the circle
          preserveAspectRatio="xMidYMid slice"
        />
      )}

      {/* User's full name (first name + last name) */}
      <rect width="220" height="20" x="44" y="185" fill="#EEE" rx="10" />
      <text
        x="153.5" // Horizontally center text within the rect
        y="199" // Adjust vertically (center within rect height)
        fontSize="12"
        fill="#000"
        textAnchor="middle" // Center the text horizontally
      >
        {user.firstName} {user.lastName}
      </text>

      {/* User's email */}
      <rect width="220" height="20" x="44" y="215" fill="#EEE" rx="10" />
      <text
        x="153.5" // Horizontally center text within the rect
        y="229" // Adjust vertically (center within rect height)
        fontSize="10"
        fill="#000"
        textAnchor="middle" // Center the text horizontally
      >
        {user.email}
      </text>

      {/* Links rendered dynamically */}
      {links && links.length > 0 ? (
        links.map((link, index) => {
          const logo = getPlatformLogo(link.platform);

          // Skip rendering if no platform or logo is available
          if (!link.platform || !logo) return null;

          let fill;
          if (link.platform === "Google") fill = "#EA4335"; // Google (Red)
          else if (link.platform === "Github")
            fill = "#181717"; // Github (Black)
          else if (link.platform === "YouTube")
            fill = "#FF0000"; // YouTube (Red)
          else if (link.platform === "LinkedIn")
            fill = "#0077B5"; // LinkedIn (Blue)
          else if (link.platform === "Twitter") fill = "#1DA1F2"; // Twitter (Blue)

          return (
            <g key={index}>
              {/* Rectangles for platforms */}
              <rect
                width="237"
                height="44"
                x="35"
                y={278 + index * 64} // Adjust y position dynamically
                fill={fill}
                rx="8"
              />
              {/* Platform logo and text */}
              <foreignObject
                x="50"
                y={285 + index * 64}
                width="200"
                height="44"
              >
                {/* Inline Flexbox for Logo and Text */}
                <div className="flex items-center">
                  <Image
                    src={logo} // Get the correct logo for the platform
                    alt={`${link.platform} logo`}
                    width={24} // Adjust the logo size as needed
                    height={24}
                    style={{ marginRight: "8px" }} // Add some space between logo and text
                  />
                  <span className="text-xl font-semibold text-text-light">
                    {link.platform}
                  </span>
                </div>
              </foreignObject>
            </g>
          );
        })
      ) : (
        <text x="50" y="300" fontSize="14" fill="#000">
          No platforms available
        </text> // Placeholder text if no links exist
      )}
    </svg>
  );
}
