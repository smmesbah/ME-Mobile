import * as React from "react"
import Svg, { Path } from "react-native-svg"

function SearchOutline(props?: any) {
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
                d="M14.906 16.32a8 8 0 111.414-1.414l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387zM16 10a6 6 0 11-12 0 6 6 0 0112 0z"
                fill="#777E91"
            />
        </Svg>
    )
}

export default SearchOutline
