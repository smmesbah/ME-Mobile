import * as React from "react"
import Svg, { Path } from "react-native-svg"

function ClockFill(props?: any) {
    const { fillColor, ...otherProps } = props;
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
                d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm1-15a1 1 0 10-2 0v5a1 1 0 00.293.707l2.5 2.5a1 1 0 001.414-1.414L13 11.586V7z"
                fill={fillColor || "#777E91"}
            />
        </Svg>
    )
}

export default ClockFill
