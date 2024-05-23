import * as React from "react"
import Svg, { Path } from "react-native-svg"

function AlarmIcon(props? : any) {
    const {fillColor, ...otherProps} = props;
  return (
    <Svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...otherProps}
    >
      <Path
        d="M3 5.5l2-2m16 2l-2-2m-7 5v4l2 2m6-2a8 8 0 11-16 0 8 8 0 0116 0z"
        stroke={fillColor || "#000"}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}

export default AlarmIcon
