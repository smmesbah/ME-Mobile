import * as React from "react"
import Svg, { Path } from "react-native-svg"

function CalenderOutline(props?: any) {
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
                d="M19 6H5a1 1 0 00-1 1v12a1 1 0 001 1h14a1 1 0 001-1V7a1 1 0 00-1-1zM5 4a3 3 0 00-3 3v12a3 3 0 003 3h14a3 3 0 003-3V7a3 3 0 00-3-3H5z"
                fill={fillColor || "#fff"}
            />
            <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10 12a1 1 0 100 2h7a1 1 0 100-2h-7zm-3 4a1 1 0 100 2h6a1 1 0 100-2H7zM7 2a1 1 0 00-1 1v4a1 1 0 002 0V3a1 1 0 00-1-1zm10 0a1 1 0 00-1 1v4a1 1 0 102 0V3a1 1 0 00-1-1z"
                fill={fillColor || "#fff"}
            />
        </Svg>
    )
}

export default CalenderOutline
