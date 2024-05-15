import * as React from "react"
import Svg, { Path } from "react-native-svg"

function LeftArrow(props?:any) {
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
        d="M14.207 7.793a1 1 0 010 1.414L11.414 12l2.793 2.793a1 1 0 01-1.414 1.414l-3.5-3.5a1 1 0 010-1.414l3.5-3.5a1 1 0 011.414 0z"
        fill="#777E91"
      />
    </Svg>
  )
}

export default LeftArrow
