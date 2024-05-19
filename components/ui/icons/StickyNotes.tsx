import * as React from "react"
import Svg, { Path } from "react-native-svg"

function StickyNotes(props? : any) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2 6a4 4 0 014-4h12a4 4 0 014 4v8.343a4 4 0 01-1.172 2.829l-3.656 3.656A4 4 0 0114.343 22H6a4 4 0 01-4-4V6zm11 14H6a2 2 0 01-2-2V6a2 2 0 012-2h12a2 2 0 012 2v7h-4a3 3 0 00-3 3v4zm2-.11c.282-.1.542-.26.757-.476l3.657-3.657c.216-.215.377-.475.475-.757H16a1 1 0 00-1 1v3.89z"
        fill="#fff"
      />
    </Svg>
  )
}

export default StickyNotes
