import * as React from "react"
import Svg, { Path } from "react-native-svg"

function CircleCheckOutline(props?: any) {
    const { fillColors, ...otherProps } = props;
    return (
        <Svg
            width="800px"
            height="800px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...otherProps}
        >
            <Path
                d="M8 12.333L10.461 15 16 9m5 3a9 9 0 11-18 0 9 9 0 0118 0z"
                stroke={fillColors || "#000"}
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </Svg>
    )
}

export default CircleCheckOutline
