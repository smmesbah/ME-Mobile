import * as React from "react"
import Svg, { Path } from "react-native-svg"

function BurgerOutline(props?:any) {
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
        d="M5 8a1 1 0 000 2h14a1 1 0 100-2H5zM5 14a1 1 0 100 2h14a1 1 0 100-2H5z"
        fill="#777E91"
      />
    </Svg>
  )
}

export default BurgerOutline
