"use client";
import Image from "next/image";
import { useLinks } from "./useLinkContext"; // Assuming you're using context to get the links

export default function Phone() {
  const { links } = useLinks(); // Get links from context or pass as props

  // Provide default values in case links array is not populated yet
  const firstLink = links[0]?.link || "First Link Placeholder";
  const secondLink = links[1]?.link || "Second Link Placeholder";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="308"
      height="632"
      fill="none"
    >
      <path
        stroke="#737373"
        d="M1 54.5C1 24.953 24.953 1 54.5 1h199C283.047 1 307 24.953 307 54.5v523c0 29.547-23.953 53.5-53.5 53.5h-199C24.953 631 1 607.047 1 577.5v-523Z"
      />
      <path
        fill="#fff"
        stroke="#737373"
        d="M12 55.5C12 30.923 31.923 11 56.5 11h24C86.851 11 92 16.149 92 22.5c0 8.008 6.492 14.5 14.5 14.5h95c8.008 0 14.5-6.492 14.5-14.5 0-6.351 5.149-11.5 11.5-11.5h24c24.577 0 44.5 19.923 44.5 44.5v521c0 24.577-19.923 44.5-44.5 44.5h-195C31.923 621 12 601.077 12 576.5v-521Z"
      />
      <circle cx="153.5" cy="112" r="48" fill="#EEE" />

      {/* First Link - Dynamic */}
      <rect width="160" height="16" x="73.5" y="185" fill="#EEE" rx="8" />
      <text x="73.5" y="195" fontSize="10" fill="#000"></text>

      {/* Second Link - Dynamic */}
      <rect width="72" height="8" x="117.5" y="214" fill="#EEE" rx="4" />
      <text x="117.5" y="220" fontSize="8" fill="#000"></text>

      {/* Static content */}

      {links.map((link, index) => {
        let fill;

        if (link.platform === "Google") {
          fill = "#EA4335"; // Google (Red)
        } else if (link.platform === "Github") {
          fill = "#181717"; // Github (Black)
        } else if (link.platform === "YouTube") {
          fill = "#FF0000"; // YouTube (Red)
        } else if (link.platform === "LinkedIn") {
          fill = "#0077B5"; // LinkedIn (Blue)
        } else if (link.platform === "Twitter") {
          fill = "#1DA1F2"; // Twitter (Blue)
        }

        console.log(fill);

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
            {/* Platform text */}
            <text
              x="50" // Adjust text position within the rectangle
              y={305 + index * 64} // Adjust text y position dynamically
              fontSize="12"
              fill="#000"
            >
              {link.platform}
            </text>
          </g>
        );
      })}

      {/* <rect width="237" height="44" x="35" y="278" fill="#EEE" rx="8" />
      <rect width="237" height="44" x="35" y="342" fill="#EEE" rx="8" />
      <rect width="237" height="44" x="35" y="406" fill="#EEE" rx="8" />
      <rect width="237" height="44" x="35" y="470" fill="#EEE" rx="8" />
      <rect width="237" height="44" x="35" y="534" fill="#EEE" rx="8" /> */}
    </svg>
  );
}
