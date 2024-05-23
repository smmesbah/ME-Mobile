import * as React from "react"
import Svg, { Path } from "react-native-svg"

function ClockOutline(props? : any) {
    const {fillColor, ...otherProps} = props;
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...otherProps}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 20a8 8 0 100-16 8 8 0 000 16zm0 2c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"
        fill={fillColor || "#777E91"}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 6a1 1 0 011 1v4.586l2.207 2.207a1 1 0 01-1.414 1.414l-2.5-2.5A1 1 0 0111 12V7a1 1 0 011-1z"
        fill={fillColor || "#777E91"}
      />
    </Svg>
  )
}

export default ClockOutline
