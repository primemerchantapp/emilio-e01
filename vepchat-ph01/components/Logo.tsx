import type React from "react"

const Logo: React.FC = () => {
  return (
    <svg width="80" height="40" viewBox="0 0 80 40" xmlns="http://www.w3.org/2000/svg">
      <text
        x="5"
        y="30"
        fontFamily="Arial, sans-serif"
        fontSize="30"
        fontWeight="bold"
        fill="#32CD32" // Lime green color
      >
        vep
      </text>
    </svg>
  )
}

export default Logo

