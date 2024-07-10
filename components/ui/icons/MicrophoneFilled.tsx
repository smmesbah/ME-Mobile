import * as React from "react"
import Svg, { Path } from "react-native-svg"

function MicrophoneFilled(props? : any) {
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
        d="M5 9a1 1 0 011 1v1a6 6 0 0012 0v-1a1 1 0 112 0v1a8.001 8.001 0 01-7 7.938V22h3a1 1 0 110 2H8a1 1 0 110-2h3v-3.062A8.001 8.001 0 014 11v-1a1 1 0 011-1z"
        fill="#fff"
      />
      <Path d="M8 4a4 4 0 118 0v7a4 4 0 01-8 0V4z" fill="#fff" />
    </Svg>
  )
}

export default MicrophoneFilled
