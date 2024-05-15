import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"

function SvgComponent(props?:any) {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G clipPath="url(#clip0_1_31)" fill="#000">
        <Path d="M16.443 0h.166c.134 1.655-.497 2.892-1.265 3.787-.753.89-1.785 1.753-3.454 1.622-.11-1.632.522-2.777 1.289-3.67C13.889.906 15.193.165 16.443 0zM21.494 17.228v.046c-.47 1.42-1.138 2.637-1.954 3.767-.746 1.025-1.659 2.405-3.29 2.405-1.408 0-2.344-.906-3.788-.93-1.527-.025-2.367.757-3.763.954h-.477c-1.025-.148-1.853-.96-2.455-1.692-1.778-2.162-3.152-4.955-3.408-8.53v-1.05C2.468 9.64 3.71 7.561 5.362 6.553c.872-.536 2.071-.993 3.406-.789.572.089 1.156.285 1.668.478.486.187 1.093.518 1.668.5.39-.011.777-.214 1.17-.357 1.15-.416 2.277-.892 3.763-.668 1.786.27 3.054 1.063 3.837 2.288-1.51.961-2.705 2.41-2.501 4.885.181 2.248 1.488 3.563 3.12 4.338z" />
      </G>
      <Defs>
        <ClipPath id="clip0_1_31">
          <Path
            fill="#fff"
            transform="translate(.19)"
            d="M0 0H23.47V23.47H0z"
          />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default SvgComponent