import * as React from "react"
import Svg, { Path } from "react-native-svg"

function TagOutline(props? : any) {
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
        d="M10.414 3.172A4 4 0 0113.243 2H19a3 3 0 013 3v5.757a4 4 0 01-1.171 2.829l-7.708 7.707a3 3 0 01-4.242 0L2.707 15.12a3 3 0 010-4.242l7.707-7.707zM13.243 4a2 2 0 00-1.414.586l-7.707 7.707a1 1 0 000 1.414l6.171 6.172a1 1 0 001.414 0l7.707-7.707A2 2 0 0020 10.757V5a1 1 0 00-1-1h-5.757z"
        fill={fillColor || "#777E91"}
      />
      <Path
        d="M3.586 10L5 8.586 15.414 19 14 20.414 3.586 10z"
        fill={fillColor || "#777E91"}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15 10a1 1 0 100-2 1 1 0 000 2zm0 2a3 3 0 100-6 3 3 0 000 6z"
        fill={fillColor || "#777E91"}
      />
    </Svg>
  )
}

export default TagOutline
